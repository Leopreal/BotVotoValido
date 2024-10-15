import mongoose from "mongoose";
import config from "config";

async function conect() {
  const db = config.get<string>("db");

  try {
    await mongoose.connect(db);

    console.log("conectou ao banco!");
  } catch (error) {
    console.log(error);
  }
}

export default conect;
