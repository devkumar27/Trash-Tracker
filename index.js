import express from "express";
import mongoose from "mongoose";
import cors from "cors";
const app = express();
import 'dotenv/config';
import cookieParser from "cookie-parser";
import authRoute from "./Routes/AuthRoute.js";
import complaintRoute from "./Routes/ComplaintRoute.js";
//const { MONGO_URL, PORT } = process.env;

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
    console.log('Connected!!')
  });

  app.use(cors({ credentials: true, origin: 'https://trash-tracker-gb4c.onrender.com' }));
  
  // ... other middleware and route handling
  
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  
app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);
app.use("/request", complaintRoute)