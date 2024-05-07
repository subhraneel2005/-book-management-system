"use client"

import {db} from "@/firebase/config"
import { useState,useEffect } from "react"
import { collection, addDoc,serverTimestamp, getDocs, query } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {getAuth,signOut} from "firebase/auth"
import { useRouter } from "next/navigation"


export default function LandingPage(){

    const auth = getAuth();
    const user = auth.currentUser;

    const router = useRouter();

    const [bookName, setBookName] = useState('');
    const [bookDescription, setBookDescription] = useState('');
    const [bookPrice, setBookPrice] = useState(0);
    const [bookPicture, setBookPicture] = useState("");
    const [allBooks, setAllBooks] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newBook = {
            bookName: bookName,
              bookDescription: bookDescription,
              bookPrice: bookPrice,
              bookPicture: bookPicture,
              createdAt: serverTimestamp(),
              createdBy: user.email,
        }
          await addDoc(collection(db, "books"), {
                ...newBook
            });
            alert("New book added to database")            
        
        // allBooks.push(newBook);
        // setAllBooks(allBooks);
    }

    const logOut = () => {
        signOut(auth).then(() => {
            router.push("/auth")
          }).catch((error) => {
          });
    }

    const getAllAddedBooks = async () => {
        const q = query(collection(db, "books"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            allBooks.push(doc.data());
        });
        setAllBooks(allBooks);
    }

    useEffect(() => {
        getAllAddedBooks();
    },[])

    return(
        <div className="bg-neutral-900 text-neutral-200 space-y-6 min-h-screen w-full p-4">

            <h1 className="text-3xl font-bold text-center">{`Welcome ${user?.email}`}</h1>
            <Button variant="outline" onClick={logOut}>Logout</Button>
            <h1 className="text-xl font-bold text-center">Add your favorite books to firestore</h1>
            <div className="flex justify-center items-center w-full h-full">

            <div className="block">
            <form className="text-black space-y-6">
                <Input value={bookName} placeholder="Book name" onChange={(e) => setBookName(e.target.value)}/>
                <Input value={bookDescription} placeholder="Book description" onChange={(e) => setBookDescription(e.target.value)}/>
                <Input value={bookPicture} placeholder="Book picture" onChange={(e) => setBookPicture(e.target.value)}/>
                <Input type="number" value={bookPrice} onChange={(e) => setBookPrice(e.target.value)}/>

                <button className="px-4 py-2 border-2 border-black bg-gray-800 text-white" onClick={handleSubmit}>Submit Book</button>
            </form>
            </div>

            </div>
            <div className="block">
                <h1 className="text-3xl font-bold text-center">Your added books</h1>
                <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
                {allBooks.map((book) => (
                    <div className="block bg-black text-neutral-300 rounded-xl shadow-xl w-auto h-auto p-4">
                        <h1 className="text-2xl font-bold text-center">{book.bookName}</h1>
                        <p className="text-xl font-bold text-center">{book.bookDescription}</p>
                        <img src={book.bookPicture} alt="book" className="w-auto p-3 h-fit"/>
                        <div className="flex justify-between px-3">
                            <p className="text-lg">{`Created by :${book.createdBy}`}</p>
                            <p className="text-lg">{`Price: ₹ ${book.bookPrice}`}</p>
                        </div>
                    </div>
                ))}
                </div>

            </div>
            
        </div>
    )
}