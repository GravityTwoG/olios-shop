export class ApiError extends Error {
  error: string;
  statusCode: number;

  constructor(error: string, message: string, statusCode: number) {
    super(message);
    this.error = error;
    this.statusCode = statusCode;
  }
}
