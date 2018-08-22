const path = require('path')
const exphbs = require('express-handlebars');

const getViewEngine = () => {
    const hbsHelpers = exphbs.create({
        helpers: require("../helpers/handlebars.js").helpers,
        defaultLayout: 'layout',
        layoutsDir: path.resolve(__dirname, '../views/'),
        extname: '.hbs'
    });
    const {
        engine
    } = hbsHelpers
    return engine
}

module.exports = getViewEngine