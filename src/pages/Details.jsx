import React, { useEffect, useState } from 'react';
import { useFirebase } from '../context/Firebase';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

const Details = () => {
    const { bookID } = useParams();
    const firebase = useFirebase();  
    const [data, setData] = useState(null);  
    const [url, setURL] = useState(null);
    const [qty, setQty] = useState(1);
    
    // Fetch book details and image URL
    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const docSnap = await firebase.getBookById(bookID);
                if (docSnap.exists()) {
                    setData(docSnap.data());
                    const imageURL = await firebase.getImageURL(docSnap.data().imageURL);
                    setURL(imageURL);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        };

        fetchBookDetails();
    }, [firebase, bookID]);

    // Handle quantity input change
    const handleQtyChange = (event) => {
        setQty(Number(event.target.value));
    };

    // Place order
    const placeOrders = async () => {
        try {
            const result = await firebase.placeOrder(bookID, qty);
            console.log("Order placed successfully:", result);
        } catch (error) {
            console.error("Error placing order:", error);
        }
    };

    if (!data) {
        return <h1>Loading...</h1>;
    }

    return (
        <div className='container'>
            <h1>{data.name}</h1>
            {url && <img src={url} alt={data.name} width={"300px"} style={{ borderRadius: '10px' }} />}
            <h2>Details</h2>
            <h4>Price: Rs. {data.price}</h4>
            <h2>Owner Details</h2>
            {<img src={data.photoURL} alt={data.displayName} width={"100px"} style={{ borderRadius: '50%' }} />}
            <p>Name: {data.displayName}</p>
            <p>Email: {data.userEmail}</p>
            <InputGroup size="sm" className="mb-3">
                <InputGroup.Text>Quantity</InputGroup.Text>
                <Form.Control
                    type="number"
                    value={qty}
                    onChange={handleQtyChange}
                    min="1"
                />
            </InputGroup>
            <Button variant="success" onClick={placeOrders}>Buy Now</Button>
        </div>
    );
};

export default Details;
