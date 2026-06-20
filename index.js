const express= require("express");
const app = express();
const PORT = 8080;
app.use(express.json());
const userRoute = require("./routers/users");
const booksRoute = require("./routers/books")
app.use("/users",userRoute)
app.use("/books",booksRoute)

app.listen(PORT,()=>{
    console.log(`Server is up and running on http://localhost:${PORT}`);
})