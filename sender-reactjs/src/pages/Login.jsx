import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom"
import {authenticateUser} from "../redux/actions";

function Login({authenticate, isLoggedIn, isLoading, user} = {}) {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();
        authenticate({email, password});
    }

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/dashboard", { replace: true });
        }
    }, [isLoggedIn]);

    return (
        <div className="d-flex flex-column flex-root">
            <div className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white">
                <div
                    className="login-content flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
                    <div className="d-flex flex-column-fluid flex-center">
                        <div className="login-form login-signin">
                            <form className="form" onSubmit={(e) => login(e)}>
                                <div className="pb-13 pt-lg-0 pt-5">
                                    <h3 className="font-weight-bolder text-dark font-size-h4 font-size-h1-lg">
                                        Welcome to Parcel Tracker
                                    </h3>
                                    <span className="text-muted font-weight-bold font-size-h4">Please sign in using your email & password.</span>
                                </div>
                                <div className="form-group">
                                    <label className="font-size-h6 font-weight-bolder text-dark">Email</label>
                                    <input className="form-control form-control-solid h-auto p-6 rounded-lg" type="email"
                                           name="email" autoComplete="off" required={'required'}
                                           value={email} onChange={e => setEmail(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <div className="d-flex justify-content-between mt-n5">
                                        <label className="font-size-h6 font-weight-bolder text-dark pt-5">Password</label>
                                    </div>
                                    <input className="form-control form-control-solid h-auto p-6 rounded-lg"
                                           type="password" name="password" autoComplete="off" required={'required'}
                                           value={password} onChange={e => setPassword(e.target.value)}/>
                                </div>
                                <div className="pb-lg-0 pb-5">
                                    <button type="submit" disabled={isLoading}
                                            className="btn btn-primary font-weight-bolder font-size-h6 px-8 py-4 my-3 mr-3">
                                        Sign In
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        authenticate: (payload) => dispatch(authenticateUser(payload)),
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.users.user,
        isLoggedIn: state.users.isLoggedIn,
        isLoading: state.users.isLoading,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
