/**
 * Created by lee on 9/23/15.
 */
var JsonHelper={};
JsonHelper.StaticClass = (function(){
    var Return = {
        jsonToObject: function(str,callback){
            callback(JSON.parse(str));
        },
        objectToJson: function(obj,callback){
            callback(JSON.stringify(obj));
        },
        jsonToObjectres: function(res,str){
            var doc = JSON.parse(str);
            res.write(doc);
            res.end()
        },
        objectToJsonres: function(res,obj){
            var doc = JSON.stringify(obj);
            res.write(doc);
            res.end()
        }
    };
    return Return
})();
module.exports = JsonHelper;