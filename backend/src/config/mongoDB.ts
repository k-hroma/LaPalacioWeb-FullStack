import { connect, ConnectionStates } from "mongoose";
import dotenv from 'dotenv'
import { ConnectResults } from '../types/connectionResults';

dotenv.config()
const MONGO_URIDB = process.env.MONGO_URIDB || ""

let connectMDB: { isConnected: boolean } = {isConnected:false}

const connectMongoDB = async ():Promise<ConnectResults>=> {
  if (!MONGO_URIDB) {
    const errMsg = "MongoDB URI is missing or empty"
    console.error(errMsg);
    return {
      success: false,
      message:errMsg
    }
  };

  if (connectMDB.isConnected) { 
    const msg = "Using existing MongoDB connection"
    console.info(msg)
    return {
      success: true, 
      message: msg
    }
  };

  try {
    const resultConnection = await connect(MONGO_URIDB, {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize:10
    })
    
    if (!resultConnection) { 
      throw new Error("Unexpected error while connecting MongoDB")
    }

    const isConnected = resultConnection.connection.readyState === ConnectionStates.connected
    if (!isConnected) { 
      throw new Error("Connection established but not readyd")
    }
    
    connectMDB.isConnected = true

    resultConnection.connection.on('disconected', () => {
      connectMDB.isConnected = false;
      console.warn("MongoDB connection lost")
    })
    
    resultConnection.connection.on('reconected', () => { 
      connectMDB.isConnected = true;
      console.info("MongoDB connection reestablished.")
    })

    const msg = "MongoDB connected successfully."
    console.log(`${msg} Host: ${resultConnection.connection.host}`)

    return {
      success: true,
      message:msg
    }
    
  } catch (error:unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    console.error(errMsg)
    return {
      success: false,
      message: errMsg
    }
  };
  ;
 }

export { connectMongoDB }
