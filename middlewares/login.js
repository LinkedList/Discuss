/* Basic requires login middleware */
exports.requiresLogin = function (req, res, next) {
    if(!req.isAuthenticated()){
        return res.status(403).json({error: "User is not signed in"});
    }
    next();
};
