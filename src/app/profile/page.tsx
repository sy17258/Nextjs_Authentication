'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import axios from "axios";
import { User, LogOut, UserCircle, Mail, Shield } from "lucide-react";


export default function Profile() {
    const router = useRouter();
    const [data, setData] = useState("nothing");
    const [userDetails, setUserDetails] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    };

    const getUserDetails = async () => {
        try {
            setLoading(true);
            const res = await axios.post("/api/users/me");
            console.log(res.data);
            setData(res.data.data._id);
            setUserDetails(res.data.data);
        } catch (error: any) {
            toast.error("Failed to fetch user details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
            <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="mx-auto h-24 w-24 bg-purple-600 rounded-full flex items-center justify-center mb-4">
                        <UserCircle className="h-14 w-14 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
                    <p className="mt-2 text-gray-600">Manage your account information</p>
                </div>

                {/* Profile Card */}
                <div className="bg-white shadow-xl rounded-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-purple-600 to-purple-800 px-6 py-8">
                        <div className="flex items-center">
                            <div className="h-20 w-20 bg-white/20 rounded-full flex items-center justify-center">
                                <User className="h-10 w-10 text-white" />
                            </div>
                            <div className="ml-6">
                                <h2 className="text-2xl font-bold text-white">
                                    {userDetails?.username || "Loading..."}
                                </h2>
                                <p className="text-purple-200">
                                    {userDetails?.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-8">
                        {loading ? (
                            <div className="flex justify-center items-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                                <span className="ml-2 text-gray-600">Loading profile...</span>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <User className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Username</p>
                                            <p className="text-lg text-gray-900">{userDetails?.username}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-3">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Email</p>
                                            <p className="text-lg text-gray-900">{userDetails?.email}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <Shield className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Verification Status</p>
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                userDetails?.isVerified 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {userDetails?.isVerified ? 'Verified' : 'Pending Verification'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3">
                                        <UserCircle className="h-5 w-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">User ID</p>
                                            <p className="text-sm text-gray-600 font-mono break-all">
                                                {data !== "nothing" ? data : "Loading..."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            {data !== "nothing" && (
                                <Link
                                    href={`/profile/${data}`}
                                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-center py-3 px-6 rounded-lg font-medium transition duration-200"
                                >
                                    View Detailed Profile
                                </Link>
                            )}
                            
                            <button
                                onClick={logout}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium transition duration-200 flex items-center justify-center"
                            >
                                <LogOut className="h-5 w-5 mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
