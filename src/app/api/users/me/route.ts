import { connect } from '../../../../dbConfig/dbConfig'; // Import the database connection function
import { NextRequest, NextResponse } from 'next/server'; // Import Next.js request/response types
import User from '../../../../models/userModel'; // Import the User model for database queries
import { getDataFromToken } from '@/helpers/getDataFromToken'; // Import helper function to extract user data from token

connect(); // Initialize database connection

export async function POST(request: NextRequest){
    try{
    //extract data from user
    const userId = await getDataFromToken(request)
    const user = await User.findOne({_id: userId}).select("-password"); // Find user by ID and exclude password and version fields

    return NextResponse.json({
        message: "User found", // Success message
        data: user, // Success flag    
    })
     } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}