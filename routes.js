/**
 * Created by lee on 9/21/15.
 */
var app = require("express")();
function getRoutes(){
    app.use("/",require('./routes/index'));
    app.use("/login",require("./routes/login"));
    return app;
};
exports.getRoutes = getRoutes;