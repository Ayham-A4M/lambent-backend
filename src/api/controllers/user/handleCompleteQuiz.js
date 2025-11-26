const completedQuizModel=require('../../models/completedQuiz');
const {checkAnswersBadges}=require("../../../services/BadgeService");
const handleCompleteQuiz=async(req,res,next)=>{
    try{
        const answers=req.body.answers;
        const {courseId,lessonId,quizId}=req.params;
        const userId=res.locals.id
        const completedQuiz={userId,courseId,lessonId,quizId,answers}
        const response=await new completedQuizModel(completedQuiz).save();
        await checkAnswersBadges(userId);
        if(response){
            return res.status(200).send({});
        }
    }catch(err){
        next(err)
    }
}
module.exports=handleCompleteQuiz