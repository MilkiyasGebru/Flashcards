import express from 'express';
import cors from 'cors';
import {connectToDataBase} from "./config/db.js";
import user_router from "./routers/UserRouter.js";
import word_router from "./routers/WordRouter.js";
import RequestLogger from "./middleware/Logger.js";


const app = express();

const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Authorization"],
    maxAge: 3600,
}


app.use(express.json());
app.use(cors(corsOptions));
app.use(RequestLogger)


app.use("/api/auth", user_router);
app.use("/api/word", word_router);

connectToDataBase().then( (sequelize)=> {
    console.log("Database connection established, now starting server")
    app.listen(8080, ()=> {
        console.log("Server started on port 8080");
    });
}).catch((err)=>{
    console.log("Error occurred connecting to the database", err)
})
