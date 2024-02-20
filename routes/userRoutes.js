const express = require('express');     // // to create an Express router 
const { requireSignIn, registerController, poRegisterController, vendorRegisterController, loginController, updateUserController, searchUsersController, suspendUserController, reinstateUserController, updatePwController, removeUserController, getUserCount, getLastLoginDateController, findUserController, verifyAnswerController, resetPW, getUsers, getUserId, getAllUserCalories, getAllUserAllergies } = require('../controllers/userController'); 
 
// Create Router Object 
// Create an instance of an Express router using express.Router() 
// The router object allows the definition of routes for the application 
const router = express.Router(); 
 
// Routes 
// REGISTER || POST 
// Define a route to handle HTTP POST requests to the "/login" endpoint 
// Call the loginController function from the userController module to handle user login 
router.post("/register", registerController); 

 
// Routes 
// REGISTER || POST 
// Define a route to handle HTTP POST requests to the "/login" endpoint 
// Call the loginController function from the userController module to handle user login 
router.post("/poRegister", poRegisterController); 

// Routes 
// REGISTER || POST 
// Define a route to handle HTTP POST requests to the "/login" endpoint 
// Call the loginController function from the userController module to handle user login 
router.post("/vendorRegister", vendorRegisterController); 
 
// LOGIN || POST 
// Defines a route for handling HTTP POST requests to the "/login" endpoint. 
// Calls the loginController function from the userController module to handle user login. 
router.post("/login", loginController); 
 
// UPDATE || PUT 
// Defines a route for handling HTTP PUT requests to the "/update-user" endpoint. 
// Uses the requireSignIn middleware to ensure that the user is signed in before allowing the update. 
// Calls the updateUserController function from the userController module to handle updating user information. 
router.put("/update-user", requireSignIn, updateUserController); 

// UPDATE || PUT 
// Defines a route for handling HTTP PUT requests to the "/update-user" endpoint. 
// Uses the requireSignIn middleware to ensure that the user is signed in before allowing the update. 
// Calls the updateUserController function from the userController module to handle updating user information. 
router.put("/updatePW-user", requireSignIn, updatePwController); 
 
// UPDATE || GET 
// Defines a route for handling HTTP GET requests to the "/search-user" endpoint. 
// Uses the requireSignIn middleware to ensure that the user is signed in before allowing the update. 
// Calls the searchUsersController function from the userController module to handle searching user information. 
router.get("/search-user", requireSignIn, searchUsersController); 
 
router.put('/suspend-user', requireSignIn, suspendUserController);
router.put('/reinstate-user', requireSignIn, reinstateUserController);

router.delete('/remove-user', requireSignIn, removeUserController);

router.get("/getUserCount", getUserCount);

router.get('/get-last-login-date', requireSignIn, getLastLoginDateController);

router.get("/findEmail", findUserController);

router.get("/getUsers", requireSignIn, getUsers);
router.get("/getUserId", requireSignIn, getUserId);
router.get("/getUserCalories", getAllUserCalories);
router.get("/getUserAllergies", getAllUserAllergies);


router.post("/findAns", verifyAnswerController);

router.post("/resetPW", resetPW); 

 
// export 
// Exports the router object, making it available for use in other parts of the application. This allows this router to be mounted in the main Express application to handle specific routes. 
module.exports = router;