const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
require('./models/db');

const SignupRouter = require('./router/SignupRouter');
const LoginRouter = require('./router/Loginrouter');
const AdminRouter = require('./router/AdminRouter');
const TaskRouter = require('./router/TaskRouter');
const ProjectRouter = require('./router/ProjectRouter');
const UserRouter = require('./router/UserRouter');






app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/signup', SignupRouter);
app.use('/login', LoginRouter);
app.use('/admin', AdminRouter);
app.use('/projects', ProjectRouter);
app.use('/task', TaskRouter);
app.use('/User', UserRouter);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
