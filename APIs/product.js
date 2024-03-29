const productApp = require("express").Router();
const expressAynsHandler = require("express-async-handler");
const fs = require("fs");
const ApiFeatures = require("../apiFeatures");

productApp.get(
  "/getproducts",
  expressAynsHandler(async (request, response) => {
    let productDataObject = request.app.get("productDataObject");
    let allProducts = await productDataObject.find({}).toArray();
    response.send({ message: "this is products data", payload: allProducts });
  })
);

productApp.get(
  "/search",
  expressAynsHandler(async (req, res, next) => {
    // return next(new ErrorHandler("This is my temp error",500))
    // const resultPerPage = 8;
    // console.log(req.query);
    let productDataObject = req.app.get("productDataObject");
    // await productDataObject.updateMany({}, [
    //     { $set: { price: { $toLong: "$price" } } }
    //   ]);
    let products = await productDataObject
      .find({
        $and: [
          {
            title: {
              $regex: req.query.keyword,
              $options: "i",
            },
          },
          {
            brand: {
              $regex: req.query.brand,
              $options: "i",
            },
          },
          {
            type: {
              $regex: req.query.type,
              $options: "i",
            },
          },
          {
            platform: {
              $regex: req.query.platform,
              $options: "i",
            },
          },
          { price: { $gte: Number(req.query.priceL) } },
          { price: { $lte: Number(req.query.priceH) } },
        ],
      })
      .toArray();
    let skip = (Number(req.query.page_no)-1) * Number(req.query.pageC);
    const productsCount = products.length;
    products = products.slice(skip, skip + Number(req.query.pageC));

    res.status(200).json({
      success: true,
      productsCount,
      products,
      //   productsC
      //   resultPerPage,
      //   filteredProductsCount,
    });
  })
);

productApp.get(
  "/createproduct",
  expressAynsHandler(async (request, response) => {
    const jsonFilePath = "src/data/totalData.json";
    const productdataObject = request.app.get("productDataObject");
    const dataObject = JSON.parse(fs.readFileSync(jsonFilePath, "utf8"));
    let result = await productdataObject.insertMany(dataObject);
    response.send({ message: "added", payload: `products added are` });
  })
);

productApp.delete(
  "/deleteAll",
  expressAynsHandler(async (request, response) => {
    const productdataObject = request.app.get("productDataObject");
    let res = await productdataObject.deleteMany({});
    response.send({ message: `deleted ${res.deletedCount} items` });
  })
);
module.exports = productApp;
