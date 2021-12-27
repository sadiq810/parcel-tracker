import bcrypt from "bcryptjs";

// Encrypt a string.
const encrypt = (password) => {
    let salt = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
}

// Compare the hash with the string.
const compareHash = (password, hash) => {
    return bcrypt.compareSync(password, hash);
}

export {encrypt, compareHash};
