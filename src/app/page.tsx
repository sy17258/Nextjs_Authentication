'use client'
import Image from "next/image";
import { ArrowRight, Shield, Zap, Users, CheckCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import axios from "axios";
import { User, LogOut, UserCircle, Mail } from "lucide-react";



export default function Home() {

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">NextAuth</span>
            </div>
            <div className="flex items-center space-x-4">
              {userDetails ? (
                <div className="flex items-center space-x-2">
                  <Link href="/profile"><UserCircle className="h-6 w-6 text-gray-600" />
                  <span className="text-gray-700">{userDetails.email}</span></Link>
                  <button
                    onClick={logout}
                    className="text-red-600 hover:text-red-800 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
                  >
                    Logout
                  </button>
                </div>
              ) : (<div className="flex items-center space-x-2">
                <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-indigo-700 hover:to-cyan-700 transition duration-200"
              >
                Get Started
              </Link>
              </div>
              )}
              
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="mx-auto h-24 w-24 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-full flex items-center justify-center mb-8">
            <Shield className="h-12 w-12 text-white" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Secure Authentication
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">
              Made Simple
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience the next generation of authentication with our secure, fast, and user-friendly platform. 
            Built with modern technologies for the modern web.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-lg font-medium rounded-xl hover:from-indigo-700 hover:to-cyan-700 transition duration-200 shadow-lg"
            >
              Create Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 text-lg font-medium rounded-xl hover:border-gray-400 hover:bg-gray-50 transition duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose NextAuth?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built with security, performance, and user experience in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition duration-300">
              <div className="h-14 w-14 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Secure by Default</h3>
              <p className="text-gray-600">
                Advanced security features including JWT tokens, email verification, 
                and encrypted password storage to keep your data safe.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition duration-300">
              <div className="h-14 w-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600">
                Optimized for performance with Next.js 15, ensuring quick load times 
                and smooth user interactions across all devices.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition duration-300">
              <div className="h-14 w-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">User Friendly</h3>
              <p className="text-gray-600">
                Intuitive interface with modern design principles, making authentication 
                a seamless experience for your users.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-3xl p-8 md:p-16 text-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything You Need
              </h2>
              <p className="text-xl text-indigo-100">
                A complete authentication solution for modern applications
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-300 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Email Verification</h3>
                    <p className="text-indigo-100">Automated email verification with customizable templates</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-300 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Password Security</h3>
                    <p className="text-indigo-100">Advanced password hashing and security measures</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-300 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">User Management</h3>
                    <p className="text-indigo-100">Complete user profile and account management</p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-300 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">JWT Authentication</h3>
                    <p className="text-indigo-100">Secure token-based authentication system</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-300 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Responsive Design</h3>
                    <p className="text-indigo-100">Beautiful UI that works on all devices</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-green-300 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Modern Tech Stack</h3>
                    <p className="text-indigo-100">Built with Next.js, MongoDB, and TypeScript</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who trust NextAuth for their authentication needs
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-lg font-medium rounded-xl hover:from-indigo-700 hover:to-cyan-700 transition duration-200 shadow-lg"
            >
              Start Free Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="h-8 w-8 bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="ml-3 text-lg font-bold">NextAuth</span>
            </div>
            <div className="">
            <p className="text-gray-400 text-sm">
                © 2025 Developed by Shivam Yadav. Built with Next.js and TypeScript.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
