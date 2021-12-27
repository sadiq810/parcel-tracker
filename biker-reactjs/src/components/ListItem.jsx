import React from "react";

function ListItem({parcel}) {
    return (
        <tr>
            <td>{parcel.title}</td>
            <td>{parcel.pickup_address}</td>
            <td>{parcel.dropoff_address}</td>
            <td>{parcel.pickup_date}</td>
            <td>{parcel.delivery_date}</td>
            <td className={'font-weight-bold'}>
                {parcel.is_delivered === true && <span className={'text-success'}>Delivered</span>}
                {parcel.is_delivered === false && parcel.biker_id && <span className={'text-secondary'}>Picked up</span>}
                {parcel.is_delivered === false && parcel.biker_id == null && <span className={'text-primary'}>Available</span>}
            </td>
        </tr>
    );
}

export default ListItem;
