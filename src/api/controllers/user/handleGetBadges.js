const badgeModel=require("../../models/badge"); 
const handleGetBadges=async(req,res,next)=>{
    try{
        const response=await badgeModel.find({});
        return res.status(200).send(response);
    }catch(err){
        next(err);
    }
}
module.exports=handleGetBadges;