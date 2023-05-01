const ProductService = require('../services/product-service');
const axios = require('axios')


module.exports = (app) => {
    const service = new ProductService();
    app.post('/product/create', async(req,res,next) => {

        try {
            const { name, desc, banner, price } = req.body;
            // validation
            const { data } =  await service.CreateProduct(
                { name, desc, banner, price }
            );
            return res.json(data);

        } catch (err) {
            next(err)
        }

    });

    app.get('/products', async (req,res,next) => {
        try {
            const { data } = await service.GetProducts();
            return res.json(data);
        } catch (error) {
            next(error)
        }
    });

    app.get('/products/:id', async (req,res,next) => {

        const productId = req.params.id;
        const searchText = req.query.q


        try {
            const product = await service.GetProductById(productId);
            const commentsResp = await axios.get(
                `http://host.docker.internal:8000/api/ms1/comments/ByProduct/${productId}?q=${searchText}`
            );
            const comments =  commentsResp.data
            return res.json({product, comments});
        } catch (err) {
            next(err)
        }
    });
}
