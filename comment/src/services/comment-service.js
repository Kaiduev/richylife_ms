const { CommentRepository } = require("../database");
const { FormateData } = require("../utils");
const { APIError } = require('../utils/app-errors');

// All Business logic will be here
class CommentService {

    constructor(){
        this.repository = new CommentRepository();
    }

    async CreateComment(commentInputs){
        try{
            const commentResult = await this.repository.CreateComment(commentInputs)
            return FormateData(commentResult);
        }catch(err){
            throw new APIError('Data Not found')
        }
    }
    
    async GetComments(){
        try{
            const comments = await this.repository.Comments();
            
            return FormateData(comments)

        }catch(err){
            throw new APIError('Data Not found')
        }
    }

    async SearchComment(searchText) {
        try {
            const comments = await this.repository.SearchByText(searchText);
            return FormateData(comments)
        }catch (err){
            throw new APIError('Data Not found')
        }
    }

    async GetCommentById(commentId){
        try {
            return await this.repository.FindById(commentId);
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }

    async GetCommentByProductId(productId, searchText){
        try {
            return await this.repository.FindByProductId(productId, searchText);
        } catch (err) {
            throw new APIError('Data Not found')
        }
    }
     
}

module.exports = CommentService;