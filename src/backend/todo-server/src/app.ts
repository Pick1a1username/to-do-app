// import * as express from "express";
// import * as url from "url";

// const app = express();

// app.get("/hello", (request, response) => {
//   const getParams = url.parse(request.url, true).query;

//   if (Object.keys(getParams).length == 0) {
//     response.end("Hello all");
//   } else {
//     response.end("Hello " + getParams.name);
//   }
// });

// app.listen(3000);


import * as createError from "http-errors";
import * as express from "express";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";

import * as swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./static/swagger.json";

import indexRouter from "./routes/index";
import catalogRouter from "./routes/catalog"

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// '/catalog/api-docs' should be before '/catalog'.
app.use('/catalog/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/catalog', catalogRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000);

export default app;