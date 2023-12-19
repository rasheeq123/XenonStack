const { Schema, model, Types}= require('../connection');

const slotschema = new Schema({
    floor: Number ,
    slot: Number,
    vehicle : String,
    time: Date,
    user: {type : Types.ObjectId, ref: 'user'}
});

module.exports=model('parkings', slotschema);