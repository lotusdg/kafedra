const express  = require('express');
const userController = require('./users/userController.js');
const authController = require('./auth/authController.js');


const app = express();
app.use(express.json());
app.use('/users', userController);
app.use('/', authController);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is listen on port: ${port}`));