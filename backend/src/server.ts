import { app } from "./app"
import { connectMongoDB } from "./config/mongoDB"
import { ConnectResults } from "./types/connectionResults"

const PORT = Number(process.env.PORT) || 3000

const startServer = async ():Promise<ConnectResults> => {
  if (!PORT || Number.isNaN(PORT)) { 
    const errMsg = "Invalid or missing PORT environment variable."
    console.error(errMsg)
    return {
      success: false,
      message: errMsg
    }
  }
  try {
    const dbConnect = await connectMongoDB()
    
    if (!dbConnect.success) { 
      const errMsg = dbConnect.message
      console.error(errMsg)
      throw new Error(errMsg)
    }

    console.log(dbConnect.message)

    const msgConfirmation = `Server is running on port ${PORT};`
    const apiUrlBooks = `http://localhost:${PORT}/api/books`;
    const apiUrlWriters = `http://localhost:${PORT}/api/writers`;

    const listenPort = app.listen(PORT, () => {
      console.log(msgConfirmation);
      console.log(`API Books available at: ${apiUrlBooks}`)
      console.log(`API Writes available at: ${apiUrlWriters}`)
    });

    // app.listen() siempre devuelve un Server válido o lanza un error. Esa verificación no es útil.
    if (!listenPort) { 
      throw new Error("Server connection failed")
    }
    
    return {
      success: true, 
      message: msgConfirmation
    }
    
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : "Unknown error"
    console.error(errMsg)
    return {
      success: false, 
      message: errMsg
    }
    
  }
 }

export { startServer }