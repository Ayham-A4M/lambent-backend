const skipDocuments = (page, limit) => {
    return (!page || page == 1) ? 0 : ((page - 1) * limit)
}
const paginationVariable = (page, limit = 15) => {
    const skip = skipDocuments(page, limit);
    return { skip, limit }
}
module.exports = paginationVariable;
