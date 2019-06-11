import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import uuid from 'uuid';

import { isNullOrUndefined } from './utils';
import Article from './models/article';

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

app.get('/articles', async (req, res) => {
    try {
        const query = { deleted_at: undefined };
        const { title, authors } = req.query;

        if (title) query.title = { $regex: title, $options: 'i' };

        const response = await Article.find(query);
        res.send(response);
    } catch(error) {
        console.log(error);
        res.status(500).end();
    }
});

app.get('/articles/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).send('id is required for this operation');
        return;
    }
    try {
        const query = {
            _id: id,
            deleted_at: undefined 
        };
        const response = await Article.findOne(query);
        res.send(response);
    } catch(error) {
        console.log(error);
        res.status(500).end();
    }
});

app.post('/articles', async (req, res) => {
    const { title, short_description, long_description } = req.body;
    if (isNullOrUndefined(title)) {
        res.status(400).send('title is required for this operation');
        return;
    }
    try {
        const now = new Date();
        var article = new Article({
            _id: uuid(),
            title,
            created_at: now,
            updated_at:now,
        });
        if (!isNullOrUndefined(short_description)) article.short_description = short_description;
        if (!isNullOrUndefined(long_description)) article.long_description = long_description;
        
        const response = await article.save();
        res.send(response);
    } catch(error) {
        console.log(error);
        res.status(500).end();
    }
});

app.put('/articles/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).send('id is required for this operation');
        return;
    }
    const { title, short_description, long_description } = req.body;
    try {
        const now = new Date();
        const updateFields = { updated_at:now };
        if (!isNullOrUndefined(title)) updateFields.title = title;
        if (!isNullOrUndefined(short_description)) updateFields.short_description = short_description;
        if (!isNullOrUndefined(long_description)) updateFields.long_description = long_description;
        
        const response = await Article.findOneAndUpdate({ "_id": id }, updateFields, { new: true });
        res.send(response);
    } catch(error) {
        console.log(error);
        res.status(500).end();
    }
});

app.delete('/articles/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).send('id is required for this operation');
        return;
    }
    try {
        await Article.findOneAndUpdate({ "_id": id }, { deleted_at: new Date() });
        res.status(204).end();
    } catch(error) {
        console.log(error);
        res.status(500).end();
    }
});

app.listen(PORT, () => console.log(`Articles app server is running on port ${PORT}`));
