const hi = (req, res, next) => {
    return res.status(200).json({hi: "there"})
}

module.exports = {
    hi
}