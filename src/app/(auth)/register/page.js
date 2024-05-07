"use client"

import React, { useState } from 'react'
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import Link from 'next/link'
import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth"
import {auth} from "@/firebase/config"
import { useRouter } from 'next/navigation'

export default function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const router = useRouter();

    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

    
    const submitHandler = async() => {
        if(!email || !password){
            setError("Please enter the valid details to continue!")
        }
        else{
            try {
                const res = await createUserWithEmailAndPassword(email, password)
                console.log({res})
                setEmail("")
                setPassword("")
                router.push("/landingPage")
            } catch (error) {
                console.log(error);
            }
        }
    }


  return (
    <div className='min-h-screen w-full p-3 bg-blue-800 text-slate-800 flex justify-center items-center select-none'>
        <div className='block space-y-6'>
            <h1 className='text-white text-3xl'>Register to continue!</h1>
            <Input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <Input placeholder='Password' value={password} onChange={((e) => setPassword(e.target.value))}/>
            <div className='mt-4'>
                <Button variant="outline" onClick={submitHandler}>Register</Button>
            </div>
            <div>
                <Link href={"/login"}><Button variant='outline'>Already a user? Login here</Button></Link>
            </div>
            <p className='text-red-500'>{error}</p>
        </div>
    </div>
  )
}