/**
 * Created by lee on 9/29/15.
 */
var mongoose = require("mongoose");
Users = function(){
    this.UsersModel = mongoose.model("Users", usersSchema,"Users");
    this.DetialShowItems = "-_id";
    return this;
};
var usersSchema = new mongoose.Schema({
    userName:String,
    passWord:String,
    userKey:String
},{versionKey:false});
exports.Users = Users;