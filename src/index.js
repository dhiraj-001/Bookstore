import dotenv from 'dotenv';

dotenv.config();

import connectdb from './db/index.js'
import { app } from './app.js';

connectdb()
.then(()=>{
  app.on("error", (err)=>{
    console.log("Error !!! ", err);
  })

  app.listen(process.env.PORT || 5173, ()=>{
    console.log(`Server is listening on port : ${process.env.PORT}`);

  })
})
.catch((err) =>{
  console.log("MongoDB connection failed !!! ", err)
})