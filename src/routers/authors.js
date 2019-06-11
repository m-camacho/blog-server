import express from 'express';
import Author from '../models/author';

const router = express.Router()

router.get('/', async function (req, res) {
    try {
        const response = await Author.find();
        res.send(response);
    } catch(error) {
        console.log(error);
        res.status(500).end();
    }
})

export default router;
