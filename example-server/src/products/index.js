import express from "express"
import createError from "http-errors"
import mongoose from "mongoose"


import ProductModel from "./schema.js"


const productRouter = express.Router()

productRouter.post("/", async (req, res, next) => {
    try {
      const newProduct = new ProductModel(req.body)
      const { _id } = await newProduct.save()
  
      res.status(201).send({ _id })
  
    } catch (error) {
  
      if (error.name === "ValidationError") {
  
        next(createError(400, error))
  
      } else {
  
        console.log(error)
  
        next(createError(500, "An error occurred while creating new product"))
      }
    }
  })
  
  productRouter.get("/", async (req, res, next) => {
    try {
  
      const query = q2m(req.query)
  
      const { total, products } = await ProductModel.findProductsWithCategories(query)
    
      res.send({ links: query.links("/products", total), total, products })
  
    } catch (error) {
  
      next(createError(500, "An error occurred while getting blogs' list "))
  
    }
  })

export default productRouter