/**
 * Created by lee on 9/21/15.
 */
var app = require("express")();
function getRoutes(){
    app.use("/",require('./routes/index'));
    return app;
};
exports.getRoutes = getRoutes;