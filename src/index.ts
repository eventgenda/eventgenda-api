import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import blogRouter from '../routes/blog.route';
import categoryRouter from '../routes/category.route';
import eventRouter from '../routes/event.route';
import eventRuleRouter from '../routes/eventRule.route';
import historyRouter from '../routes/history.route';
import locationRouter from '../routes/location.route';
import organizationRouter from '../routes/organization.route';
import paymentRouter from '../routes/payment.route';
import projectRouter from '../routes/project.route';
import rewardRouter from '../routes/reward.route';
import sponsorRouter from '../routes/sponsor.route';
import uploadRouter from '../routes/upload.route';
import userRouter from '../routes/user.route';

dotenv.config();

const app: Express = express();

const port = process.env.PORT ?? 8081;
const URL = process.env.MONGODB_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Eventgenda is running!' });
});
mongoose
  .connect(URL as string)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/api/auth', userRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/location', locationRouter);
app.use('/api/event-rule', eventRuleRouter);
app.use('/api/payment', paymentRouter);
app.use('/api/event', eventRouter);
app.use('/api/reward', rewardRouter);
app.use('/api/history', historyRouter);
app.use('/api/category', categoryRouter);
app.use('/api/project', projectRouter);
app.use('/api/sponsor', sponsorRouter);
app.use('/api/organization', organizationRouter);
app.use('/api/uploads', uploadRouter);
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
