const JWT = require('jsonwebtoken');    // jsonwebtoken library to handle JSON Web Tokens (JWT)
const { hashPassword, comparePassword } = require('../helpers/authHelper'); //  import hashPassword and comparePassword functions from authHelper module for password hashing and comparison
const userModel = require('../models/userModel');   // userModel: contains the Mongoose model for users
var { expressjwt: jwt } =  require('express-jwt');  //  express-jwt: used for verifying JWTs in Express.js middleware

// Middleware Authentication
// Configure a middleware requireSignIn using express-jwt
// This middleware is designed to ensure that incoming requests have a valid JWT in the "Authorization" header
// It uses the JWT secret from the environment variable JWT_SECRET and specifies the HMAC SHA-256 algorithm
const requireSignIn = jwt({
    secret: process.env.JWT_SECRET, 
    algorithms: ["HS256"],
});

// Register
// Declares an asynchronous function named registerController that takes two parameters: req (request) and res (response)
const registerController = async (req, res) => {
    try
    {
        // Parse Request and Validate Data
        // Destructures name, email, password from request body (req.body)
        // Validates whether all required fields are present, and if password is at least 6 characters long
        const { name, email, password, dob, gender, address, height, weight,  activitylvl, allergyString, question, answer, goal, totalCalories } = req.body;

// Parse the address object
const { country, unit, street, block, postal, floor, building } = address;

// Create the address object
const addressObj = {
    country,
    unit,
    street,
    block,
    postal,
    floor,
    building
};
        if (!name)
        {
            return res.status(400).send({
                success: false,
                message: "Name is required",
            });
        }
        
        if (!email)
        {
            return res.status(400).send({
                success: false,
                message: "Email is required",
            });
        }
        
        if (!password || password.length < 6)
        {
            return res.status(400).send({
                success: false,
                message: "Password is required and have at least 6 characters",
            });
        }

        if (!gender)
        {
            return res.status(400).send({
                success: false,
                message: "Gender is required",
            });
        }

        if (!address)
        {
            return res.status(400).send({
                success: false,
                message: "Activitylvl is required",
            });
        }

        if (!dob)
        {
            return res.status(400).send({
                success: false,
                message: "Date of birth is required",
            });
        }

        if (!height)
        {
            return res.status(400).send({
                success: false,
                message: "Height is required",
            });
        }

        if (!weight)
        {
            return res.status(400).send({
                success: false,
                message: "Weight is required",
            });
        }

        if (!activitylvl)
        {
            return res.status(400).send({
                success: false,
                message: "Activitylvl is required",
            });
        }

        if (!question)
        {
            return res.status(400).send({
                success: false,
                message: "Question is required",
            });
        }

        if (!answer)
        {
            return res.status(400).send({
                success: false,
                message: "Answer is required",
            });
        }

        if (!goal)
        {
            return res.status(400).send({
                success: false,
                message: "Goal is required",
            });
        }

        if (!totalCalories)
        {
            return res.status(400).send({
                success: false,
                message: "Total Calories is required",
            });
        }
        
        // Check for Existing User
        // Checks if user with the same email already exists in the database
        const existingUser = await userModel.findOne({ email });
        if (existingUser)
        {
            return res.status(500).send({
                success: false,
                message: "User has already registered with this email",
            });
        }

        // Hash Password and Save User
        // Call hashPassword to hash the user's password
        // Save a new user to the database using the userModel
        // The password stored in the database is the hashed password  
        const hashedPassword = await hashPassword(password);
        const user = await userModel({
            name,
            email,
            password: hashedPassword,
            dob,
            gender,
            address: addressObj, // Save the parsed address object
            height,
            weight,
            activitylvl,
            allergyString,
            question,
            answer,
            goal,
            totalCalories
        }).save();
        // Send response for Successful Registration
        return res.status(201).send({
            success: true,
            message: "Registration Successful! Please Login",
        });
    }

    // Handle Errors in Registration
    catch (error)
    {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Register API",
            error,
        });
    }
};


