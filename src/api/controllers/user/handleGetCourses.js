const { default: mongoose } = require('mongoose');
const courseModel = require('../../models/course')
const handleGetCourses = async (req, res, next) => {
    try {
        const userId = res.locals.id;
        const courses = await courseModel.aggregate([
            {
                $lookup: {
                    from: 'coursesProgress',
                    let: { courseId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$courseId", "$$courseId"] },
                                        { $eq: ["$userId", new mongoose.Types.ObjectId(userId)] },
                                    ]
                                }
                            }
                        }
                    ],
                    as: "accessInfo"
                }
            },
            {
                $addFields: {
                    hasAccess: {
                        $cond: {
                            if: { $gt: [{ $size: "$accessInfo" }, 0] },
                            then: true,
                            else: false
                        }
                    }
                }
            },
            {
                $project: {
                    accessInfo: 0
                }
            }
        ])
        // console.log(courses)
        // const courses = await courseModel.find();
        if (courses) {
            return res.status(200).send({ courses });
        }
    } catch (err) {
        next(err);
    }
}
module.exports = handleGetCourses;