import { connectMongoDB } from "./config/mongoDB";

const startC = async () => {
  const resultConnection = await connectMongoDB()
  console.log(resultConnection)
}
startC()