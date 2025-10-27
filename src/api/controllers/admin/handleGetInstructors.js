const instructorModel = require('../../models/instructor');
const paginationVariable = require('../../helpers/paginationVariable');
const calculateNumberOfPages = require('../../helpers/calculateNumberOfPages')
const handleGetInstructors = async (req, res, next) => {
    try {
        const page = parseInt(req.query?.page) || 1;
        console.log(page)
        const { skip, limit } = paginationVariable(page);

        const response = await instructorModel.find({},{password:false,tokenVersion:false,role:false}).skip(skip).limit(limit);

        if (response.length === 0) { return res.status(200).send({ instructors: [] }) }
        const Response = { instructors: response }
        
        let numberOfPages = undefined;
        if (page === 1) {
            const numberOfDocs = await instructorModel.countDocuments({});
            numberOfPages = calculateNumberOfPages(limit, numberOfDocs);
            
            Response.limit = numberOfPages;
        }
        return res.status(200).send(Response);
    } catch (err) {
        next(err);
    }
}
module.exports = handleGetInstructors