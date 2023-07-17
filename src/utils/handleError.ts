import { Response } from 'express';

const handleError = (
  error: any,
  res: Response,
  statusCode = 500,
) => {
  const {
    statusCode: httpStatusCode = statusCode,
    message,
    data = undefined,
    isAppError = false,
    stack,
  } = error;

  console.error(stack);

  res.status(httpStatusCode).json({
    message,
    data,
    isAppError,
  });
};

export default handleError;
