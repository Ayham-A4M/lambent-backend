const calculateNumberOfPages = (limit, numberOfDocs) => {
    return Math.ceil(numberOfDocs / limit)
}
module.exports = calculateNumberOfPages