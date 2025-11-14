const completedQuizModel=require('../../models/completedQuiz');
const handleCompleteQuiz=async(req,res,next)=>{
    try{
        const answers=req.body.answers;
        const {courseId,lessonId,quizId}=req.params;
        const userId=res.locals.id
        const completedQuiz={userId,courseId,lessonId,quizId,answers}
        const response=await new completedQuizModel(completedQuiz).save();
        if(response){
            return res.status(200).send({});
        }
    }catch(err){
        next(err)
    }
}
module.exports=handleCompleteQuiz