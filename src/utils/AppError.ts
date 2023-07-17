class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public data: any = undefined,
    public isAppError: boolean = true,
    public stack: string = ''
  ) {
    super(message);

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
