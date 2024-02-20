const postModel = require("../models/postModel");   // Import postModel which contains Mongoose for posts
                        // is used to interact with the MongoDB database collection associated with posts

// Create Post
// Declares an asynchronous function createPostController that takes two parameters: req (request) and res (response)
const createPostController = async (req, res) => {   
    try                                             
    {
        const { title, ingredients, instructions, calorie } = req.body
        if ( !title || !ingredients || !instructions || !calorie )
        {
            return res.status(500).send({
                success: false,
                message: 'Please Fill In All Fields'
            });
        }

        const post = await postModel({
            title,
            ingredients,
            instructions,
            calorie,
            postedBy: req.auth._id
        }).save();

        res.status(201).send({
            success: true,
            message: 'Recipe Created Successfully',
            post,
        });
        console.log(req)
    }

    catch (error)
    {
        console.log(error);
        res.status(500).send({
            success: true,
            message: 'Error in Create Post API',
            error
        });
    }
};

// GET ALL POSTS
// Declares an asynchronous function getAllPostsController that takes two parameters: req (request) and res (response)
const getAllPostsController = async (req, res) => {
    try 
    {
        const posts = await postModel
            .find()
            .populate("postedBy", "_id name")
            .sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            message: "All Posts Data",
            posts,
        });
    }
    catch (error)
    {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in GETALLPOSTS API',
            error
        });
    }
};

// Get User Posts
const getUserPostsController = async (req, res) => {
    try 
    {
        const userPosts = await postModel.find({ postedBy: req.auth._id });
        res.status(200).send({
            success: true,
            message: "user posts",
            userPosts,
        });
    } 
    
    catch (error) 
    {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in User POST API",
            error,
        });
    }
  };
  
// Delete Post
const deletePostController = async (req, res) => {
    try 
    {
        const { id } = req.params;
        await postModel.findByIdAndDelete({ _id: id });
        res.status(200).send({
            success: true,
            message: "Your Recipe has successfully been deleted!",
        });
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Delete Recipe API",
            error,
        });
    }
};
  
// Update Post
const updatePostController = async (req, res) => {
    try 
    {
        const { title, ingredients, instructions, calorie } = req.body;
      
        // Find Post
        const post = await postModel.findById({ _id: req.params.id });
      
        // Validation
        if (!title) 
        {
            return res.status(400).send({
                success: false,
                message: "Please make sure to fill in the Recipe Name",
            });
        }
        if (!ingredients) 
        {
            return res.status(400).send({
                success: false,
                message: "Please make sure to fill in the Recipe Ingredients",
            });
        }
        if (!instructions) 
        {
            return res.status(400).send({
                success: false,
                message: "Please make sure to fill in the Recipe Instructions",
            });
        }
        if (!calorie) 
        {
            return res.status(400).send({
                success: false,
                message: "Please make sure to fill in the Recipe Calorie",
            });
        }
        const updatedPost = await postModel.findByIdAndUpdate({ _id: req.params.id },
        {
            title: title || post?.title,
            ingredients: ingredients || post?.ingredients,
            instructions: instructions || post?.instructions,
            calorie: calorie || post?.calorie,
        }, { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Recipe has been Successfully Updated!",
            updatedPost,
        });
    } 
    catch (error) 
    {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in Update Recipe API",
        error,
      });
    }
};

// Export functions to be used in other parts of the application
module.exports = { createPostController, getAllPostsController, getUserPostsController, deletePostController, updatePostController };