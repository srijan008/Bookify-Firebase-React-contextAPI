import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';

const List = () => {
    const firebase = useFirebase();
    const [name, setName] = useState("");
    const [isbnNumber, setIsbnNumber] = useState("");
    const [price, setPrice] = useState("");
    const [coverPic, setCoverPic] = useState(null); // Change to hold the file object

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (coverPic) {
            await firebase.handleCreateNewListing(name, isbnNumber, price, coverPic);
        } else {
            alert("Please upload a cover picture.");
        }
    }

    return (
        <div className='container mt-4'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBookName">
                    <Form.Label>Enter Book Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Book name" 
                        onChange={(e) => setName(e.target.value)} 
                        value={name}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formIsbnNumber">
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="ISBN Number" 
                        onChange={(e) => setIsbnNumber(e.target.value)} 
                        value={isbnNumber}
                    />
                </Form.Group>      

                <Form.Group className="mb-3" controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter Price" 
                        onChange={(e) => setPrice(e.target.value)} 
                        value={price}
                    />
                </Form.Group> 

                <Form.Group className="mb-3" controlId="formCoverPic">
                    <Form.Label>Cover Picture</Form.Label>
                    <Form.Control 
                        type="file" 
                        onChange={(e) => setCoverPic(e.target.files[0])} // Changed to handle file input
                    />
                </Form.Group> 

                <Button variant='primary' type='submit'>
                    Create
                </Button>
            </Form>
        </div>
    )
}

export default List;
