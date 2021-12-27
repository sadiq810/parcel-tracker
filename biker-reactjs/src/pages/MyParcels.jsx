import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {connect} from "react-redux";
import {getBikerParcelsAction} from "../redux/actions";
import ListItem from "../components/ListItem";

function MyParcels({user, token, parcels = [], getParcels}) {
    let navigate = useNavigate();

    useEffect(() => {
        if (user.type !== 'biker')
            navigate('/my-parcels');

        getParcels({token});
    }, []);

    return (
        <div className="container">
            <div className="py-5 text-center">
                <h2>Your Parcels</h2>
                <p className="lead">List of parcels that you picked up.</p>
                <div className={'text-center'}>
                    <Link to={'/pickup-parcel'}  className={'font-weight-bold'}>Goto available parcels list</Link>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12 order-md-1">
                    <div className="table-responsive">
                        <table className="table table-striped table-sm">
                            <thead>
                            <tr>
                                <th>Title</th>
                                <th>Pickup Address</th>
                                <th>Drop off Address</th>
                                <th>Pickup Date</th>
                                <th>Delivery Date</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                            {parcels.length == 0 && (<tr><td colSpan={5} className={'text-center'}>No parcel found.</td></tr>)}
                            {parcels.map(parcel => {
                                return (<ListItem key={parcel.id} parcel={parcel}/>)
                            })}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => ({
    getParcels: (payload) => dispatch(getBikerParcelsAction(payload))
})

const mapStateToProps = (state) => ({
    user: state.users.user,
    token: state.users.token,
    parcels: state.parcels.biker_parcels
})

export default connect(mapStateToProps, mapDispatchToProps)(MyParcels);
