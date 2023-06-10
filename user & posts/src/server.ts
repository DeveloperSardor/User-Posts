import express, { Application, Request, Response } from "express";
import "./utils/connection.ts";
import router from "./router/index.js";
import dotenv from "dotenv";
import swRouter from "./utils/swagger.js";
import errorHandler from "./middleware/error.handler.js";
dotenv.config();
  
const app: Application = express();
   
app.use(express.json());
app.use("/api", router);          
app.use(errorHandler);    

// app.use(swRouter)  swagger ishlamaydi
     

              app.use('/*', (req, res)=>{
                res.send('Url Not Found')
              })





app.get("/", (req: Request, res: Response) => {
  res.send("IT is runnig!");
});

app.listen(process.env.PORT, () => {
  console.log("server is running! " + process.env.PORT);
});
