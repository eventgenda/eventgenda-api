"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const mongoose_1 = __importDefault(require("mongoose"));
const blog_route_1 = __importDefault(require("../routes/blog.route"));
const category_route_1 = __importDefault(require("../routes/category.route"));
const event_route_1 = __importDefault(require("../routes/event.route"));
const eventRule_route_1 = __importDefault(require("../routes/eventRule.route"));
const history_route_1 = __importDefault(require("../routes/history.route"));
const location_route_1 = __importDefault(require("../routes/location.route"));
const organization_route_1 = __importDefault(require("../routes/organization.route"));
const payment_route_1 = __importDefault(require("../routes/payment.route"));
const project_route_1 = __importDefault(require("../routes/project.route"));
const reward_route_1 = __importDefault(require("../routes/reward.route"));
const sponsor_route_1 = __importDefault(require("../routes/sponsor.route"));
const upload_route_1 = __importDefault(require("../routes/upload.route"));
const user_route_1 = __importDefault(require("../routes/user.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 8081;
const URL = process.env.MONGODB_URI;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: '/tmp/',
}));
app.get('/', (req, res) => {
    res.json({ message: 'Eventgenda is running!' });
});
mongoose_1.default
    .connect(URL)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));
// Routes
app.use('/api/auth', user_route_1.default);
app.use('/api/blogs', blog_route_1.default);
app.use('/api/location', location_route_1.default);
app.use('/api/event-rule', eventRule_route_1.default);
app.use('/api/payment', payment_route_1.default);
app.use('/api/event', event_route_1.default);
app.use('/api/reward', reward_route_1.default);
app.use('/api/history', history_route_1.default);
app.use('/api/category', category_route_1.default);
app.use('/api/project', project_route_1.default);
app.use('/api/sponsor', sponsor_route_1.default);
app.use('/api/organization', organization_route_1.default);
app.use('/api/uploads', upload_route_1.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
