/**
 * Created by lee on 9/22/15.
 */
var express = require('express'),
    router = express.Router(),
    uuid = require("node-uuid"),
    querystring = require("querystring"),
    JsonHelper = require("../tools/jsonhelper"),
    Mongohelper = require("../tools/mongohelper"),
    Objects = require("../modules/objects"),
    Mh = new Mongohelper.MongoHelper(),
    Users = require("../modules/usersschema").Users();
/* GET home page. */
router.post('/', function(req, res) {
    req.setEncoding('utf-8');
    var postData = "";
    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });
    req.addListener("end", function () {
        var params = querystring.parse(postData);
        var username = params["username"];
        var password = params["password"];
        Mh.getOneDocumentByParameters({userName:username},Users.DetialShowItems,Users.UsersModel,function(err,doc){
            if(err){
                JsonHelper.StaticClass.objectToJsonres(res,doc);
            }else{
                if(doc == null){
                    users = Users.UsersModel({
                        "userName" : username,
                        "passWord" : password,
                        "userKey" :uuid.v1()
                    });
                    Mh.addDocument(users,function(doc){
                        JsonHelper.StaticClass.objectToJsonres(res,doc);
                    })
                }else{
                    JsonHelper.StaticClass.objectToJsonres(res,new Objects.Result(Objects.State().err, null, "This name is exists!"));
                };

            }
        })
    });
});

module.exports = router;