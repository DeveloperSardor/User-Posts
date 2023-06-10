const errorMiddleware = (err, req, res, next) => {
    console.log(err);
    if (err instanceof SyntaxError) {
        res.status(400).json({
            error: "Invalid Request",
        });
    } else {
        res.status(500).json({
            error: "Server's error",
        });
    }
};

export default errorMiddleware;