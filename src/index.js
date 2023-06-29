const path = require('path')
const sass = require('node-sass')
const fs = require('fs');
const express = require('express')
const hbs = require('express-handlebars')
const morgan = require('morgan')
const app = express()
const port = 3000
const route = require('./routes');

sass.render({
    file: __dirname + '/resources/scss/app.scss',
    outputStyle: 'compressed'
}, (err, result) => {
    if (err) throw err;
    fs.writeFileSync(__dirname + '/public/css/styles.css', result.css);
});

app.use(express.static(path.join(__dirname, './public')));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

//HTTP logger
app.use(morgan('combined'))

//Template engine
app.engine('handlebars', hbs.engine({
    extname: '.handlebars'
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));



// Route init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})