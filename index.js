const express = require('express');
const routerApi = require('./routes/index.router')
const cors = require('cors');
const passport = require('passport');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler} = require('./middlewares/error.handler')

const app = express();


app.use(express.json());
app.use(cors());
app.use(passport.initialize());


require('./utils/auth');


app.get('/', (req, res) => {
    res.send('sssss')
})

routerApi(app);


app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(3000, () => {
    console.log('Mi port' +  3000);
  });
