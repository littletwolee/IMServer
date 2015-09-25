/**
 * Created by lee on 9/23/15.
 */
var Redis = require('ioredis'),
    fs = require("fs"),
    objects = require("../modules/objects"),
    jsonhelper = require("../tools/jsonhelper"),
    JsonObj=JSON.parse(fs.readFileSync('./config.json')),
    redis = new Redis({
        port: JsonObj.redisserver.port,
        host: JsonObj.redisserver.host,
        password: JsonObj.redisserver.password
    });
var RedisHelper={};
RedisHelper.StaticClass = (function(){
    var Return = {
        redis_set: function(key,val,callback){
            RedisHelper.StaticClass.redis_exists(key,function(err,result){
                if(err != null){
                    callback(err,null);
                }else {
                    if (result) {
                        redis.set(key, val, function (err) {
                            if (err) {
                                callback(err.message, null);
                            }else{
                                callback(null, true);
                            }
                        });
                    } else {
                        callback("username is exists",null);
                    };
                }
            });
        },
        redis_get: function(key,callback){
            RedisHelper.StaticClass.redis_exists(key,function(err,result){
                if(err != null){
                    callback(err.message,null);
                }else{
                    if(!result){
                        redis.get(key,function(err,result){
                            if(err){
                                callback(err.message,null);
                            }else{
                                callback(null,result);
                            };
                        });
                    }else{
                        callback("key isn't exists",null);
                    };
                }

            });
        },
        redis_exists: function(key,callback){
            redis.exists(key,function(err,result){
                if(err){
                    callback(err.message,null);
                }else{
                    if(!result > 0){
                        callback(null,true);
                    }else{
                        callback(null,false);
                    }
                };
            });
        },
        redis_del: function(key,callback){
            redis.del(key,function(err){
                if(err){
                    callback(err.message,null);
                }else{
                    callback(null,true);
                };
            })
        }
    };
    return Return
})();
module.exports = RedisHelper;