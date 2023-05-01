const { CommentModel } = require("../models");
const { APIError, BadRequestError } = require("../../utils/app-errors");
const {json} = require("express");

class CommentRepository {
  async CreateComment({
    author,
    product_id,
    text
  }) {
    try {
      const comment = new CommentModel({
        author,
        product_id,
        text
      });

      const commentResult = await comment.save();
      return commentResult;
    } catch (err) {
      throw new APIError(
        "API Error", STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Comment"
      );
    }
  }

  async Comments() {
    try {
      return await CommentModel.find();
    } catch (err) {
      throw new APIError(
        "API Error", STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get Comments"
      );
    }
  }

  async SearchByText(searchText) {
    try{
      return await CommentModel.find({ $text: { $search: searchText } });
    }catch (err){
      throw new APIError(
          "API Error", STATUS_CODES.INTERNAL_ERROR,
          "Unable to Get Comments"
      );
    }
  }

  async FindById(id) {
    try {
      return await CommentModel.findById(id);
    } catch (err) {
      throw new APIError(
        "API Error", STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Comment"
      );
    }
  }

  async FindByProductId(productId, searchText) {

    try {
      if(searchText === "yes"){
        return await CommentModel.find({ $text: { $search: "Orange" }, product_id: productId });
      }else {
        return await CommentModel.find({ product_id: productId });
      }
    } catch (err) {
      throw new APIError(
          "API Error", STATUS_CODES.INTERNAL_ERROR,
          "Unable to Find Comment"
      );
    }
  }

}

module.exports = CommentRepository;
