import express from "express"
import createError from "http-errors"
import mongoose from "mongoose"


import CategoryModel from "./schema.js"


const categoryRouter = express.Router()

categoryRouter.post("/", async (req, res, next) => {
    try {
      const newProduct = new CategoryModel(req.body)
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
  
 categoryRouter.get("/", async (req, res, next) => {
    try {
  
      const categories = await CategoryModel.find()
  
      res.send(categories)
  
    } catch (error) {
  
      next(createError(500, "An error occurred while getting blogs' list "))
  
    }
  })

export default categoryRouter