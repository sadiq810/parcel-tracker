import { put, takeLatest, all } from 'redux-saga/effects';
import {NotificationManager} from 'react-notifications';

function* loginUser({payload}) {
    yield put({ type: "USER_AUTHENTICATION_STARTED" });

    try {
        const response = yield fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({...payload, type: "sender"})
        });

        let json = yield response.json();

        if (json.status) {
            yield put({ type: "USER_AUTHENTICATED", payload: json });
        } else {
            yield put({type: 'USER_AUTHENTICATION_ERROR', payload: 'Invalid credentials'});
            NotificationManager.error(json.message, 'Error!');
        }
    } catch(err) {
        yield put({type: 'USER_AUTHENTICATION_ERROR', payload: 'Internal Server Error Occurred.'});
        NotificationManager.error('Internal Server Error Occurred. Please try later.', 'Error!');
    }
}

function* logoutUser({payload}) {
    try {
        yield fetch(`${process.env.REACT_APP_API_URL}/logout`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${payload.token}`
            }
        });
    } catch(err) {
    }

    yield put({type: 'USER_LOGOUT', payload: undefined})
}

function* fetchParcels({payload}) {
    yield put({ type: "PARCEL_FETCHING_STARTED" });

    try {
        const response = yield fetch(`${process.env.REACT_APP_API_URL}/parcels?filter=${payload.filter ? payload.filter : ''}&search=${payload.search ? payload.search : ''}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${payload.token}`
            }
        });

        let json = yield response.json();

        if (json.status) {
            yield put({ type: "PARCEL_FETCHED", payload: json });
        } else {
            yield put({type: 'PARCEL_FETCHING_ERROR', payload: 'Could not fetch the parcels.'});
            NotificationManager.error('Could not fetch the parcels. Please try later.', 'Error!');

            if (response.status === 401)
                yield put({type: 'USER_LOGOUT', payload: undefined})
        }
    } catch(err) {
        yield put({type: 'PARCEL_FETCHING_ERROR', payload: 'Internal Server Error Occurred.'});
        NotificationManager.error('Internal Server Error Occurred. Please try later.', 'Error!');
    }
}

function* confirmParcelDelivered({payload}) {
    try {
        const response = yield fetch(`${process.env.REACT_APP_API_URL}/confirm-parcel`, {
            method: "POST",
            headers: {"Content-type": "application/json", "Authorization": `Bearer ${payload.token}`},
            body: JSON.stringify({
                parcel_id: payload.parcel_id
            })
        });

        let json = yield response.json();
        if (json.status) {
            NotificationManager.success(json.message, 'Success!!!');
            yield fetchParcels({payload});
        } else {
            NotificationManager.error(json.message, 'Error!');

            if (response.status === 401)
                yield put({type: 'USER_LOGOUT', payload: undefined})
        }
    } catch (err) {
        NotificationManager.error('Error Occurred. Please try later.', 'Error!');
    }
}

function* deleteParcel({payload}) {
    try {
        const response = yield fetch(`${process.env.REACT_APP_API_URL}/delete-parcel`, {
            method: "DELETE",
            headers: {"Content-type": "application/json", "Authorization": `Bearer ${payload.token}`},
            body: JSON.stringify({
                parcel_id: payload.parcel_id
            })
        });

        let json = yield response.json();
        if (json.status) {
            NotificationManager.success(json.message, 'Success!!!');
            yield fetchParcels({payload});
        } else {
            NotificationManager.error(json.message, 'Error!');

            if (response.status === 401)
                yield put({type: 'USER_LOGOUT', payload: undefined})
        }
    } catch (err) {
        NotificationManager.error('Error Occurred. Please try later.', 'Error!');
    }
}

function* getStats({payload}) {
    try {
        const response = yield fetch(`${process.env.REACT_APP_API_URL}/sender-stats`, {
            method: "GET",
            headers: {"Content-type": "application/json", "Authorization": `Bearer ${payload.token}`},
        });

        let json = yield response.json();

        if (json.status) {
            yield put({ type: "SET_PARCELS_STATS", payload: json });
        } else {
            NotificationManager.error(json.message, 'Error!');

            if (response.status === 401)
                yield put({type: 'USER_LOGOUT', payload: undefined})
        }
    } catch (err) {
        NotificationManager.error('Error Occurred. Please try later.', 'Error!');
    }
}

function* actionWatcher() {
    yield takeLatest('AUTHENTICATING_USER', loginUser);
    yield takeLatest('LOGOUT_USER', logoutUser);
    yield takeLatest('GET_PARCELS', fetchParcels);
    yield takeLatest('CONFIRM_PARCEL_DELIVERY', confirmParcelDelivered);
    yield takeLatest('DELETE_PARCEL', deleteParcel);
    yield takeLatest('GET_STATS', getStats);
}

export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}
