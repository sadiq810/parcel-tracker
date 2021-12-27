import { v4 as uuidv4 } from 'uuid';
import parcels from "../database/parcels";
import users from "../database/users";

// Get Parcels List based on user type.
const getParcels = (user, filter = undefined, search = '') => {
    if (user.type === "sender")
        return senderParcels(user.id, filter, search);
    else
        return parcelsForBiker(user.id, filter)
}

// Get parcel by id.
const getParcel = (user, parcel_id) => {
    return parcels.find(parcel => parcel.sender_id == user.id && parcel.id == parcel_id && parcel.biker_id == null);
}

// Create new parcel.
const createParcel = (data) => {
    parcels.push({
        ...data,
        biker_id: null,
        pickup_date: null,
        delivery_date: null,
        is_delivered: false,
        id: uuidv4()
    });
}

// List parcels for the sender.
const senderParcels = (id, filter, search) => {
    let parcelsList = parcels.filter(parcel => {

        let condition = parcel.sender_id === id;

        if (filter && (filter === 'available'))
            condition = condition && parcel.biker_id === null;

        if (filter && (filter === 'picked'))
            condition = condition && parcel.biker_id !== null && parcel.is_delivered === false;

        if (filter && (filter === 'delivered'))
            condition = condition && parcel.biker_id !== null && parcel.is_delivered === true;

        if (search)
            condition = condition && parcel.title.toLowerCase().includes(search.trim().toLowerCase());


        return condition;
    });

    parcelsList.forEach((parcel) => {
        if (parcel.biker_id) {
            let biker = users.find(user => user.id === parcel.biker_id);

            if (biker)
                parcel.biker = {id: biker.id, name: biker.name, email: biker.email};
        }
    })

    return parcelsList;
}

// List parcels for bikers, which are not assigned to anyone yet.
const parcelsForBiker = (biker_id, filter = undefined) => {
    return parcels.filter(parcel => {
        if (filter && (filter === 'picked' || filter === 'available')) {
            return filter === 'available' ? parcel.biker_id === null : parcel.biker_id === biker_id
        } else {
            return parcel.biker_id === null || parcel.biker_id === biker_id
        }
    });
}

// Get parcels for a specific biker, those which are delivered by biker.
const getBikerParcels = (id) => {
    return parcels.filter(parcel => parcel.biker_id === id);
}

// cancel the picked up parcel, only can biker do this before confirmation of delivery.
const cancelParcel = (id, biker_id) => {
    let parcel = parcels.find(parcel => parcel.biker_id == biker_id && parcel.id == id && parcel.is_delivered === false);

    if (! parcel)
        throw new Error("Unauthorized action.")

    parcel.biker_id = null;
    parcel.pickup_date = null;
    parcel.delivery_date = null;
}

// Sender confirm the parcel is being delivered by biker successfully.
const confirmParcelDelivery = (parcel_id, sender) => {
    let parcel = parcels.find(parcel => parcel.id == parcel_id && parcel.biker_id !== null && parcel.sender_id == sender.id);

    if (parcel) {
        parcel.is_delivered = true;

        return {status: true, message: 'Parcel delivery confirmed successfully.'}
    } else {
        return {status: false, message: 'Unauthorized action.'}
    }
}

// Delete a parcel.
const deleteParcel = (parcel_id, sender) => {
    let parcel = parcels.find(parcel => parcel.id == parcel_id && parcel.biker_id === null && parcel.sender_id == sender.id);

    if (parcel) {
        let index = parcels.findIndex(p => p.id === parcel.id);

        parcels.splice(index, 1)

        return {status: true, message: 'Parcel deleted successfully.'}
    } else {
        return {status: false, message: 'Unauthorized action.'}
    }
}

// Check whether a parcel is available for pick up or not.
const checkParcelAvailabilityForPickup = (parcel_id) => {
    return parcels.find(parcel => parcel.id == parcel_id && parcel.biker_id === null);
}

// Mark the parcel is picked up by a biker.
const markTheParcelPickup = (parcel_id, id, pickup_date, delivery_date) => {
    let parcel = checkParcelAvailabilityForPickup(parcel_id);

    parcel.biker_id = id;
    parcel.pickup_date = pickup_date;
    parcel.delivery_date = delivery_date;
}

// Get Stats for sender dashboard.
const getStats = (sender_id) => {
    let senderParcels = parcels.filter(parcel => parcel.sender_id == sender_id);

    let latestParcels = [];

    for (let i=senderParcels.length-1; i>senderParcels.length-12; i--) {
        let parcel = senderParcels[i];

        if (parcel)
            latestParcels.push(parcel);
    }

    let available = senderParcels.filter(p => p.biker_id === null).length;
    let delivered = senderParcels.filter(p => p.biker_id !== null && p.is_delivered === true).length;
    let undelivered = senderParcels.filter(p => p.biker_id !== null && p.is_delivered === false).length;

    return {latest: latestParcels, total: senderParcels.length, available, delivered, undelivered}
}

// Update the parcel, can only sender(owner of the parcel) do this and before being picked up by someone.
const updateParcel = (parcel_id, data, user) => {
    let parcel = parcels.find(parcel => parcel.id == parcel_id && parcel.sender_id == user.id);

    if (! parcel)
        throw new Error('Unauthorized action.');

    parcel.title = data.title;
    parcel.detail = data.detail;
    parcel.pickup_address = data.pickup_address;
    parcel.dropoff_address = data.dropoff_address;
}

export {
    getParcels,
    createParcel,
    getBikerParcels,
    checkParcelAvailabilityForPickup,
    markTheParcelPickup,
    confirmParcelDelivery,
    deleteParcel,
    getStats,
    getParcel,
    updateParcel,
    cancelParcel
}
