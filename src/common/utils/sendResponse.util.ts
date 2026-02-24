export class SendResponseUtil {
  static success(data: any,message: string = 'Success',statusCode: number = 200) {
    return {
      success: true,
      statusCode,
      message,
      data,
    };
  }

  static error(message: string = 'Internal Server Error',statusCode: number = 500,error: any = null) {
    return {
      success: false,
      statusCode,
      message,
      error,
    };
  }
}

// HttpStatus.OK              // 200
// HttpStatus.CREATED         // 201
// HttpStatus.BAD_REQUEST     // 400
// HttpStatus.UNAUTHORIZED    // 401
// HttpStatus.FORBIDDEN       // 403
// HttpStatus.NOT_FOUND       // 404
// HttpStatus.INTERNAL_SERVER_ERROR // 500