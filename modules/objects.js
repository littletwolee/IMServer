/**
 * Created by lee on 9/23/15.
 */
Result = function(_state,_data,_msg){
    this.ReturnCode = _state;
    this.Data = _data;
    this.Message = _msg;
};
exports.Result = Result;
State = function(){
    this.success = 0;
    this.err = -1;
    return this;
};
exports.State = State;