// Register
// Declares an asynchronous function named registerController that takes two parameters: req (request) and res (response)
const poRegisterController = async (req, res) => {
    try
    {
        // Parse Request and Validate Data
        // Destructures name, email, password from request body (req.body)
        // Validates whether all required fields are present, and if password is at least 6 characters long
        const {name, email, password, gender} = req.body;
        if (!name)
        {
            return res.status(400).send({
                success: false,
                message: "Name is required",
            });
        }
        
        if (!email)
        {
            return res.status(400).send({
                success: false,
                message: "Email is required",
            });
        }

        if (!gender)
        {
            return res.status(400).send({
                success: false,
                message: "Gender is required",
            });
        }
        
        
        if (!password)
        {
            return res.status(400).send({
                success: false,
                message: "Password is required",
            });
        }

        if (password.length < 6)
        {
            return res.status(400).send({
                success: false,
                message: "Password should be at least 6 characters",
            });
        }

       
        // Check for Existing User
        // Checks if user with the same email already exists in the database
        const existingUser = await userModel.findOne({ email });
        if (existingUser)
        {
            return res.status(500).send({
                success: false,
                message: "Product Owner has already registered with this email",
            });
        }

        // Hash Password and Save User
        // Call hashPassword to hash the user's password
        // Save a new user to the database using the userModel
        // The password stored in the database is the hashed password  
        const hashedPassword = await hashPassword(password);
        const user = await userModel({ name, email, password:hashedPassword, gender, role :"po"}).save();

        // Send response for Successful Registration
        return res.status(201).send({
            success: true,
            message: "Registration Successful!",
        });
    }

    // Handle Errors in Registration
    catch (error)
    {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Register API",
            error,
        });
    }
};


// Register
// Declares an asynchronous function named registerController that takes two parameters: req (request) and res (response)
const vendorRegisterController = async (req, res) => {
    try
    {
        // Parse Request and Validate Data
        // Destructures name, email, password from request body (req.body)
        // Validates whether all required fields are present, and if password is at least 6 characters long
        const {name, email, password, contactNumber, address} = req.body;

        // Check for Existing User
        // Checks if user with the same email already exists in the database
        const existingUser = await userModel.findOne({ email });
        if (existingUser)
        {
            return res.status(500).send({
                success: false,
                message: "Vendor has already registered with this email",
            });
        }

        if (!name)
        {
            return res.status(400).send({
                success: false,
                message: "Name is required",
            });
        }
        
        if (!email)
        {
            return res.status(400).send({
                success: false,
                message: "Email is required",
            });
        }
        
         
        if (!password)
        {
            return res.status(400).send({
                success: false,
                message: "Password is required",
            });
        }

        if (password && password.length < 6)
        {
            return res.status(400).send({
                success: false,
                message: "Password should be at least 6 characters",
            });
        }

        if (!contactNumber)
        {
            return res.status(400).send({
                success: false,
                message: "Contact Number is required",
            });
        }

        if (contactNumber && contactNumber.length < 8) 
        {
            return res.status(400).send({
                success: false,
                message: "Contact Number should be at least 8 digit",
            });
        }

        
        if (!address)
        {
            return res.status(400).send({
                success: false,
                message: "Address is required",
            });
        }

        

        // Hash Password and Save User
        // Call hashPassword to hash the user's password
        // Save a new user to the database using the userModel
        // The password stored in the database is the hashed password  
        const hashedPassword = await hashPassword(password);
        const user = await userModel({ name, email, password:hashedPassword, contactNumber, address, role :"bo"}).save();

        // Send response for Successful Registration
        return res.status(201).send({
            success: true,
            message: "Registration Successful!",
        });
    }

    // Handle Errors in Registration
    catch (error)
    {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Register API",
            error,
        });
    }
};


