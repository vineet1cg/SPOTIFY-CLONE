// we use middleware to write repetitive auth or other logic

// see in the music controller and in the both of the funcitons we rewrote our logic , but that should be happening by a single file

const jwt = require('jsonwebtoken');

async function authArtist(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "UNAUTHORIZED"
        })
    }
    try {
        let decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "artist") {
            return res.status(403).json({
                message: "You Dont Have Access To This Route"
            });
        }
        // special powers that middlewares have that they can modfiy the requests incoming and then add variables later on so that we can use it other files too
        // they also can send a response 
        req.user = decoded;
        next();
    } catch (e) {
        console.log(e);
        return res.status(401).json({
            message: "UNAUTHORIZED"
        })
    }
}
async function authUser(req, res, next) {

    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "user" && decoded.role !== "artist") {
            return res.status(403).json({
                message: "You Don't Have Access"
            })
        }
        req.user = decoded;
        next()
    } catch (e) {
        console.log(e);
        return res.status(401).json({
            message: "Unauthorized"
        })
    }
}
module.exports = { authArtist, authUser };  