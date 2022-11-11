import mongoose from "mongoose";
import config from "config"



function connect(){
    const dbUri=config.get("dbUri") as string;

    return mongoose
      .connect(dbUri)
      .then(()=>{
        console.log("Database Connected")
      })
      .catch((error)=>{
    console.error("db error",error)
        process.exit(1)
      })
}

export default connect;