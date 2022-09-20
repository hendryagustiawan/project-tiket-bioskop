const errHandler = (err, req, res, next) => {
  let statusCode;
  let errMessage;

  switch (err.name) {
    case "SequelizeValidationError":
      statusCode = 400;
      errMessage = err.errors.map((el) => {
        return el.message;
      });
      break;
    case "Email already":
      statusCode = 400;
      errMessage = "Email already registered";
      break;
    case "emailRequired":
      statusCode = 400;
      errMessage = `Email is required`;
      break;
    case "password and email required":
      statusCode = 400;
      errMessage = `Email and Password is required`;
      break;
    case "passwordRequired":
      statusCode = 400;
      errMessage = `Password is required`;
      break;
    case "Token required":
      statusCode = 400;
      errMessage = `does't access because token is required`;
      break;
    case "invalidUser":
    case "TypeError":
      statusCode = 401;
      errMessage = `Authenticated Failed`;
      break;
    case "JsonWebTokenError":
      statusCode = 401;
      errMessage = `Invalid Token`;
      break;
    case "Forbidden":
      statusCode = 403;
      errMessage = `Does't Access`;
      break;
    case "Can't Add":
      statusCode = 401;
      errMessage = "Movie is Already";
      break;
    case "notFound":
      statusCode = 404;
      errMessage = `Data not Found`;
      break;
    default:
      statusCode = 500;
      errMessage = "Internal Server Error";
  }

  res.status(statusCode).json({ message: errMessage });
};

module.exports = errHandler;
