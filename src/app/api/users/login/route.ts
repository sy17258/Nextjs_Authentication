import { connect } from '../../../../dbConfig/dbConfig'; // Import the database connection function
import { NextRequest, NextResponse } from 'next/server'; // Import Next.js request/response types
import User from '../../../../models/userModel'; // Import the User model for database queries
import bcryptjs from 'bcryptjs'; // Import library for password hashing and comparison
import jwt from "jsonwebtoken" // Import library for creating JWT tokens

connect(); // Initialize database connection

export async function POST(request: NextRequest){ // Define async POST handler function that accepts a NextRequest
    try { // Start try/catch block for error handling
        const reqBody = await request.json() // Parse JSON body from the incoming request
        const {email, password} = reqBody // Extract email and password from request body using destructuring

        console.log(reqBody); // Log the request body for debugging purposes

        //check if user exists
        const user = await User.findOne({email}) // Query database for user with matching email
        if(!user){ // Check if user exists in database
            return NextResponse.json({error: "User not found"}, {status: 404}); // Return 404 error if user not found
        }
        console.log ("User exits"); // Log successful user lookup (note: typo in "exits")
 
        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password) // Compare provided password with hashed password in database
        if (!validPassword){ // Check if password is valid
            return NextResponse.json({error: "Check your credentials"}, {status: 400}); // Return 400 error if password is incorrect
        }
        
        console.log(user);

        //create token data
        const tokenData = { // Create object with user data to include in JWT
            id:user._id, // Include user ID from database
            username: user.username, // Include username
            email: user.email // Include email
        }

        //create token 
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d' }); // Create JWT token with user data, signing key, and expiration

        const response = NextResponse.json({ // Create JSON response object
            message: "Login successful ", // Include success message
            success: true, // Include success flag
        })
        
        response.cookies.set("token", token, { // Set JWT token as an HTTP-only cookie
            httpOnly: true, // Make cookie accessible only by the server, not by JavaScript
        })

        return response; // Send the response to the client

        console.log("Password is valid"); // This line is unreachable code after return statement
    }catch (error) { // Catch    errors during processing
        return NextResponse.json({error: error.message}, {status: 500}); // Return 500 error with error message
    }
}