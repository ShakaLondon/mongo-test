import mongoose from "mongoose"

const { Schema, model } = mongoose

const CategorySchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      }
    },
    {
      timestamps: true, // adding createdAt and modifiedAt automatically
    }
  )
  
  export default model("Category", CategorySchema)