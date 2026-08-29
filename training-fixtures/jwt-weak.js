const jwt = require("jsonwebtoken");

const JWT_SECRET = "supersecret";

function createToken(user) {
    return jwt.sign(
        { id: user.id, role: user.role },
        JWT_SECRET,
        { algorithm: "HS256" }
    );
}
