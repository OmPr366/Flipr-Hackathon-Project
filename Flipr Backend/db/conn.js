const mongoose = require("mongoose");
const DB = process.env.DATABASE || 'mongodb+srv://omprarox:flipr@flipr.28tu6ws.mongodb.net/test';
mongoose.set("strictQuery", false);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log("Rrror  in conncting to database:- ",err);
  });
