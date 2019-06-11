import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import authorRouter from './src/routers/authors';
import articlesRouter from './src/routers/articles';

const PORT = 3001;
mongoose.connect('mongodb://localhost/store', { useFindAndModify: false });

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/authors', authorRouter);
app.use('/articles', articlesRouter);

app.listen(PORT, () => console.log(`Articles app server is running on port ${PORT}`));
