import jwt from "jsonwebtoken";
import users from "../database/users";
import {compareHash} from "../utility/utility";

// Authenticate the user.
const authenticate = (email, password, type) => {
    let user = users.find((user) => user.email === email && user.type === type);

    if (user && compareHash(password, user.password)) {
        let {id, name, email, type} = user;
        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET);

        user.token = token;

        return {user: {id, name, email, type}, token};
    } else
        throw new Error("Invalid Credentials.");
}

// Logout user.
const logout = (user) => {
    user.token = null;
}

export {
    authenticate,
    logout
};
