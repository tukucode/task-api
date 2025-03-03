import cors from 'cors'
import express, { type Request, type Response } from 'express';

import { PORT, BASE_URL_ORIGIN } from './lib/constants'
import { sendResponse } from './lib/utils'

import taskRoutes from './routes/tasks';

const app = express();

app.use(
  cors({
    origin: BASE_URL_ORIGIN,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({limit: '1mb', extended: true}));

// service api version 1
app.use('/api/v1', [taskRoutes]);

// Handling route not found
app.all("*", (_, res: Response) => {
  sendResponse(res, 404, "Not found", null)
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));