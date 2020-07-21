const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const { connect } = require('mongoose');
const { success, error } = require('consola');


//Bring in the app constants
const { DB, PORT } = require('./config');

//Initialize the application
const app = express();

//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

require('./middlewares/passport')(passport);

//Use Router Middleware
app.use('/api/users', require('./routes/users'));

//Connection with the DB
const startApp = async () => {
    try {
        await connect(DB, {
            useFindAndModify: true,
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        success({
            message: `Successfully connected to the Database: \n${DB}`,
            badge: true
        });
        //Start listening for the server on port
        app.listen(PORT, () => {
            success({
                message: `Server started on port ${PORT}`,
                badge: true
            });
        });
    } catch (err) {
        error({
            message: `Unable to connect to Database: \n${err}`,
            badge: true
        })
        startApp();
    }
}

startApp();