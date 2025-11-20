import express from 'express';
import cors from 'cors'
import { authenticationMiddleware } from "./middlewares/auth.middleware.js";

const app = express();
const corsOptions = { origin: ['http://localhost:4321'] }
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authenticationMiddleware)

import userRouter from "./routes/user.routes.js";
import urlRouter from "./routes/url.routes.js";
app.use('/users', userRouter)
app.use('/url', urlRouter)

export default app