// Login
// Declare an asynchronous function named loginController that takes two parameters: req (request) and res (response)
// Login
const loginController = async (req, res) => {
    try {
        // Parse Request Body and Validate Data
        // Destructure email and password from request body (req.body)
        // Validates whether both email and password are present
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: "Please Provide Email Or Password",
            });
        }

        // Find User
        // Find a user with the provided email in the database using the userModel
        // Check if the user exists; if not, send an error response
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "User Not Found",
            });
        }

        // Check User Status
        if (user.status === "inactive") {
            return res.status(403).send({
                success: false,
                message: "User is inactive. Please contact support for assistance.",
            });
        }

        // Match Password
        // Use the comparePassword function to compare the provided password with the hashed password stored in the database
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(500).send({
                success: false,
                message: "Invalid Password",
            });
        }

        // Update lastLogin field
        const lastLogin = new Date().toISOString(); // Get current timestamp
        await userModel.findOneAndUpdate(
            { email },
            { lastLogin },
            { new: true }
        );

        // TOKEN
        // Generate JWT token with the user's _id as the payload
        // The JWT is signed using the secret from the environment variable JWT_SECRET and is set to expire in 7 days
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "365d" });

        // Undefined Password
        // Send Response for Successful Login
        user.password = undefined; // password is set to undefined
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            token,
            user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Login API",
            error,
        });
    }
};


// Update User
// Declare an asynchronous function named updateUserController that takes two parameters: req (request) and res (response)
const updateUserController = async (req, res) => {
    try
    {
        // Parse Request Body
        // Destructure name, password, email from request body (req.body)
        const {name, password, email, totalCalories, height, weight} = req.body;
        // Find User and Validate Password
        // Find user with the provided email in the database
        // Validate password length when password is provided
        const user = await userModel.findOne({email});
        if (password && password.length < 6)
        {
            return res.status(400).send({
                success: false,
                message: "Password is required and should be 6 characters long"
            });
        }

        if (!totalCalories)
        {
            return res.status(400).send({
                success: false,
                message: "Goal calorie limit is required"
            });
        }
        if (totalCalories < 800 || totalCalories > 3000)
        {
            return res.status(400).send({
                success: false,
                message: "Goal calorie limit is not within range, please enter between 800 to 3000"
            });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        // Parse totalCalories to a number if it's not null or undefined
        const parsedTotalCalories = totalCalories !== null && totalCalories !== undefined ? Number(totalCalories) : undefined;
        const parsedHeight = height !== null && height !== undefined ? Number(height) : undefined;
        const parsedWeight = weight !== null && weight !== undefined ? Number(weight) : undefined;
        // Updated User
        const updatedUser = await userModel.findOneAndUpdate(
            {email}, 
            {name: name || user.name,
             password: hashedPassword || user.password,
             totalCalories: parsedTotalCalories !== undefined ? parsedTotalCalories : user.totalCalories,
             height: parsedHeight !== undefined ? parsedHeight : user.height,
             weight: parsedWeight !== undefined ? parsedWeight : user.weight
            },
            {new:true}
        );
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: "Profile Updated, Please Login",
            updatedUser
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message: "Error In User Update API",
            error
        });
    }
};

// Update PW User
// Declare an asynchronous function named updatePwController that takes two parameters: req (request) and res (response)
const updatePwController = async (req, res) => {
    try
    {
        // Parse Request Body
        // Destructure name, password, email from request body (req.body)
        const userEmail = req.query.email;
        const {name, password, email} = req.body;
        // Find User and Validate Password
        // Find user with the provided email in the database
        // Validate password length when password is provided
        const user = await userModel.findOne({email});

        if (!password)
        {
            return res.status(400).send({
                success: false,
                message: "Please enter Password"
            });
        }
        if (password && password.length < 6)
        {
            return res.status(400).send({
                success: false,
                message: "Password should be 6 characters long"
            });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        
        // Updated User
        const updatedUser = await userModel.findOneAndUpdate(
            {email}, 
            {name: name || user.name,
             password: hashedPassword || user.password,
            },
            {new:true}
        );
        updatedUser.password = undefined;
        res.status(200).send({
            success: true,
            message: "Password Updated!",
            updatedUser
        });
    }
    catch(error)
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message: "Error In User Update API",
            error
        });
    }
};

