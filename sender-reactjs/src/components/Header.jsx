import React from "react";
import {connect} from "react-redux";
import {logoutUser} from "../redux/actions";
import Navigation from "./Navigation";

function Header({isAuthenticated, logout, token, to}) {
    if (!isAuthenticated)
        return null
    else
        return (
            <div id="kt_header" className="header header-fixed">
                <div className="container">
                    <div className="header-menu-wrapper header-menu-wrapper-left" id="kt_header_menu_wrapper">
                        <div id="kt_header_menu"
                             className="header-menu header-menu-left header-menu-mobile header-menu-layout-default">

                            <Navigation />

                        </div>
                    </div>
                    <div className="topbar">
                        <div className={'topbar-item mr-3'}>
                            <a href="#" className="menu-link" onClick={() => logout({token})}>
                                <span className="menu-text">Logout</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
}

const mapDispatchToProps = (dispatch) => ({
    logout: (payload) => dispatch(logoutUser(payload))
})

const mapStateToProps = (state) => ({
    isAuthenticated: state.users.isLoggedIn,
    token: state.users.token
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
