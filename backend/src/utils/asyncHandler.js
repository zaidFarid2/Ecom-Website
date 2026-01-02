const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err)); // .reject ki jagah .catch hota hai error handle karne ke liye
    };
};

export { asyncHandler };