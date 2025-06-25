import { NextFunction, Request, Response } from "express"

const handleError = (error: unknown, req: Request, res: Response, next: NextFunction): Response => {
  const errMsg = error instanceof Error ? error.message : "Unexpected error"
  const errCode = (error as any).code || 500

  return res.status(500).json({
    success: false,
    message: errMsg,
    statusCode: errCode
  })
 }

export { handleError }