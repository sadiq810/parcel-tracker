import React from "react";

function Footer() {
    return (
        <div className="footer bg-white py-4 d-flex flex-lg-column">
            <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between">
                <div className="text-dark order-2 order-md-1">
                    <span className="text-muted font-weight-bold mr-2">2022©</span>
                    <a href="#" target="_blank" className="text-dark-75 text-hover-primary">Parcel Tracker</a>
                </div>
            </div>
        </div>
    )
}

export default Footer;
