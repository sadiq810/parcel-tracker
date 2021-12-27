import React, {useState} from "react";
import { Modal, DatePicker } from 'rsuite';
import {NotificationManager} from 'react-notifications';

function PickupModal({modal, setModal, pickupTheParcel}) {
    const handleClose = () => setModal(false);
    let [pDate, setPDate] = useState('');
    let [dDate, setDDate] = useState('');

    const handleSubmit = () => {
        if (pDate === '' || dDate === '') {
            NotificationManager.error('Please select both dates.', 'Error!');
            return;
        }

        if (pDate.getTime() > dDate.getTime()) {
            NotificationManager.error('Delivery date must be greater than pickup date.', 'Error!');
            return;
        }

        pickupTheParcel(
            pDate.getFullYear()+'-'+(pDate.getMonth()+1)+'-'+pDate.getDate()+' '+pDate.getHours()+':'+pDate.getMinutes(),
            dDate.getFullYear()+'-'+(dDate.getMonth()+1)+'-'+dDate.getDate()+' '+dDate.getHours()+':'+dDate.getMinutes()
        );
    }

    return (<Modal backdrop={true} keyboard={false} open={modal} onClose={handleClose} size={'md'} overflow={false}>
        <Modal.Header>
            <Modal.Title>Parcel Pickup Confirmation</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <div className={'row'}>
                <div className="col-md-6 col-sm-12">
                    <div className="field">
                        <b>Pickup date & time</b>
                        <DatePicker
                            format="yyyy-MM-dd HH:mm:ss"
                            ranges={[
                                {
                                    label: 'Now',
                                    value: new Date()
                                }
                            ]}
                            style={{ width: 260 }}
                            onChange={(e) => setPDate(e)}
                        />
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="field inline-block">
                        <b>Delivery date & time</b>
                        <DatePicker
                            format="yyyy-MM-dd HH:mm:ss"
                            ranges={[
                                {
                                    label: 'Now',
                                    value: new Date()
                                }
                            ]}
                            style={{ width: 260 }}
                            onChange={(e) => setDDate(e)}
                        />
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <button className={'btn btn-danger'} onClick={handleClose}>Cancel</button>&nbsp;
            <button className={'btn btn-primary'} onClick={handleSubmit}>Save</button>
        </Modal.Footer>
    </Modal>)
}

export default PickupModal;
