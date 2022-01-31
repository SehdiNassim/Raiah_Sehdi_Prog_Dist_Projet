const helmet = require("helmet");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const fileUpload =require('express-fileupload');
const UPLOAD_PATH = require('../api/utils/constants/file').path
// importing auth routes
const authRoute = require("../api/routes/auth");

// importing admin routes
const userRoute = require("../api/routes/user");

const productRoute = require("../api/routes/product");

const shopRoute = require("../api/routes/shop");

const cartRoute = require("../api/routes/cart");

const orderRoute = require("../api/routes/order");

const pagesRoute = require("../api/routes/pages");

const MAX_REQ_BODY_SIZE = process.env.MAX_REQ_BODY_SIZE ; 
const PUBLIC_DIRECTORY = process.env.PUBLIC_DIRECTORY ; 

function _configureServer(app) {
  console.log("Configuring server...");
  
    ///Initialize the passport
    app.use(passport.initialize());
    require('./passport');
  //  body parser
  app.use(express.json());
  // app.use(express.static(__dirname + '/docs'));

  // allows rendering of static files in this directory
  app.use(express.static(path.join(__dirname, PUBLIC_DIRECTORY)));

  // adds helmet module to express server
  // Helmet helps you secure your Express apps by setting various HTTP headers.
  // It's not a silver bullet, but it can help!
  app.use(helmet());

  // restricts the size of json body to 200kb
  app.use(bodyParser.json({ limit: MAX_REQ_BODY_SIZE }));
  app.use(bodyParser.urlencoded({ extended: true }));

  // for websites, to allow cross origin api access
  app.use(cors({
    origin: '*'
  }));

  //For Files, to limit files' size 
  app.use(fileUpload({
      abortOnLimit :true,
      createParentPath : true,    
      //safeFileNames : true,
      limits:{fileSize: 2*1024*1024}
  }));
  // logs request to console
  console.log("Setting up request logging...");
  app.use((req, _, next) => {
    if (!req.url.includes("/uploads")) {
      console.log(
        `\nReq: ${req.method} ${req.url} ${new Date().toString()} ${
          req.connection.remoteAddress
        }`
      );
    }
    next();
  });

}

function _setRoutes(app) {
  console.log("Setting up routes for api v1");
  app.use('/uploads',express.static(UPLOAD_PATH));
  //  auth middleware
  app.get('/', function(req, res) {
    res.send('Hello and welcome to iBuy !')
  })
  app.use("/auth", authRoute);

  app.use("/user", userRoute);

  //  user middleware
  app.use("/product", productRoute);

  app.use("/shop", shopRoute);

  app.use("/cart", cartRoute);

  app.use("/order", orderRoute);

  app.use("/pages", pagesRoute);


}

function _handleInvalidRoutes(app) {
  // handling 404 routes
  /* eslint-disable no-alert, no-unused-vars, no-console */
  app.use(function (req, res, next) {
    res.status(404);

    // respond with html page
    if (req.accepts("html")) {
      res.send("<h2> 404 Not found</h2>");
      return;
    }

    // respond with json
    if (req.accepts("json")) {
      res.send({ error: "Route not found" });
      return;
    }

    // default to plain-text. send()
    res.type("txt").send("Route not found");
    return;
  });
}

module.exports.initServer = (app) => {
  // setup the server before starting it
  _configureServer(app);
  _setRoutes(app);
  _handleInvalidRoutes(app);

  console.log("Starting server...");
  app.listen(process.env.PORT ||9000, (err) => {

    if (err) {

      // server run failed
      console.log(`Failed to listen on port ${process.env.PORT}`);
      console.error(err);
      process.exit(1);
    } else {

      // server run success
      console.log(`Listening on port ${process.env.PORT}`);
    }
  });
};
