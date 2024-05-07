"use client"

import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from "@/firebase/config"
import {db} from "@/firebase/config"
import { useState,useEffect } from "react"
import { addDoc, collection, getDocs} from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

async function addBookDataToFirestore(bookName,bookDescription,bookPrice,bookPicture){
    try {
        const docref = await addDoc(collection(db, "books"),{
            bookName: bookName,
            bookDescription: bookDescription,
            bookPrice: bookPrice,
            bookPicture: bookPicture,
        });

        console.log("Document written with Id:", docref.id);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export default function LandingPage(){

    const [user] = useAuthState(auth);
    const userEmail = user?.email;

    const [bookName, setBookName] = useState('');
    const [bookDescription, setBookDescription] = useState('');
    const [bookPrice, setBookPrice] = useState(0);
    const [bookPicture, setBookPicture] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newBookAdded = await addBookDataToFirestore(bookName,bookDescription, bookPrice, bookPicture);

        if(newBookAdded){
            setBookName('');
            setBookDescription('');
            setBookPrice(0);
            setBookPicture('');

            alert("Book added to firestore")
        }
    }

    return(
        <div className="bg-blue-900 text-blue-200 space-y-6 min-h-screen w-full p-4">
            <h1>Landing Page</h1>
            <p>Welcome {userEmail}</p>

            <br/>

            <h1>Add data to firestore database</h1>

            <form onSubmit={handleSubmit} className="space-y-6 text-black">
                <Input id="name" placeholder="Book Name" value={bookName} onChange={(e) => setBookName(e.target.value)}/>
                <Input id="description" placeholder="Book description" value={bookDescription} onChange={(e) => setBookDescription(e.target.value)}/>
                <Input id="price" type="number" value={bookPrice} onChange={(e) => setBookPrice(e.target.value)}/>
                <Input id="picture" placeholder="Book Picture" value={bookPicture} onChange={(e) => setBookPicture(e.target.value)}/>
    
                <Button variant="outline" type="submit">Submit</Button>
            </form>
        </div>
    )
}