import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {cancelParcelAction, getParcelsAction, logoutUser, pickupParcelAction} from "../redux/actions";
import PickupModal from "../components/PickupModal";
import DetailModal from "../components/DetailModal";
import ParcelListItem from "../components/ParcelListItem";
import {SelectPicker} from 'rsuite';

const filters = [{ "label": "By Picked Up", "value": "picked"},
                {"label": "By Available", "value": "available"}];


function Parcels({user, token, parcels = [], getParcels, logout, pickParcel, cancelParcel}) {
    let navigate = useNavigate();
    let [modal, setModal] = useState(false);
    let [parcel, setParcel] = useState({});
    let [open, setOpen] = useState(false);
    let [filter, setFilter] = useState('');

    useEffect(() => {
        getParcels({token, filter});
    }, [filter]);

    const handleModal = (item) => {
        setParcel(item);
        setModal(true);
    }

    const handleDetailModal = (item) => {
        setParcel(item);
        setOpen(true);
    }

    const pickupTheParcel = async (pickupDate, deliveryDate) => {
        pickParcel({token, pickupDate, deliveryDate, id: parcel.id});
        setModal(false);
        setParcel({});
    }

    const handleCancel = (parcel) => {
        cancelParcel({token, id: parcel.id})
    }

    return (
        <div className="container">
            <div className="py-5 text-center">
                <h2>Available Parcels</h2>
                <p className="lead">List of available parcels for picking up</p>
                <div className={'text-center'}>
                    <Link to={'/my-parcels'} className={'font-weight-bold'}>Goto Picked up parcels list</Link>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 order-md-1">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1" className={'font-weight-bold'}>Filter: &nbsp;</label>
                        <SelectPicker data={filters} searchable={false} style={{ width: 224 }} onChange={e => setFilter(e)}/>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-striped table-sm">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Pickup Address</th>
                                <th>Drop off Address</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {parcels.length == 0 && (<tr><td colSpan={5} className={'text-center'}>No parcel found.</td></tr>)}
                            {parcels.map(parcel => {
                                return (
                                    <ParcelListItem key={parcel.id} parcel={parcel} handleDetailModal={handleDetailModal}
                                                    handleModal={handleModal} handleCancel={handleCancel}/>
                                    )
                            })}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
            <PickupModal modal={modal} setModal={setModal} pickupTheParcel={pickupTheParcel}/>
            <DetailModal open={open} parcel={parcel} setOpen={setOpen}/>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    getParcels: (payload) => dispatch(getParcelsAction(payload)),
    logout: () => dispatch(logoutUser()),
    pickParcel: (payload) => dispatch(pickupParcelAction(payload)),
    cancelParcel: (payload) => dispatch(cancelParcelAction(payload)),
})

const mapStateToProps = (state) => ({
    user: state.users.user,
    token: state.users.token,
    parcels: state.parcels.parcels
})

export default connect(mapStateToProps, mapDispatchToProps)(Parcels);
