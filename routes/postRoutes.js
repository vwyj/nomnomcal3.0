const express = require('express');     // to create an Express router
const { requireSignIn } = require('../controllers/userController');
const { createPostController, getAllPostsController, getUserPostsController, deletePostController, updatePostController } = require('../controllers/postController');

// Create Router Object
// Create an instance of an Express router using express.Router()
// The router object allows the definition of routes for the application
const router = express.Router();

// CREATE POST || POST
// Define a route to handle HTTP POST requests to the "/create-post" endpoint
// Use the requireSignIn middleware to ensure that the user is signed in before allowing the creation of a post
// Call createPostController function from postController to handle the creation of a post
router.post('/create-post', requireSignIn, createPostController);

// GET ALL POSTS
// Define a route to handle HTTP GET requests to the "/get-all-post" endpoint
// Call the getAllPostsController function from the postController module to handle retrieving of all posts
router.get('/get-all-post', getAllPostsController);
router.get('/get-user-post', requireSignIn, getUserPostsController);

// DELETE POST
router.delete('/delete-post/:id', requireSignIn, deletePostController);

// UPDATE POST
router.put('/update-post/:id', requireSignIn, updatePostController);

// Export 
// Exports the router object, making it available for use in other parts of the application
// This allows this router to be mounted in the main Express application to handle specific routes
module.exports = router;