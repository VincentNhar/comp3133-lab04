const express = require("express");
const userRouter = require("./routes/userRoute");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(userRouter)

const SERVER_PORT = 3000;

const CONNECTION_STRING = "mongodb+srv://dbrootadmin:dbpassword@cluster0.o0ag19w.mongodb.net/db_w2024_comp3133";

mongoose.connect(`${CONNECTION_STRING}?retryWrites=true&w=majority`, {
}).then(success => {
  console.log(`MongoDB connected. \nDB Document: ${success.connection.name}`)
}).catch(err => {
  console.log(`Error while MongoDB connection ${err}`)
});

app.listen(SERVER_PORT, () => {
    console.log(`Server is running in http://localhost:${SERVER_PORT}`)
})