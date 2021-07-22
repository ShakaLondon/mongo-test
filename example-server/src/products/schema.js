import mongoose from "mongoose"

const { Schema, model } = mongoose

const ProductsSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      categoryId: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Collections'
      }]
    }
    ,
    {
      timestamps: true,
    }
  )

 ProductsSchema.static("findProductsWithCategories", async function (query) {
    const total = await this.countDocuments(query.criteria)
    const products = await this.find(query.criteria, query.options.fields)
      .skip(query.options.skip)
      .limit(query.options.limit)
      .sort(query.options.sort)
      .populate("categoryId")
  
    return { total, products }
  })
  
  export default model("Products", ProductsSchema)