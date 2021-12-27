import React from "react";
import {connect} from "react-redux";
import {logoutUser} from "../redux/actions";

function Header({isAuthenticated, logout, token}) {
    if (isAuthenticated)
        return <button className={'btn btn-outline-warning float-right m-4'} onClick={() => logout({token})}>Logout</button>
    else
        return null;
}

const mapDispatchToProps = (dispatch) => ({
    logout: (payload) => dispatch(logoutUser(payload))
})

const mapStateToProps = (state) => ({
    isAuthenticated: state.users.isLoggedIn,
    token: state.users.token
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
