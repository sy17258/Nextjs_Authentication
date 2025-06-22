import { connect } from "../../../../dbConfig/dbConfig"; // Import database connection function
import { NextRequest, NextResponse } from "next/server"; // Import Next.js request and response utility classes

connect() // Initialize database connection when this module loads

export async function GET(request: NextRequest){ // Define POST handler function that accepts a Next.js request
    try{ // Begin try block for error handling
        const response = NextResponse.json({ // Create a new JSON response object
            message: "Logout successful", // Set success message in response body (should be "Logout successful" not "Email verification successful")
            success: true // Set success flag to true in response body
        });
         
        response.cookies.set("token", "", { // Set the authentication token cookie to an empty string to clear it
            httpOnly: true, // Make the cookie accessible only by server, not client-side JavaScript for security
            expires: new Date(0) // Set expiration date to Unix epoch (January 1, 1970) to make browser delete the cookie immediately
        }, );

        return response; // Return the response to complete the request

        }catch(error){ // Catch    errors that occur during execution
            return NextResponse.json({error: error.message}, {status:500}); // Return error message with 500 Internal Server Error status code
        }
}