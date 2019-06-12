import express from 'express';
import uuid from 'uuid';

import { isNullOrUndefined } from '../utils';
import Article from '../models/article';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const query = { deleted_at: undefined };
        const { title, authors } = req.query;

        if (title) query.title = { $regex: title, $options: 'i' };
        if (authors) query.authors = { $in: authors.split(',') };

        const response = await Article.find(query);
        res.send(response);
    } catch(error) {
        console.log(error);
        res.status(500).end();
    }
});

router.get('/:id', async (req, res) => {
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

router.post('/', async (req, res) => {
    const { title, short_description, long_description, authors } = req.body;
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
        if (!isNullOrUndefined(authors)) article.authors = authors;

        const response = await article.save();
        res.send(response);
    } catch(error) {
        console.log(error);
        res.status(500).end();
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).send('id is required for this operation');
        return;
    }
    const { title, short_description, long_description, authors } = req.body;
    try {
        const now = new Date();
        const updateFields = { updated_at:now };
        if (!isNullOrUndefined(title)) updateFields.title = title;
        if (!isNullOrUndefined(short_description)) updateFields.short_description = short_description;
        if (!isNullOrUndefined(long_description)) updateFields.long_description = long_description;
        if (!isNullOrUndefined(authors)) updateFields.authors = authors;
        
        const response = await Article.findOneAndUpdate({ "_id": id }, updateFields, { new: true });
        res.send(response);
    } catch(error) {
        console.log(error);
        res.status(500).end();
    }
});

router.delete('/:id', async (req, res) => {
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

export default router;
