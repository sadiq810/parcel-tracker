import {Navigate} from 'react-router-dom';
import React from "react";
import {connect} from "react-redux";

const PrivateRoute = ({children, isAuthenticated}) => {
    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return children;
}

const mapDispatchToProps = (dispatch) => ({})

const mapStateToProps = (state) => ({
    isAuthenticated: state.users.isLoggedIn,
})

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
