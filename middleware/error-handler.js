const {
    BadRequestError,
    NotFoundError,
    UnauthenticatedError,
    CustomAPIError
} = require('../errors/errors-index')

const { StatusCodes } = require('http-status-codes')
const errorHandlerMiddleware = (err, req, res, next) => {
    let customError = { 
        // set default
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try again later',
    }

    /* if(err.name === 'ReferenceError'){
        customError.msg = `Note with id not found, can't delete note.`
    } */

    return res.status(customError.statusCode).json({ msg: customError.msg })
}

module.exports = errorHandlerMiddleware
