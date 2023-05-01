const CommentService = require('../services/comment-service');
const {CommentModel} = require("../database/models");

module.exports = (app) => {
    const service = new CommentService();

    app.post('/comment/create', async(req,res,next) => {
        try {
            const { author, product_id, text } = req.body;
            // validation
            const { data } =  await service.CreateComment({ author, product_id, text });
            return res.json(data);

        } catch (err) {
            next(err)
        }

    });

    app.get('/comments', async (req,res,next) => {
        try {
            const { data } = await service.GetComments();
            return res.json(data);
        } catch (error) {
            next(error)
        }
    });

    app.get('/comments/search', async (req, res, next) => {
        const searchText = req.query.q;
        try {
            const { data } = await service.SearchComment(searchText)
            return res.json(data)
        } catch (error) {
            next(error)
        }
    });

    app.get('/comments/:id', async (req,res,next) => {

        const commentId = req.params.id;

        try {
            const comment = await service.GetCommentById(commentId);
            return res.json(comment);
        } catch (err) {
            next(err)
        }
    });

    app.get('/comments/ByProduct/:product_id', async (req,res,next) => {

        const productId = req.params.product_id;
        const searchText = req.query.q;
        try {
            const comments = await service.GetCommentByProductId(productId, searchText);
            return res.json(comments);
        } catch (err) {
            next(err)
        }
    });
}
