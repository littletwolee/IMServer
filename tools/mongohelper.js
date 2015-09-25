/**
 * Created by lee on 9/23/15.
 */
var objects = require("../modules/objects"),
    fs = require("fs"),
    mongoose = require("mongoose"),
    gridfs_stream = require("gridfs-stream");
MongoHelper = function () {};
MongoHelper.prototype.getOneDocumentByParameters = function(arr,search,model,callback){
    model.findOne(arr,search,null,function(err,doc){
        if(err){
            callback(err,new objects.Result(objects.State().err,null,err.message));
        }else{
            callback(null,doc);
        }
    });
};
MongoHelper.prototype.getDocumentsByParameters = function(arr,search,model,callback){
    model.find(arr,search,function(err,doc){
        if(err){
            callback(err,new objects.Result(objects.State().err,null,err.message));
        }else{
            callback(null,doc);
        }
    });
};
MongoHelper.prototype.getDocuments = function(model,callback){
    model.find({},function(err,doc){
        if(err){
            callback(err,new objects.Result(objects.State().err,null,err.message));
        }else{
            callback(null,doc);
        }
    });
};
MongoHelper.prototype.addDocument = function(model,callback){
    model.save(function(err){
        if(err){
            callback(new objects.Result(objects.State().err,null,err.message));
        }else{
            callback(new objects.Result(objects.State().success,null,null));
        }
    })
};
MongoHelper.prototype.addDocumentListItem = function(model,arr,updateitem,callback){
    model.update(arr,{"$addToSet":updateitem},function(err){
        if(err){
            callback(new objects.Result(objects.State().err,null,err.message));
        }else{
            callback(new objects.Result(objects.State().success,null,null));
        }
    });
};
MongoHelper.prototype.delDocumentListItem = function(model,arr,delitem,callback){
    model.update(arr,{"$pullAll":delitem},function(err){
        if(err){
            callback(err);
        }
    });
};
exports.MongoHelper = MongoHelper;
GridFSHelper = function(){
    this.gfs = gridfs_stream(mongoose.connection.db,mongoose.mongo);
};
GridFSHelper.prototype.saveFile = function(item,callback){
    var gfs_options = {
        filename: item.filename,
        mode: 'w',
        content_type: item.filetype,
        size:item.filesize
    };
    var writestream = this.gfs.createWriteStream(gfs_options);
    fs.createReadStream(item.filepath).pipe(writestream);
    writestream.on('close', function(file) {
        fs.unlink(item.filepath, function(err) {
            if (err || file ==null) {
                callback(err, null);
            }else{
                callback(null, file);
            }
        });
    });
};
GridFSHelper.prototype.readFile = function(fileId, range, callback){
    var gfs_options = {
        _id: fileId,
        range:{
            startPos:range.start,
            endPos:range.end
        }};
    var readstream = this.gfs.createReadStream(gfs_options);
    readstream.on('error', function (err) {
        callback(new objects.Result(objects.State().err,null,err.message));
    });
    callback(readstream);
};
GridFSHelper.prototype.deleteFile = function(fileId, callback){
    var gfs_options = {
        _id: fileId
    };
    var readstream = this.gfs.remove(gfs_options,function(err){
        if(err){
            callback(new objects.Result(objects.State().err,null,err.message));
        }else{
            callback(new objects.Result(objects.State().success,null,null));
        };
    });
};
exports.GridFSHelper = GridFSHelper;