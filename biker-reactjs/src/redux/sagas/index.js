import { put, takeLatest, all } from 'redux-saga/effects';
import {NotificationManager} from 'react-notifications';

function* loginUser({payload}) {
    yield put({ type: "USER_AUTHENTICATION_STARTED" });

    try {
        const response = yield fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({...payload, type: 'biker'})
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
        const response = yield fetch(`${process.env.REACT_APP_API_URL}/parcels?filter=${payload.filter ? payload.filter : ''}`, {
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
    } catch(err) { console.log(err)
        yield put({type: 'PARCEL_FETCHING_ERROR', payload: 'Internal Server Error Occurred.'});
        NotificationManager.error('Internal Server Error Occurred. Please try later.', 'Error!');
    }
}

function* fetchBikerParcels({payload}) {
    yield put({ type: "PARCEL_FETCHING_STARTED" });

    try {
        const response = yield fetch(`${process.env.REACT_APP_API_URL}/biker-parcels`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${payload.token}`
            }
        });

        let json = yield response.json();

        if (json.status) {
            yield put({ type: "BIKER_PARCELS_FETCHED", payload: json });
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

function* pickupTheParcel({payload}) {
    try {
        const response = yield fetch(`${process.env.REACT_APP_API_URL}/pickup-parcel`, {
            method: "POST",
            headers: {"Content-type": "application/json", "Authorization": `Bearer ${payload.token}`},
            body: JSON.stringify({
                parcel_id: payload.id,
                pickup_date: payload.pickupDate,
                delivery_date: payload.deliveryDate
            })
        });

        let json = yield response.json();
        if (json.status) {
            NotificationManager.success('Parcel picked up successfully.', 'Success!!!');
            yield fetchParcels({payload});
        } else {
            NotificationManager.error(json.error, 'Error!');

            if (response.status === 401)
                yield put({type: 'USER_LOGOUT', payload: undefined})
        }
    } catch (err) {
        NotificationManager.error('Error Occurred. Please try later.', 'Error!');
    }
}

function* cancelTheParcel({payload}) {
    try {
        const response = yield fetch(`${process.env.REACT_APP_API_URL}/cancel-parcel/${payload.id}`, {
            method: "GET",
            headers: {"Content-type": "application/json", "Authorization": `Bearer ${payload.token}`}
        });

        let json = yield response.json();
        if (json.status) {
            NotificationManager.success('Parcel cancelled successfully.', 'Success!!!');
            yield fetchParcels({payload});
        } else {
            NotificationManager.error(json.error, 'Error!');

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
    yield takeLatest('GET_BIKER_PARCELS', fetchBikerParcels);
    yield takeLatest('PICKUP_PARCEL', pickupTheParcel);
    yield takeLatest('CANCEL_PARCEL', cancelTheParcel);
}

export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}
