import React from "react";
import {logoutUser} from "../redux/actions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

function MobileHeader({isAuthenticated, logout, token}) {
    if (!isAuthenticated)
        return null;
    else
        return (
            <div id="kt_header_mobile" className="header-mobile header-mobile-fixed">
                <Link to={'/dashboard'}>
                    Parcel Tracker
                </Link>
                <div className="d-flex align-items-center">
                    <button className="btn p-0 rounded-0 ml-4" id="kt_header_mobile_toggle">
                        <span className="svg-icon svg-icon-xxl">
                            <span className="svg-icon svg-icon-xxl">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                    <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                      <rect x={0} y={0} width={24} height={24} />
                                      <rect fill="#000000" x={4} y={4} width={7} height={7} rx="1.5" />
                                      <path d="M5.5,13 L9.5,13 C10.3284271,13 11,13.6715729 11,14.5 L11,18.5 C11,19.3284271 10.3284271,20 9.5,20 L5.5,20 C4.67157288,20 4,19.3284271 4,18.5 L4,14.5 C4,13.6715729 4.67157288,13 5.5,13 Z M14.5,4 L18.5,4 C19.3284271,4 20,4.67157288 20,5.5 L20,9.5 C20,10.3284271 19.3284271,11 18.5,11 L14.5,11 C13.6715729,11 13,10.3284271 13,9.5 L13,5.5 C13,4.67157288 13.6715729,4 14.5,4 Z M14.5,13 L18.5,13 C19.3284271,13 20,13.6715729 20,14.5 L20,18.5 C20,19.3284271 19.3284271,20 18.5,20 L14.5,20 C13.6715729,20 13,19.3284271 13,18.5 L13,14.5 C13,13.6715729 13.6715729,13 14.5,13 Z" fill="#000000" opacity="0.3" />
                                    </g>
                                  </svg>
                            </span>
                        </span>
                    </button>
                    <button className="btn rounded-0 p-0 ml-2" id="kt_header_mobile_topbar_toggle">
                        <span className="svg-icon svg-icon-xl">
                            <a href="#" className="menu-link" onClick={() => logout({token})}>
                                <span className="menu-text">Logout</span>
                            </a>
                        </span>
                    </button>
                </div>
            </div>
        )
}

const mapDispatchToProps = (dispatch) => ({
    logout: (payload) => dispatch(logoutUser(payload))
})

const mapStateToProps = (state) => ({
    isAuthenticated: state.users.isLoggedIn,
    token: state.users.token
})

export default connect(mapStateToProps, mapDispatchToProps)(MobileHeader);
