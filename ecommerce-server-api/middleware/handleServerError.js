const handleServerError = (err, req, res, next) => {

    console.log(err) // ValidationError
    // console.log(err.message) // ValidationError
    if (err.name === "ValidationError") {
        return res.status(400).send({
            msg: "Bad Request",
            errors: err.errors
            /* TODO: send database errors in simple format */
        })
    }
    res.status(500).send({ msg: "Server error" })
}

module.exports = handleServerError