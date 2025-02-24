const express = require('express'),
    hbs = require('express-handlebars'),
    path = require('path'),
    morgan = require('morgan'),
    compression = require('compression'),
    helmet = require('helmet');

const app = express();
const port = 3000;

// morgan logger
app.use(morgan('dev'));

app.use(compression());

app.use(helmet());

// template engine setup (handlebars)
//app.engine('hbs', hbs({helpers: require("./public/js/helpers.js").helpers, extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static('public'));
app.use('/scripts', express.static(__dirname + '/node_modules/dat.gui/build'));  // serve dat.gui.min.js


app.get('/', function(req, res) {
    res.render('index');
});

app.listen(port, () => console.log(`Listening on port ${port}`));