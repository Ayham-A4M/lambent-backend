const { default: mongoose } = require('mongoose');

const learningTimeSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    year:{type:Number,required:true},
    monthIndex:{type:Number,required:true},
    weekIndex:{type:Number,required:true},
    learningTime:{type:[{dayIdx:Number,learningTime:Number}],default:[{dayIdx:0,learningTime:0},{dayIdx:1,learningTime:0},{dayIdx:2,learningTime:0},{dayIdx:3,learningTime:0},{dayIdx:4,learningTime:0},{dayIdx:5,learningTime:0},{dayIdx:6,learningTime:0}]}
});
learningTimeSchema.index({ userId: 1, year: 1, weekIndex: 1 }, { unique: true });
learningTimeSchema.index({ userId: 1, weekIndex: 1 });

const learningTimeModel = mongoose.model('learningTime', learningTimeSchema, 'learningTimes');
module.exports=learningTimeModel