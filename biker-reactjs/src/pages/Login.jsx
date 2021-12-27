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
            navigate("/pickup-parcel", { replace: true });
        }
    }, [isLoggedIn]);

    return (
        <div className={'text-center mt-10'}>
            <form className="form-signin" onSubmit={(e) => login(e)}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <div>
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Email address" required
                           autoFocus/>
                </div>
                <div className={'pt-2'}>
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" placeholder="Password" required/>
                </div>

                <div className={'pt-3'}>
                    <button className="btn btn-lg btn-outline-primary btn-block" type="submit" disabled={isLoading}>Sign in</button>
                </div>
            </form>
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
