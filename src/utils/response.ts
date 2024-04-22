import { Response } from 'express';

function created(
  message: string = "successfully created data!",
  values: any,
  res: Response
) {
  const data = values;
  res.statusMessage = message;
  res.status(201).json({
    code: 201,
    message,
    data: values,
  });
  res.end();
}

function ok(
  message: string = "Successfully retrive data!",
  values: any,
  res: Response
) {
  const data = values;
  res.statusMessage = message;
  res.status(200).json({
    code: 200,
    message,
    data: values,
  });
  res.end();
  
}

function bad(
  message: string = "Failed retrive data!",
  values: any,
  res: Response
) {
  const data = values;
  res.statusMessage = message;
  res.status(403).json({
    code: 403,
    message,
    data: values,
  });
  res.end();
}

function notfound(
  message: string = "Data not found!",
  values: any,
  res: Response
) {
  const data = values;
  res.statusMessage = message;
  res.status(404).json({
    code: 404,
    message,
    data: values,
  });
  res.end();
}

function unauthorized(
  message: string = "Unauthorized",
  values: any,
  res: Response
) {
  const data = values;
  res.statusMessage = message;
  res.status(401).json({
    code: 401,
    message,
    data: values,
  });
  res.end();
}

function forbidden(
  message: string = "Forbidden",
  values: any,
  res: Response
) {
  const data = values;
  res.statusMessage = message;
  res.status(403).json({
    code: 403,
    message,
    data: values,
  });
  res.end();
}

function error(
  message: string = "Internal server error",
  values: any,
  res: Response
) {
  const data = values;
  res.statusMessage = message;
  res.status(500).json({
    code: 500,
    message,
    data: values,
  });
  res.end();
}

function nocontent(
  message: string = "No content",
  values: any,
  res: Response
) {
  const data = values;
  res.statusMessage = message;
  res.status(204).json({
    code: 204,
    message,
    data: values,
  });
  res.end();
}

function badrequest(
  message: string = "Bad request",
  values: any,
  res: Response
) {
  const data = values;
  res.statusMessage = message;
  res.status(400).json({
    code: 400,
    message,
    data: values,
  });
  res.end();
}

function conflict(
  message: string = "Conflict",
  values: any,
  res: Response
) {
  const data = values;
  res.statusMessage = message;
  res.status(409).json({
    code: 409,
    message,
    data: values,
  });
  res.end();
}

function unprocessable(
  message: string = "Unprocessable Entity",
  values: any,
  res: Response
) {
  const data = values;
  res.statusMessage = message;
  res.status(422).json({
    code: 422,
    message,
    data: values,
  });
  res.end();
}

function gone(
  message: string = "Gone",
  values: any,
  res: Response
) {
  const data = values;
  res.statusMessage = message;
  res.status(410).json({
    code: 410,
    message,
    data: values,
  });
  res.end();
}

function unsupported(
  message: string = "Unsupported Media Type",
  values: any,
  res: Response
) {
  const data = values;
  res.statusMessage = message;
  res.status(415).json({
    code: 415,
    message,
    data: values,
  });
  res.end();
}

function notimplemented(
  message: string = "Not Implemented",
  values: any,
  res: Response
) {
  const data = values;
  res.statusMessage = message;
  res.status(501).json({
    code: 501,
    message,
    data: values,
  });
  res.end();
}

function serviceunavailable(
  message: string = "Service Unavailable",
  values: any,
  res: Response
) {
  const data = values;
  res.statusMessage = message;
  res.status(503).json({
    code: 503,
    message,
    data: values,
  });
  res.end();
}

export default {
  created,
  ok,
  bad,
  notfound,
  unauthorized,
  forbidden,
  error,
  nocontent,
  badrequest,
  conflict,
  unprocessable,
  gone,
  unsupported,
  notimplemented,
  serviceunavailable,
};
