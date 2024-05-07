"use client"

import {useSignInWithEmailAndPassword} from "react-firebase-hooks/auth"
import {auth} from "@/firebase/config"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GoogleAuthProvider,signInWithPopup } from 'firebase/auth'
import Link from "next/link"

export default function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[errorMsg, setErrorMsg] = useState("");
    const [SignInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const router = useRouter();

    const loginHandler = async() => {
       try {

        if(!email || !password){
            setErrorMsg("Please fill all the fields");
            return;
        }
        else{
            const res = await SignInWithEmailAndPassword(email,password);
            setEmail("");
            setPassword("");
            router.push("/");
        }

       } catch (error) {
        console.log(error);
       } 
    }

    return(
        <div className='min-h-screen w-full p-3 bg-blue-800 text-slate-800 flex justify-center items-center select-none'>
        <div className='block space-y-6'>
            <h1 className='text-white text-3xl'>Login to continue!</h1>
            <Input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Input placeholder='Password' value={password} onChange={((e) => setPassword(e.target.value))}/>
            <div>
                    <Button variant="default" onClick={loginHandler}>Login</Button>
            </div>
            {/* <div><Button onClick={googleHandler}>Enter with Google</Button></div> */}
            <div>
                <Link href={"/register"}><Button>New user? Register here</Button></Link>
            </div>
            <p className='text-red-500'>{errorMsg}</p>
        </div>
    </div>
    )
}