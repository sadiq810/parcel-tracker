import React from "react";
import {Link} from "react-router-dom";

function ListItem({parcel, handleModal, handleDeliveryConfirmation, deleteParcel}) {
    return (
        <tr key={parcel.id}>
            <td>{parcel.title}</td>
            <td>{parcel.pickup_address}</td>
            <td>{parcel.dropoff_address}</td>
            <td>{parcel.pickup_date}</td>
            <td>{parcel.delivery_date}</td>
            <td>
                {parcel.biker_id && parcel.is_delivered === false && <button className={'btn btn-outline-info'}
                                            onClick={() => handleModal(parcel.biker)}
                >View Biker Detail</button>}&nbsp;

                {parcel.biker_id && parcel.is_delivered === false && <button className={'btn btn-outline-warning'}
                                            onClick={() => handleDeliveryConfirmation(parcel.id)}
                >Confirm Delivery</button>}

                {parcel.is_delivered === true && <span className={'font-weight-bold text-success'}>Delivered</span>}
                {parcel.biker_id === null && parcel.is_delivered !== true && (
                    <>
                        <button className={'btn btn-outline-danger'} onClick={() => deleteParcel(parcel.id)}>Delete</button>&nbsp;
                        <Link to={'/edit-parcel/'+parcel.id} className={'btn btn-outline-primary'}>Edit</Link>
                    </>
                )}
            </td>
        </tr>
    )
}

export default ListItem;
