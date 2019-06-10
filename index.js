import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import uuid from 'uuid';

import { isNullOrUndefined } from './utils';
import Article from './models/article';

const PORT = 3000;
mongoose.connect('mongodb://localhost/store');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.post('/articles', async (req, res) => {
    const { title } = req.body;
    if (isNullOrUndefined(title)) {
        res.status(400).send('title is required for this operation');
        return;
    }
    try {
        const now = new Date();
        var article = new Article({
            _id: uuid(),
            title: req.body.title,
            created_at: now,
            updated_at:now,
        });
        if (req.body.short_description) article.short_description = req.body.short_description;
        if (req.body.long_description) article.long_description = req.body.long_description;
        
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
    try {
        const now = new Date();
        const updateFields = { updated_at:now };
        if (req.body.title) updateFields.title = req.body.title;
        if (req.body.short_description) updateFields.short_description = req.body.short_description;
        if (req.body.long_description) updateFields.long_description = req.body.long_description;
        
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
        await Article.deleteOne({ "_id": id });
        res.status(204).end();
    } catch(error) {
        console.log(error);
        res.status(500).end();
    }
});

app.listen(PORT, () => console.log(`Articles app server is running on port ${PORT}`));
