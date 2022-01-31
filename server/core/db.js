const mongoose = require("mongoose");

// this method will return mongodb connection uri (string)
// based on the configuration
function _getConnectionString() {
  return `${process.env.DB_HOST}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}`; 
}

module.exports.connectToDB = () => {
  console.log("Connecting to db...");
  // console.log(_getConnectionString(appConfig));

  // connecting to database here
  console.log(_getConnectionString())
  mongoose.connect(
    _getConnectionString(),
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    },
    (error) => {
      // if connection was failed, then it prints out the error and exits
      if (error) {
        console.log("Unable to connect to db");
        console.error(error);
        process.exit(1);
      } else {
        // connection is successful prints out which db is connected to
        console.log(`Connected to db ${process.env.DB_NAME} successfully`);  
       // require('../initDB');
      }
    }
  );
};
