import { Request, Response, NextFunction} from "express"
import { ErrorResult } from "../types/errorResult"

const handleError = (error: unknown, req: Request, res: Response<ErrorResult>, next: NextFunction) => {
  const errMsg = error instanceof Error ? error.message : "Unexpected error"
  const errCode = (error as any).code || 500

    res.status(500).json({
    success: false,
    message: errMsg,
    errorCode: errCode
  })
 }

export { handleError }