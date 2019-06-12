import mongodb from 'mongodb';

async function populatedb() {
    try {
        const client = await mongodb.MongoClient.connect('mongodb://localhost:27017');
        const db = client.db('store');

        await db.collection('authors').drop();
        await db.collection('authors').insertMany([{
            _id: 'f363d4d5-a1dd-4a8a-69bb-bf08ab219123',
            name: 'Stephen King',
        }, {
            _id: 'f363d4d5-a1dd-4a8a-69bb-bf08ab219124',
            name: 'J. K. Rowling',
        }, {
            _id: 'f363d4d5-a1dd-4a8a-69bb-bf08ab219125',
            name: 'George R. R. Martin',
        }, {
            _id: 'f363d4d5-a1dd-4a8a-69bb-bf08ab219126',
            name: 'Robert Kiyosaki',
        }, {
            _id: 'f363d4d5-a1dd-4a8a-69bb-bf08ab219127',
            name: 'Haruki Murakami',
        }, {
            _id: 'f363d4d5-a1dd-4a8a-69bb-bf08ab219129',
            name: 'Cormac McCarthy',
        }, {
            _id: 'f363d4d5-a1dd-4a8a-69bb-bf08ab219130',
            name: 'Mario Vargas Llosa',
        }]);

        await db.collection('articles').drop();
        await db.collection('articles').insertMany([{
            _id: 'f363d4d5-a1dd-4a8a-b83b-7778ab219123',
            title: 'A quick review of my life',
            short_description: 'Lorem ipsum dolor sit amet, consectetur things.',
            long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac suscipit dui. Vivamus pellentesque non nibh et commodo. Sed condimentum tempus interdum. Praesent pharetra aliquet dictum. Vestibulum ultrices est lobortis eros viverra tempus. Donec a erat ac urna ultricies lacinia. Vestibulum laoreet non felis ut auctor. Fusce nec finibus augue. Curabitur euismod elementum urna a rutrum. Maecenas consectetur sapien eget consequat accumsan. Nullam fringilla felis sollicitudin nisl porta, sagittis congue nulla sollicitudin. Aenean consectetur turpis quis nisl malesuada tristique.',
            created_at: new Date(),
            authors: ['f363d4d5-a1dd-4a8a-69bb-bf08ab219125']
        }, {
            _id: 'f363d4d5-a1dd-4a8a-b83b-7778ab219124',
            title: 'La literatura en decadencia',
            short_description: 'Analisis critico acerca del actual producto llamado literatura moderna popular.',
            long_description: 'More and more lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac suscipit dui. Vivamus pellentesque non nibh et commodo. Sed condimentum tempus interdum. Praesent pharetra aliquet dictum. Vestibulum ultrices est lobortis eros viverra tempus. Donec a erat ac urna ultricies lacinia. Vestibulum laoreet non felis ut auctor. Fusce nec finibus augue. Curabitur euismod elementum urna a rutrum. Maecenas consectetur sapien eget consequat accumsan. Nullam fringilla felis sollicitudin nisl porta, sagittis congue nulla sollicitudin. Aenean consectetur turpis quis nisl malesuada tristique.',
            created_at: new Date(),
            authors: ['f363d4d5-a1dd-4a8a-69bb-bf08ab219130']
        }, {
            _id: 'f363d4d5-a1dd-4a8a-b83b-7778ab219125',
            title: 'The art of war vision applied in business',
            short_description: 'Short description goes here.',
            long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac suscipit dui. Vivamus pellentesque non nibh et commodo.',
            created_at: new Date(),
            authors: ['f363d4d5-a1dd-4a8a-69bb-bf08ab219125']
        }, {
            _id: 'f363d4d5-a1dd-4a8a-b83b-7778ab219126',
            title: 'This article should be useful to test filter',
            short_description: 'Lorem ipsum dolor sit amet, consectetur things.',
            long_description: 'Sometimes long desc in  not so long.',
            created_at: new Date(),
            authors: ['f363d4d5-a1dd-4a8a-69bb-bf08ab219127', 'f363d4d5-a1dd-4a8a-69bb-bf08ab219129']
        }]);

        client.close();
    } catch (error) {
        console.log("Error Happened!===================================");
        console.log(error);
    }
};

populatedb();
