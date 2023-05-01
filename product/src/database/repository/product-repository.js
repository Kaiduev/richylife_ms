const { ProductModel } = require("../models");
const { APIError, BadRequestError } = require("../../utils/app-errors");

//Dealing with data base operations
class ProductRepository {
  async CreateProduct({
    name,
    desc,
    banner,
    price,
  }) {
    try {
      const product = new ProductModel({
        name,
        desc,
        banner,
        price,
      });

      const productResult = await product.save();
      return productResult;
    } catch (err) {
      throw new APIError(
        "API Error", STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Product"
      );
    }
  }

  async Products() {
    try {
      return await ProductModel.find();
    } catch (err) {
      throw new APIError(
        "API Error", STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get Products"
      );
    }
  }

  async FindById(id) {
    try {
      return await ProductModel.findById(id);
    } catch (err) {
      throw new APIError(
        "API Error", STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Product"
      );
    }
  }

}

module.exports = ProductRepository;
