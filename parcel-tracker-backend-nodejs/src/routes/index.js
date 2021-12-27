import express from "express";
import {authenticate, logout} from "../repository/UserRepository";
import auth from "../middleware/auth";
import {
    getParcels,
    createParcel,
    getBikerParcels,
    checkParcelAvailabilityForPickup,
    markTheParcelPickup,
    confirmParcelDelivery,
    deleteParcel,
    getStats,
    getParcel,
    updateParcel, cancelParcel
} from "../repository/ParcelRepostiory";

const router = express.Router();

// Login sender/biker type of users
router.post('/login', (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        let type = req.body.type;

        if (typeof email === undefined || typeof password === undefined || ['sender', 'biker'].indexOf(type) === -1)
            throw new Error("Please provide all required parameters.")

        let {user, token} = authenticate(req.body.email, req.body.password, type);

        res.send({ status: true, user, token })
    }  catch (e) {
        res.send({status: false, message: e.message})
    }
});

router.post('/logout', auth, (req, res) => {
    try {
        logout(req.user);
        res.send({ status: true, message: 'User logout successfully.' })
    }  catch (e) {
        res.send({status: false, message: 'Error occurred, Please try later. thanks.'})
    }
});

// Get list of parcels for both sender and biker, but based on the user type field.
router.get('/parcels', auth, (req, res) => {
    let parcels = getParcels(req.user, req.query.filter, req.query.search);

    res.send({status: true, data: parcels});
});


// Get parcel by id for sender
router.get('/parcel/:id', auth, (req, res) => {
    let parcel = getParcel(req.user, req.params.id);

    res.send({status: !!parcel, data: parcel});
});

router.post('/update-parcel/:id', auth, (req, res) => {
    try {
        if (typeof req.body.pickup_address === undefined || typeof req.body.dropoff_address === undefined)
            throw new Error("Please provide both pick up and drop off address");

        if (req.user.type !== "sender")
            throw new Error("You are not authorized.")

        updateParcel(req.params.id, req.body, req.user);

        res.send({status: true, message: "Parcel updated successfully."});
    } catch (e) {
        res.send({status: false, error: e.message})
    }
});

//Create new parcel, Only user of type 'sender' can create a parcel.
router.post('/create-parcel', auth, (req, res) => {
    try {
        if (typeof req.body.pickup_address === undefined || typeof req.body.dropoff_address === undefined)
            throw new Error("Please provide both pick up and drop off address");

        if (req.user.type !== "sender")
            throw new Error("You are not authorized.")

        let data = {
            title: req.body.title,
            detail: req.body.detail,
            pickup_address: req.body.pickup_address,
            dropoff_address: req.body.dropoff_address,
            sender_id: req.user.id
        };

        createParcel(data);

        res.send({status: true, message: "Parcel created successfully."});
    } catch (e) {
        res.send({status: false, error: e.message})
    }
});

// Mark the parcel as picked up for a biker. only user of type biker can pick up the parcel.
router.post('/pickup-parcel', auth, (req, res) => {
    try {
        if (req.user.type !== 'biker')
            throw new Error("You are not authorized to pickup a parcel");

        let parcelAvailable = checkParcelAvailabilityForPickup(req.body.parcel_id);

        if (! parcelAvailable)
            throw new Error("Parcel is not available.")

        let {parcel_id, pickup_date, delivery_date} = req.body;

        markTheParcelPickup(parcel_id, req.user.id, pickup_date, delivery_date)

        res.send({status: true, message: "Parcel picked up successfully."});
    } catch (err) {
        res.send({status: false, error: err.message})
    }
});

// Sender confirm the parcel delivery.
router.post('/confirm-parcel', auth, (req, res) => {
    let response = confirmParcelDelivery(req.body.parcel_id, req.user);

    res.send(response);
});

// Delete parcel
router.delete('/delete-parcel', auth, (req, res) => {
    let response = deleteParcel(req.body.parcel_id, req.user);

    res.send(response);
});

// Get Sender parcels stats
router.get('/sender-stats', auth, (req, res) => {
    let stats = getStats(req.user.id);

    res.send({status: true, ...stats});
});

// List all parcels that are delivered by a biker, specific biker's parcels.
router.get('/biker-parcels', auth, (req, res) => {
    let parcels = getBikerParcels(req.user.id);

    res.send({status: true, data: parcels});
});

// Cancel parcel by biker
router.get('/cancel-parcel/:id', auth, (req, res) => {
    try {
        cancelParcel(req.params.id, req.user.id);

        res.send({status: true, message: 'Parcel cancelled successfully.'});
    } catch (e) {
        res.send({status: false, error: e.message})
    }
});

// Just to show this message if someone hits this route.
router.get('/', (req, res) => {
    res.send("This is the backend for parcel tracker app.")
});

export default router;
