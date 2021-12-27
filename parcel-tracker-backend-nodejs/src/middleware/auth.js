import users from "../database/users";
import jwt from "jsonwebtoken";

// Middleware to check the requests and stop un-authorize access to protected data.
const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '').trim();
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = users.find(user => user.id === decoded.id && user.token === token);

        if(! user)
            throw new Error('Invalid token.');

        req.token = token;
        req.user = user;
        next();
    } catch(e) {
        res.status(401).send({status: false, error: 'Please authenticate.'})
    }
}



export default auth;
