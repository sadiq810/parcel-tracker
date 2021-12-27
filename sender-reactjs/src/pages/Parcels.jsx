import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {confirmParcelDeliveryAction, deleteParcelAction, getParcelsAction} from "../redux/actions";
import BikerDetailModal from "../components/BikerDetailModal";
import ListItem from "../components/ListItem";
import FilterComponent from "../components/FilterComponent";
import SearchComponent from "../components/SearchComponent";



function Parcels({token, parcels, getParcels, confirmDelivery, deleteParcel}) {
    let [biker, setBiker] = useState(undefined);
    let [open, setOpen] = useState(false);
    let [filter, setFilter] = useState('');
    let [search, setSearch] = useState('');

    useEffect(() => {
        getParcels({token, filter, search});
    }, [filter, search]);

    const handleModal = (biker) => {
        if (biker) {
            setBiker(biker);
            setOpen(true);
        }
    }

    const handleDeliveryConfirmation = (parcel_id) => {
        confirmDelivery({parcel_id, token});
    }

    const handleDeleteParcel = (parcel_id) => {
        deleteParcel({parcel_id, token})
    }

    return (
        <div className="content d-flex flex-column flex-column-fluid" id="kt_content">
            <div className="d-flex flex-column-fluid">
                <div className="container">
                    <div className="card card-custom gutter-b">
                        <div className="card-header border-0 pt-7">
                            <h3 className="card-title align-items-start flex-column">
                                <span className="card-label font-weight-bold font-size-h4 text-dark-75">List of parcels</span>
                            </h3>
                            <div className="card-toolbar">
                                <ul className="nav nav-pills nav-pills-sm nav-dark">
                                    <li className="nav-item">
                                        <Link to={'/new-parcel'} className={'btn btn-outline-primary'}>Add New</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="table-responsive card-body pt-0 pb-4">
                            <div className="row">
                                <div className="col-md-6">
                                    <FilterComponent setFilter={setFilter}/>
                                </div>
                                <div className="col-md-3">
                                    <SearchComponent setSearch={setSearch}/>
                                </div>
                            </div>
                            <table className="table table-bordered">
                                <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Pickup Address</th>
                                    <th>Drop off Address</th>
                                    <th>Pickup Date</th>
                                    <th>Delivery Date</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {parcels.length == 0 && (<tr><td colSpan={6} className={'text-center'}>No parcel found.</td></tr>)}
                                {parcels.map(parcel => {
                                    return (
                                        <ListItem parcel={parcel} handleModal={handleModal} key={parcel.id}
                                                  handleDeliveryConfirmation={handleDeliveryConfirmation}
                                                  deleteParcel={handleDeleteParcel}/>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                        <BikerDetailModal open={open} biker={biker} setOpen={setOpen}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    getParcels: (payload) => dispatch(getParcelsAction(payload)),
    confirmDelivery: (payload) => dispatch(confirmParcelDeliveryAction(payload)),
    deleteParcel: (payload) => dispatch(deleteParcelAction(payload))
})

const mapStateToProps = (state) => ({
    user: state.users.user,
    token: state.users.token,
    parcels: state.parcels.parcels
})

export default connect(mapStateToProps, mapDispatchToProps)(Parcels);
