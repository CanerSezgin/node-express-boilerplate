const hi = (req, res, next) => {
    res.status(200).json({hi: "there"})
}

module.exports = {
    hi
}