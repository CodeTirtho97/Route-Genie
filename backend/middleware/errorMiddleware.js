const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            msg: Object.values(err.errors).map((val) => val.message).join(", "),
        });
    }

    res.status(err.statusCode || 500).json({
        success: false,
        msg: err.message || "Server Error",
    });
};

module.exports = errorHandler;
