"use client"

import {db} from "@/firebase/config"
import { useState,useEffect } from "react"
import { collection, addDoc } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


export default function LandingPage(){

    const [bookName, setBookName] = useState('');
    const [bookDescription, setBookDescription] = useState('');
    const [bookPrice, setBookPrice] = useState(0);
    const [bookPicture, setBookPicture] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
          await addDoc(collection(db, "books"), {
              bookName: bookName,
              bookDescription: bookDescription,
              bookPrice: bookPrice,
              bookPicture: bookPicture,
            });
          
    }

    return(
        <div className="bg-blue-900 text-blue-200 space-y-6 min-h-screen w-full p-4 block">
            <h1>Landing Page</h1>

            <br/>

            <h1>Add data to firestore database</h1>

            <form className="space-y-6 text-black block">
                <input value={bookName} placeholder="Book name" onChange={(e) => setBookName(e.target.value)}/>
                <input value={bookDescription} placeholder="Book description" onChange={(e) => setBookDescription(e.target.value)}/>
                <input value={bookPicture} placeholder="Book picture" onChange={(e) => setBookPicture(e.target.value)}/>
                <input type="number" value={bookPrice} onChange={(e) => setBookPrice(e.target.value)}/>

                <button className="px-4 py-2 border-2 border-black bg-gray-800 text-white" onClick={handleSubmit}>Submit Book</button>
            </form>
        </div>
    )
}