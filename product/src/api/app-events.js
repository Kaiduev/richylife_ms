module.exports = (app) => {
    app.use('/app-evens', async (req, res, next) => {
        return res.status(200).json({"msg": "Hello Product"})
    })
}