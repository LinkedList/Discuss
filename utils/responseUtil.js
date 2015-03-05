/* jshint node:true */
module.exports = {
    simple: function (err, doc) {
        if(err) {
            return this.res.send(err);
        }
        this.res.json(doc);
    }
};