const searchUsersController = async (req, res) => { 
    try { 
        // Parse Request Query and Validate Data 
        // Destructure email from request query (req.query) 
        const { email } = req.query; 
 
        if (!email) { 
            return res.status(400).send({ 
                success: false, 
                message: "Email is required for searching users", 
            }); 
        } 
 
        // Find Users based on Email 
        // Use a regular expression to perform a case-insensitive search for users with matching email addresses 
        const users = await userModel.find({ email: { $regex: new RegExp(email, 'i') } }); 
 
        // Send Response with Search Results 
        res.status(200).send({ 
            success: true, 
            message: "Users found based on the search", 
            users, 
        }); 
    } catch (error) { 
        console.log(error); 
        res.status(500).send({ 
            success: false, 
            message: "Error in searchUsers API", 
            error, 
        }); 
    } 
};


const suspendUserController = async (req, res) => {
    try {
        const userEmail = req.query.email;
        
        console.log(`Attempting to suspend user with email: ${userEmail}`);

        // Update the user status to 'inactive' in the database
        const result = await userModel.findOneAndUpdate({ email: userEmail }, { status: 'inactive' });

        if (!result) {
            console.log(`User with email ${userEmail} not found.`);
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        console.log(`User with email ${userEmail} suspended successfully.`);

        res.status(200).json({ success: true, message: 'User suspended successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error suspending user' });
    }
};

const reinstateUserController = async (req, res) => {
    const userEmail = req.query.email;    
    try {
        // Update the user status to 'active' in the database        
        await userModel.findOneAndUpdate({email: userEmail}, { status: 'active' });
        res.status(200).json({ success: true, message: 'User reinstated successfully' });    
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error reinstating user' });    }
};


const removeUserController = async (req, res) => {
    const userEmail = req.query.email;
    try {
        // Remove the user from the database
        const result = await userModel.deleteOne({ email: userEmail });

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'User removed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error removing user' });
    }
};

const getUserCount = async (req, res) => {
    try {
        // Hardcode the role to "user" for product owner's request
        const role = 'user';

        // Query the user model to get the count of users with the specified role
        const userCount = await userModel.countDocuments({ role });

        // Return the user count in the response
        return res.status(200).json({ userCount });
    } catch (error) {
        // Handle errors and send an appropriate response
        console.error('Error in getUserCount:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get Last Login Date
// Declare an asynchronous function named getLastLoginDateController that takes two parameters: req (request) and res (response)
const getLastLoginDateController = async (req, res) => {
    try {
        // Check if req.user is defined and has an _id property
        // if (!req.user || !req.user._id) {
        //     return res.status(401).json({
        //         success: false,
        //         message: 'Unauthorized: User not authenticated or missing user ID',
        //     });
        // }

        // Extract the user's ID from the authenticated user's token
        const userId = req.user._id;

        // Find the user in the database using the user ID
        const user = await userModel.findById(userId);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Extract and send the last login date in the response
        const lastLoginDate = user.lastLogin || null;

        res.status(200).json({
            success: true,
            lastLoginDate,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error in getLastLoginDate API',
            error,
        });
    }
};


const findUserController = async (req, res) => {
    try {
        // Extract the email from the request query parameters
        const { email } = req.query;

        // Check if the email parameter is provided
        if (!email) {
            return res.status(400).json({
                success: false,
                message: 'Email parameter is required',
            });
        }

        // Find users with matching email addresses
        const users = await userModel.find({ email });

        // Check if any users are found
        if (users.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No users found with the provided email',
            });
        }

        // Return the users found with the provided email
        res.status(200).json({
            success: true,
            message: 'Users found with the provided email',
            users,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error finding users by email',
            error,
        });
    }
};

const verifyAnswerController = async (req, res) => {
    try {
        const { email, answer } = req.body;

        // Find the user in the database based on the provided email
        const user = await userModel.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Retrieve the security question answer from the user document
        const storedAnswer = user.answer;

        // Compare the user's answer with the stored answer
        if (answer === storedAnswer) {
            // If the answers match, send a success response
            return res.status(200).json({ success: true, message: 'Answer is correct' });
        } else {
            // If the answers don't match, send an error response
            return res.status(400).json({ success: false, message: 'Incorrect answer' });
        }
    } catch (error) {
        console.error('Error in verifyAnswerController:', error);
        return res.status(500).json({ success: false, message: 'Error verifying answer', error });
    }
};


const resetPW = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if password is provided
        if (!password) {
            return res.status(400).json({ success: false, message: 'Password is required' });
        }

        if (password && password.length < 6)
        {
            return res.status(400).send({
                success: false,
                message: "Password should be 6 characters long"
            });
        }

        // if (password && password.length < 6)
        // {
        //     return res.status(400).send({
        //         success: false,
        //         message: 'Password should be 6 characters long'
        //     });
        // }

        // Find the user in the database based on the provided email
        const updatedUser = await userModel.findOne({ email });

        // Check if the user exists
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Update the user's password
        const hashedPassword = await hashPassword(password);

        updatedUser.password = hashedPassword;
        await updatedUser.save();

        // Send a success response
        return res.status(200).json({ success: true, message: 'Password reset successful' });
    } catch (error) {
        console.error('Error in resetPassword:', error);
        return res.status(500).json({ success: false, message: 'Error resetting password', error });
    }
};


