import { startServer } from "./server";
import dotenv from 'dotenv'
dotenv.config()

const main = async () => { 
await startServer()
}

main()