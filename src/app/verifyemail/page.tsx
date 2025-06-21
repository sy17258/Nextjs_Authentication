'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { CheckCircle, XCircle, Mail, AlertCircle } from 'lucide-react';

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const verifyUserEmail = async () => {
        try {
            setLoading(true);
            await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
            setError(false);
        } catch (error: any) {
            setError(true);
            console.log(error.response?.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setError(false);
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        setError(false);
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="mx-auto h-20 w-20 bg-indigo-600 rounded-full flex items-center justify-center mb-4">
                        <Mail className="h-10 w-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Email Verification</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Verifying your email address
                    </p>
                </div>

                <div className="bg-white shadow-xl rounded-lg px-8 py-8">
                    {loading && (
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Verifying your email...</h3>
                            <p className="text-gray-600">Please wait while we verify your email address.</p>
                        </div>
                    )}

                    {verified && !loading && (
                        <div className="text-center">
                            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Email Verified Successfully!</h3>
                            <p className="text-gray-600 mb-6">
                                Your email has been verified. You can now sign in to your account.
                            </p>
                            <Link
                                href="/login"
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition duration-200 inline-block text-center"
                            >
                                Continue to Login
                            </Link>
                        </div>
                    )}

                    {error && !loading && (
                        <div className="text-center">
                            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Verification Failed</h3>
                            <p className="text-gray-600 mb-6">
                                We couldn't verify your email. The verification link may have expired or is invalid.
                            </p>
                            <div className="space-y-3">
                                <Link
                                    href="/signup"
                                    className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-medium transition duration-200 inline-block text-center"
                                >
                                    Try Again
                                </Link>
                                <Link
                                    href="/login"
                                    className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-medium transition duration-200 inline-block text-center"
                                >
                                    Go to Login
                                </Link>
                            </div>
                        </div>
                    )}

                    {!token && !loading && !verified && !error && (
                        <div className="text-center">
                            <AlertCircle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No Verification Token</h3>
                            <p className="text-gray-600 mb-6">
                                No verification token found. Please check your email for the verification link.
                            </p>
                            <Link
                                href="/login"
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition duration-200 inline-block text-center"
                            >
                                Go to Login
                            </Link>
                        </div>
                    )}

                    {token && !loading && !verified && !error && (
                        <div className="text-center">
                            <div className="bg-gray-100 rounded-lg p-4 mb-4">
                                <p className="text-sm text-gray-600 break-all">
                                    <strong>Token:</strong> {token}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}