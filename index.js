import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import uuid from 'uuid';
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
        res.status(500).end();
    }
});

app.post('/articles', async (req, res) => {
    try {
        const now = new Date();
        var article = new Article({
            _id: uuid(),
            title: req.body.title,
            created_at: now,
            updated_at:now,
        });
        const response = await article.save();
        res.send(response);
    } catch(error) {
        res.status(500).end();
    }
});

app.delete('/articles/:id', async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    try {
        await Article.deleteOne({ "_id": id });
        res.status(204).end();
    } catch(error) {
        res.status(500).end();
    }
});

app.listen(PORT, () => console.log(`Articles app server is running on port ${PORT}`));

console.log('Sample app is running');
