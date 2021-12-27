import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {NotificationManager} from 'react-notifications';
import {logoutUser} from "../redux/actions";
import InputComponent from "../components/InputComponent";
import TextareaComponent from "../components/TextareaComponent";

function NewParcel({user, token, logout}) {
    let [title, setTitle] = useState('');
    let [detail, setDetail] = useState('');
    let [pickupAddress, setPickupAddress] = useState('');
    let [dropOffAddress, setDropOffAddress] = useState('');
    let navigate = useNavigate();

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/create-parcel`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({title, detail, pickup_address: pickupAddress, dropoff_address: dropOffAddress})
            });

            const res = await response.json();

            if (res.status) {
                NotificationManager.success('Parcel created successfully.', 'Success!!!');
                navigate('/parcels')
            } else
            if (response.status === 401)
                logout();
        } catch (e) {
            NotificationManager.error('Error occurred. Please try later.', 'Error!');
        }
    }

    return (
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
            <div className="d-flex flex-column-fluid">
                <div className="container">
                    <div className="card card-custom gutter-b">
                        <div className="card-header border-0 pt-7">
                            <h3 className="card-title align-items-start flex-column">
                                <span className="card-label font-weight-bold font-size-h4 text-dark-75">Add new parcel</span>
                            </h3>
                            <div className="card-toolbar">
                                <ul className="nav nav-pills nav-pills-sm nav-dark">
                                    <li className="nav-item">
                                        <Link to={'/parcels'} className={'btn btn-outline-danger'}>Cancel</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body pt-0 pb-4">
                            <form onSubmit={submit}>

                                <InputComponent id={'title'} title={'Title'} value={title} setValue={setTitle} placeholder={'Enter title...'} key={'title-input'}/>

                                <TextareaComponent id={'detail'} key={'detail-text-area'} value={detail} setValue={setDetail} placeholder={'Enter detail...'} title={'Detail <span className="text-muted">(Optional)</span>'}/>

                                <InputComponent id={'pickup_address'} title={'Pickup Address'} value={pickupAddress} setValue={setPickupAddress} placeholder={'1234 Main St'} key={'pickup-address-input'}/>

                                <InputComponent id={'address2'} title={'Drop-off Address'} value={dropOffAddress} setValue={setDropOffAddress} placeholder={'1234 Main St'} key={'dropoff-address-input'}/>

                                <hr className="mb-4" />
                                <button className="btn btn-outline-primary btn-md" type="submit">Save</button> &nbsp;
                                <button className="btn btn-outline-danger btn-md" type="button" onClick={() => navigate('/parcels')}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logoutUser())
})

const mapStateToProps = (state) => ({
    user: state.users.user,
    token: state.users.token,
})

export default connect(mapStateToProps, mapDispatchToProps)(NewParcel);
