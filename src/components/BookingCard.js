import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {Row, Col} from 'react-bootstrap'
import { useEffect, useState } from 'react';

export default function BookingCard(props) {

    const {eventId, userId, desiredTime, endTime, _id} = props.bookingProp;
   console.log(eventId)

    const [name, setName] = useState('')
    const [eventsName, setEventsName] = useState('')

    useEffect(() => {
        fetch(`http://localhost:3005/User/view/${userId}`)
        .then(res => res.json())
        .then(data => {
            setName(data.name)
        })
    })

    useEffect(() => {
        fetch(`http://localhost:3005/event/views/${eventId}`)
        .then(res => res.json())
        .then(data => {
            setEventsName(data.eventName)
        })
    })
    
    return(
        <Col sm='12' md='4' className='my-3 d-flex justify-content-center'>
            <Card style={{ width: '18rem' }}>
                <Card.Header>Event</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item className='text-center'>{eventsName}</ListGroup.Item>
                    <ListGroup.Item>Booked by: {name}</ListGroup.Item>
                    <ListGroup.Item>Start time: {desiredTime}:00</ListGroup.Item>
                    <ListGroup.Item>End time: {endTime}:00</ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    )
}