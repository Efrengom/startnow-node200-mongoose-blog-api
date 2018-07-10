const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

router.get('/', (req, res) => {
    Blog
        .find()
        .then(blogs => {
            res.status(200).json(blogs);
        })
        .catch(err => {
            res.status(500).send('error')
        })        
});

router.get('/featured', (req, res) => {
    Blog
        .where('featured').equals(true)
        .exec(function(err, featured) {
            if(err) {
                res.status(404).send('error occured')
            }else{
                console.log('/featured');
                res.status(200).json(featured);
            }
        })
        .catch(err => {
            res.status(500).send('error')
        })
});

router.get('/:id', (req, res) => {
    Blog    
        .findById(req.params.id)
        .then(blog => {
            if(!blog) {
                console.log('get/:id')
                return res.status(404).send('User ID does not exist')
            }else{
                console.log(req.body)
                res.status(200).json(blog);
            }
        })
        .catch(err => {
            res.status(404).send('error')
            })
});

router.post('/', (req, res) => {
    let dbUser = null;
    User
    .findById(req.body.authorId)
    .then(user => {
        // Store the fetched user in higher scope variable
        dbUser = user;

        // Create a blog
        const newBlog = new Blog(req.body);

        // Bind the user to it
        newBlog.author = user._id;

        // Save it to the database
        //console.log(req)
        return newBlog.save();
        
    })
    .then(blog => {
        // Push the saved blog to the array of blogs associated with the User
        dbUser.blogs.push(blog);
        //console.log(dbUser)
        // Save the user back to the database and respond to the original HTTP request with a copy of the newly created blog.
        dbUser.save().then(() => res.status(201).json(blog));
    })
    .catch(err => {
        res.status(500).send('error')
    })   
});

router.put('/:id', (req, res) => {
    Blog
        .findByIdAndUpdate(req.params.id, (req.body))
        .then(blog => {
            if(!blog) {
                console.log('get/:id')
                return res.status(404).send('User ID does not exist')
            }else{
                console.log('put');
                res.status(204).json(blog);
            // res.status(204).json(item)
            }
        })
        .catch(err => {
            res.status(500).send('error')
        })
});

router.delete('/:id', (req, res) => {
    Blog
        .findByIdAndRemove(req.params.id)
        .then(blogs => {
            res.status(200).json(blogs);
        })
        .catch(err => {
            res.status(404).send('error')
        })
});

module.exports = router;
