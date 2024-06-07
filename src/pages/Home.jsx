import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'
import BasicExample from '../component/Card';

const Home = () => {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);
    

    useEffect(() => {
        firebase.listAllBooks().then((books) => setBooks(books.docs))
    },[]);

  return (
    <div className='container'>
        {books.map((book) => (
            <BasicExample key = {book.id} id = {book.id} {...book.data()}/>
        ))}
    </div>
  )
}

export default Home
