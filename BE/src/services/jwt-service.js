const secretKey = process.env.SECRET_KEY
const jwt = require("jsonwebtoken");
 
function sign(employee) {
    const token = jwt.sign({
        sub: employee.id,
        email: employee.email,
    },
    secretKey,
    {
        expiresIn: "1h"
    });
    return token;
}
 
function verify(token) {
    try {
        return jwt.verify(token, secretKey)
    } catch(error) {
        
        console.log("JWT verification failed:", error.message);
        return null

    }
}

module.exports = {
    sign,
    verify
}