class ApiResponse{
  constructor(statusCode,data, message = "Success" ) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode < 400; // statuscode below 400 is used for response from api or success ... For errors use statusCode above 400
  }
}


export default ApiResponse