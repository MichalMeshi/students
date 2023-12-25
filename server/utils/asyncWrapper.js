
const asyncWrap = (fn) => {
    console.log("in warp");
    return (req, res, next) => {
        fn(req, res, next).catch(err => next(err));
    }
}

module.exports = asyncWrap;