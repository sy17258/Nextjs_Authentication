import { connect } from '@/dbConfig/dbConfig'; // Import the database connection function
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json(); // Parse JSON body from the incoming request
        const { token } = reqBody; // Extract token from request body using destructuring
        console.log(token);

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } }); // Query database for user with matching email

        if (!user) { // Check if user exists in database
            return NextResponse.json({ error: 'User not found' }, { status: 400 });
        }

        console.log(user); // Log successful user lookup

        user.isVerified = true; // Set user as verified
        user.verifyToken = undefined; // Clear verification token
        user.verifyTokenExpiry = undefined; // Clear verification token expiry

        await user.save(); // Save updated user to database
        
        return NextResponse.json({
            message: 'User verified successfully',
            success: true
        }, { status: 500 });
        
    } catch (error: any) { // Catch any errors during processing
        return NextResponse.json({ error: error.message }, { status: 500 }); // Return 500 error with error message
    }
}
    