const getUsers = async (req, res) => {
    const {name, email} = req.body;

    const emailExist = await userModel.findOne({email:email});

    //const user = await userModel.findById(id);

    if (!emailExist){
        return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json(emailExist);
};

const getUserId = async (req, res) => {
    const userId = req.user._id;
    // const userId = req.param.userId;
    const users = await userModel.findById(userId);
    res.status(200).json(users);
    
}

const getAllUserCalories = async (req, res) => {
    try {

        const userCalories = await userModel.find('postedBy', {}, 'totalCalories').exec();
        // const userCalories = await userModel.find().populate('postedBy', 'totalCalories').exec();
        // const pendingDiyMealKits = await userModel.find().populate('postedBy', 'allergy.fish').exec();
        
        // Query the userModel to find all documents
        // const users = await userModel.find().exec();
    
        // Extract allergyString and totalCalories from each user
        // const userAllergyCal = users.map(user => ({
        //     allergyString: user.allergyString,
        //     totalCalories: user.totalCalories
        // }));

        res.status(200).send({
            success: true,
            message: "Get All User Calorie Intake",
            userCalories,
        });
    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Getting User Calorie Intake',
            error
        });
    }
};


// const pendingDiyMealKits = await diyModel.find().populate('postedBy', 'name address.block address.street address.building address.floor address.unit address.country address.postal').exec();
// const getAllUserAllergies = async (req, res) => {
//     try 
//     {

//         const userAllergies = await userModel.find({}, 'allergyString').exec();

//         res.status(200).send({
//             success: true,
//             message: "Get All User Allergies",
//             userAllergies,
//         });
//     } 
//     catch (error) 
//     {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: 'Error in Getting User Allergies',
//             error
//         });
//     }
// };

const getAllUserAllergies = async (req, res) => {
    try 
    {
        const userAllergies = await userModel.find({}, 'allergyString').exec();

        if (!userAllergies) {
            return res.status(404).json({
                success: false,
                message: 'User allergies not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Get All User Allergies',
            userAllergies,
        });
    } 
    catch (error) 
    {
        console.error('Error in Getting User Allergies:', error);
        res.status(500).json({
            success: false,
            message: 'Error in Getting User Allergies',
            error: error.message,
        });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
};
  


module.exports = {
    requireSignIn,
    registerController,
    poRegisterController,
    vendorRegisterController,
    loginController,
    updateUserController,
    updatePwController,
    searchUsersController,
    suspendUserController,
    reinstateUserController,
    removeUserController,
    getUserCount,
    getLastLoginDateController,
    findUserController,
    verifyAnswerController,
    resetPW,
    getUsers,
    getUserId,
    getAllUserCalories,
    getAllUserAllergies
};
