import express, { Request, Response } from "express"
import {createConnection} from "typeorm"

const app = express();
const PORT = 5000;

createConnection().then(() => {
    console.log("Database Connected")
}).catch((e) => {
    console.log("Error:" + e)
})

app.listen(PORT, (): void => {
    console.log("Server is running on " + PORT)
})