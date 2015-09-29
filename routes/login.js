/**
 * Created by lee on 9/22/15.
 */
var express = require('express'),
    router = express.Router(),
    mongohelper = require("../tools/mongohelper"),
    FriendShip = require("../modules/friendshipschema").FriendShip(),
/* GET home page. */
router.post('/login', function(req, res) {
    req.setEncoding('utf-8');
    var postData = "";
    req.addListener("data", function (postDataChunk) {
        postData += postDataChunk;
    });
    req.addListener("end", function () {
        var params = querystring.parse(postData);
        var username = params["username"];
        var password = params["password"];
        mh.getOneDocumentByParameters({userName:username},StaffInfo.SimpleShowItems,StaffInfo.StaffInfoModel,function(err,sdoc){
            if(err){
                JsonHelper.StaticClass.objectToJsonres(res,sdoc)
            }else{
                mh.getOneDocumentByParameters({StaffID:me},FriendShip.DetialShowItems,FriendShip.FriendShipModel,function(err,doc){
                    if(err){
                        JsonHelper.StaticClass.objectToJsonres(res,doc)
                    }else{
                        if(doc == undefined || doc == null){
                            friendship = FriendShip.FriendShipModel({
                                "StaffID" : me,
                                "Friends" : sdoc
                            });
                            mh.addDocument(friendship,function(doc){
                                JsonHelper.StaticClass.objectToJsonres(res,doc);
                            })
                        }else{
                            mh.addDocumentListItem(FriendShip.FriendShipModel,{StaffID:me},{"Friends":{"$each":sdoc}},function(doc){
                                JsonHelper.StaticClass.objectToJsonres(res,doc);
                            });
                        }
                    }
                })
            }
        })
    });
});

module.exports = router;