import React from "react";
import {Modal} from "rsuite";

function BikerDetailModal({open, setOpen, biker}) {
    const handleClose = () => setOpen(false);

    if (!biker)
        return null

    return (
        <Modal backdrop={true} keyboard={false} open={open} onClose={handleClose} size={'md'} overflow={false}>
            <Modal.Header>
                <Modal.Title>Biker Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className={'row'}>
                    <div className={'col-md-12'}>
                        <div className="table-responsive">
                            <table className="table table-striped table-sm">
                            <tbody>
                            <tr>
                                <th>Biker Name</th>
                                <td>{biker.name}</td>
                            </tr>
                            <tr>
                                <th>Biker Email</th>
                                <td>{biker.email}</td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
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

export default BikerDetailModal;
