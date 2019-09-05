/* importing node module files */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const handlebarsIntl = require('handlebars-intl');
const handlebarsPaginate = require('handlebars-paginate');
const flash = require('connect-flash');
const path = require("path");
const passport = require('passport');
const PORT = process.env.PORT || 3000;

/* express server configuration */
const app = express();
const router = express.Router();

/* session  configuration */
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));
app.use(flash());
app.use(cookieParser());

/* passport authenticator initialization */
app.use(passport.initialize());
app.use(passport.session());

/* body parser configuration */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

/* static pages configuration */
app.use(express.static(__dirname));
//app.use(express.static(__dirname + "/public"));

//app.use(express.static(__dirname + "/public/build"));

/* view or handlebars configuration */
// handlebars formatting
handlebarsIntl.registerWith(handlebars);
// paging
handlebars.registerHelper('paginate', handlebarsPaginate);
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
/*
app.get('/about', (req, res) => {
    res.sendFile('index.html', {root: './public/build'});
});
*/
/* routing configuration */
const configRoutes = require("./routes");
configRoutes(app);

/* running server on port 3000 */
app.listen(PORT, () => {
    console.log("We've now got a server");
    console.log("Your routes will be running on http://localhost:3000");
});