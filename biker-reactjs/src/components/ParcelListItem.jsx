import React from "react";

function ParcelListItem({parcel, handleModal, handleDetailModal, handleCancel}) {
    return (
        <tr>
            <td>{parcel.title}</td>
            <td>{parcel.pickup_address}</td>
            <td>{parcel.dropoff_address}</td>
            <td className={'font-weight-bold'}>
                {parcel.is_delivered === true && <span className={'text-success'}>Delivered</span>}
                {parcel.is_delivered === false && parcel.biker_id && <span className={'text-secondary'}>Picked up</span>}
                {parcel.is_delivered === false && parcel.biker_id == null && <span className={'text-primary'}>Available</span>}
            </td>
            <td width={200}>
                {!parcel.biker_id &&
                    <button className={'btn btn-outline-primary'} onClick={() => handleModal(parcel)}>Pickup</button>
                }&nbsp;
                {parcel.biker_id && parcel.is_delivered === false &&
                    <button className={'btn btn-outline-danger'} onClick={() => handleCancel(parcel)}>Cancel</button>
                }&nbsp;
                <button className={'btn btn-outline-info'} onClick={() => handleDetailModal(parcel)}>View Detail</button>
            </td>
        </tr>
    );
}

export default ParcelListItem;
