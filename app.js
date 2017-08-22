const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes');
const models = require('./models');

let app = express();

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', { noCache: true });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(routes);


let port = process.env.PORT || 3500;


models.sync()
  .then(()=> {
    app.listen(port, ()=> {
      console.log(`listening on port ${port}`);
    })
  })