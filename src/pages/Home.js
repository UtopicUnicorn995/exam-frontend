import { useEffect, useState } from "react";
import EventCard from  '../components/EventCard'
import EventCard2 from  '../components/EventCard2'
import UserCard2 from  '../components/UserCard2'
import BookingCard from  '../components/BookingCard'
import { Container } from "react-bootstrap";
import Accordion from 'react-bootstrap/Accordion';
import { Form, Row, Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import React from "react";
import TimePicker from 'react-bootstrap-time-picker';
import Swal from 'sweetalert2'





export default function Home(){

//     function refreshPage() {
//         window.location.reload(false);
//       }

//     const refreshPop = document.querySelector('.swal2-confirm')

// refreshPop.addEventListener('click', function(){
//   window.location.reload(false);
// })

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [timeValue, onChangeValue] = useState('');
    const [timeValue2, onChangeValue2] = useState('');
    let calculatedStartTime = (timeValue/60)/60;
    let calculatedEndTime = (timeValue2/60)/60;

    const [eventValue, setEventValue] = useState('')
    const [userValue, setUserValue] = useState('')
    console.log(eventValue)
    console.log(userValue)

    let d = new Date()
    let currentHour = d.getHours()

    const [modalShow, setModalShow] = React.useState(false);
    const [events, setEvents] = useState([]);
    const [events2, setEvents2] = useState([]);
    
    const [user2, setUsers2] = useState([])

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3005/Event/view')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setEvents(data.map(event =>{
                return(
                    <EventCard key={event._id} eventProp ={event}/>
                )
            }))
        })
    }, [])

    useEffect(() => {
        fetch('http://localhost:3005/Event/view')
        .then(res => res.json())
        .then(data => {
            setEvents2(data.map(event2 =>{
                return(
                    <EventCard2 key={event2._id} eventProp2 ={event2}/>
                )
            }))
        })
    }, [])

    useEffect(() =>{
        fetch('http://localhost:3005/book/view')
        .then(res => res.json())
        .then(data => {
            setBookings(data.map(sched =>{
                return(
                    <BookingCard key={sched._id} bookingProp ={sched}/>
                )
            }))
        })
    }, [])

    const [max, setMax] = useState()

    useEffect(() =>{
        fetch('http://localhost:3005/book/view')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setMax(Math.max(...data.map(o => o.endTime)))
           
        })
    }, [])

    console.log(max)

    useEffect(() => {
        fetch('http://localhost:3005/User/view')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setUsers2(data.map(user =>{
                return(
                    <UserCard2 key={user._id} userProp={user}/>
                )
            }))
        })
    }, [])


    const bookNow = (e) => {
        e.preventDefault()
        console.log(eventValue, userValue, calculatedStartTime, calculatedEndTime)
        if(currentHour > calculatedStartTime){
            Swal.fire({
                title: `You cannot book before ${currentHour}:00`,
                icon: 'warning'
            });
        }else if(calculatedStartTime > calculatedEndTime){
            Swal.fire({
                title: `End time must be greater than start time`,
                icon: 'warning'
            });
        }else if(max > calculatedStartTime){
            Swal.fire({
                title: `Events 8:00-${max}:00 has already been booked`,
                icon: 'warning'
            });
        }else{
            fetch('http://localhost:3005/book/new', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    eventId: eventValue,
                    userId: userValue,
                    desiredTime: calculatedStartTime,
                    endTime: calculatedEndTime
                })
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            Swal.fire({
                title: `This event has been booked`,
                icon: 'success'
            });
            window.location.reload(false);
        }
        
        // .then(data => {
        //     console.log(data)
        // })
      }




    return(
        <>
        <Container>
        <h1 className="text-center mt-3" >Bogsy's Event House</h1>
        <h5 className="text-center mt-3 mb-3">Please choose an event or </h5>
        <Button variant="primary" className="mb-3" onClick={handleShow}>
        Launch demo modal
      </Button>
        <Accordion defaultActiveKey="0">
        {events}
         </Accordion>
        </Container>
        <h2 className="text-center mt-3">Events for today</h2>
        <Row className="eventForToday">
        {bookings}
        </Row>





<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => bookNow(e)}>
          <Form.Select className="mb-3" aria-label="Default select example" onChange={e => setEventValue(e.target.value)}>
                <option>Open to select an event</option>
                {events2}
            </Form.Select>
            <Form.Select className="mb-3" aria-label="Default select example" onChange={e => setUserValue(e.target.value)}>
                <option>Open to select a user</option>
                {user2}
            </Form.Select>
            <Form.Label>Select Start Time</Form.Label>
            <TimePicker className='mb-3' start="8:00" end="20:00" step={60} onChange={onChangeValue} value={timeValue}/>

            <Form.Label>Select End Time</Form.Label>
            <TimePicker className='mb-3' start="8:00" end="20:00" step={60} onChange={onChangeValue2} value={timeValue2}/>

            <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
          </Form>
        </Modal.Body>
      </Modal>
        </>
    )
}