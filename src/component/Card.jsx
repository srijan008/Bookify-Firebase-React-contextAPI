import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/Firebase';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BasicExample(props) {
    const navigate = useNavigate();
    const firebase = useFirebase();
    const [url, setURL] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imageURL = await firebase.getImageURL(props.imageURL);
                setURL(imageURL);
            } catch (err) {
                console.error("Error fetching image URL:", err);
                setError(err.message);
            }
        };

        fetchImage();
    }, [firebase, props.imageURL]);

    if (loading) {
        return <div>Loading image...</div>;
    }

    if (error) {
        return <div>Error loading image: {error}</div>;
    }

    return (
        <Card style={{ width: '18rem' }}>
            {url && <Card.Img variant="top" src={url} alt={props.name} />}
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    This book has a title {props.name} and is sold by {props.displayName}. 
                    It costs Rs. {props.price}.
                </Card.Text>
                <Button onClick={() => navigate(`/book/view/${props.id}`)} variant="primary">
                    View Details
                </Button>
            </Card.Body>
        </Card>
    );
}

export default BasicExample;
