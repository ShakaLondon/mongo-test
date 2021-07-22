import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import listEndpoints from 'express-list-endpoints'
import categoryRouter from "./category/index.js";
import productsRouter from "./products/index.js";


const port = process.env.PORT || 3004;


const server = express();

server.use(cors());
server.use("/categories", categoryRouter);
server.use("/products", productsRouter);

console.table(listEndpoints(server));

mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() =>
    server.listen(port, () => {
      console.log(' ✅  Server is running on port: ' + port);
    })
  )
  .catch((err) => console.log(err));