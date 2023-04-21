const mongoose = require("mongoose");
const DB = process.env.DATABASE || 'mongodb+srv://omprarox:flipr@cluster0.4ltzdwk.mongodb.net/?retryWrites=true&w=majority';
mongoose.set("strictQuery", false);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database connected Successful");
  })
  .catch((err) => {
    console.log("Rrror  in conncting to database:- ",err);
  });
