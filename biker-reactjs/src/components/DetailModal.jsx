import React from "react";
import {Modal} from "rsuite";

function DetailModal({open, setOpen, parcel}) {
    const handleClose = () => setOpen(false);

    if (!parcel)
        return null

    return (
        <Modal backdrop={true} keyboard={false} open={open} onClose={handleClose} size={'md'} overflow={false}>
            <Modal.Header>
                <Modal.Title>Parcel Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className={'row'}>
                    <div className={'col-md-12'}>
                        <table className="table table-striped table-sm">
                            <tbody>
                            <tr>
                                <th>Title</th>
                                <td>{parcel.title}</td>
                            </tr>
                            <tr>
                                <th>Detail</th>
                                <td>{parcel.detail}</td>
                            </tr>
                            <tr>
                                <th>Pickup Address</th>
                                <td>{parcel.pickup_address}</td>
                            </tr>
                            <tr>
                                <th>Dropoff Address</th>
                                <td>{parcel.dropoff_address}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button className={'btn btn-danger'} onClick={handleClose}>Close</button>&nbsp;
                <button className={'btn btn-primary'} onClick={handleClose}>Okay</button>
            </Modal.Footer>
        </Modal>
    )
}

export default DetailModal;
