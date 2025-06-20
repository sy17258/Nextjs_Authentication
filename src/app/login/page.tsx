"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";





export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
       
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <>
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Login"}</h1>
        <hr />
        
        <label htmlFor="email">email</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="password">password</label>
        <input 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            placeholder="password"
            />
            <button
            onClick={onLogin}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here</button>
            <Link href="/signup">Visit Signup page</Link>
        </div>



{/* <div className="min-h-screen  from-hotel-cream via-white to-hotel-gold/10 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6">
        <div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-center text-hotel-blue">
              Welcome Back
            </h1>
            <div className="text-center">
              Sign in Page
            </div>
          </div>
          <div>
            <form onClick={onLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email">Email:  </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={user.email}
                  onChange={(e) => setUser({...user, email: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password">Password:  </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={user.password}
                  onChange={(e) => setUser({...user, password: e.target.value})}
                  required
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-hotel-blue hover:bg-hotel-blue-dark"
                disabled={loading}
              >
                {loading && <div className="mr-2 h-4 w-4 animate-spin border-2 border-white border-t-transparent rounded-full" />}
                Sign In
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-hotel-text-secondary">
                Don't have an account?{' '}
                <Link href="/signup" className="text-hotel-blue hover:underline font-medium">
                  Create one here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div> */}
    </>
    )
}