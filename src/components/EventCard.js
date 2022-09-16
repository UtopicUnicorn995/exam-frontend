import {Row, Col} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import { Form } from "react-bootstrap";
import { useState } from 'react';


export default function EventCard(props){
    const {eventName, _id} = props.eventProp;
    console.log(eventName)

    const [updatedEventName, setUpdatedEventName] = useState('')

    const updateEvent = (e) =>{

        fetch(`http://localhost:3005/event/update/${_id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                eventName: updatedEventName
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
        window.location.reload(false)
    }

    const deleteEvent = (e) => {

        fetch(`http://localhost:3005/event/delete/${_id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => console.log(data))
        window.location.reload(false)
    }

    return(
        <Accordion.Item eventKey={_id}>
        <Accordion.Header>{eventName}</Accordion.Header>
        <Accordion.Body>
            <Row>
                <Col xs='12' md='8'>
          <Form.Control
            placeholder='Please input new Value'
            onChange={e => setUpdatedEventName(e.target.value)}
          />
          </Col>
          <Col xs='12' md='2'>
          <Button onClick={e => updateEvent()}>Update</Button>
          </Col>
          <Col xs='12' md='2'>
          <Button onClick={e => deleteEvent()} variant='danger'>Delete</Button>
          </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    )
}