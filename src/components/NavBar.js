import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useState, useEffect, useContext} from 'react';
import UserCard from './UserCard'
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'
import TimePicker from 'react-bootstrap-time-picker';





function BasicExample() {

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);
    
    const [users, setUsers] = useState([]);
    console.log(users)


    useEffect(() => {
        fetch('http://localhost:3005/User/view')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setUsers(data.map(user =>{
                return(
                    <UserCard key={user._id} userProp={user}/>
                )
            }))
        })
    }, [])

    


    const [name, setName] = useState('')
    console.log(name)

    function createNewUser(e){
        e.preventDefault();
        fetch('http://localhost:3005/user/new', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                name: name
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            Swal.fire({
                title: 'New User Created!',
                icon: 'success'
            });
            window.location.reload(false)
        })
        
    }

    const [eventName, setEventName] = useState('')
    const [desiredTime, setDesiredTime] = useState('')
    const [endTime, setEndTIme] = useState('')
    console.log(eventName)

    const [timeValue, onChangeValue] = useState('');
    console.log(timeValue)

    const [timeValue2, onChangeValue2] = useState('');

    function createNewEvent(e){
        e.preventDefault()
        fetch('http://localhost:3005/event/new', {
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
              eventName: eventName,
              desiredTime: timeValue,
              endTime: timeValue2
           })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            Swal.fire({
              title: 'New Event Created!',
              icon: 'success'
          });
          })
          window.location.reload(false)
    }

    
    
    let today = new Date();

    const now = ((today.getHours()*60)+today.getMinutes())*60;
    console.log(now)
    

  return (
    <>
    <Navbar bg="dark" variant='dark' expand="lg fixed='top'">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link  onClick={handleShow}>New User</Nav.Link>
            <Nav.Link  onClick={handleShow2}>New Event</Nav.Link>
            <NavDropdown title="Select User" id="basic-nav-dropdown">
              {users}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

{/* User Modal */}
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create new User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Please enter full name"
                autoFocus
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={e => createNewUser(e)} >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

{/* Event Modal */}
      <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Create new Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
            
              <Form.Label>Create Event</Form.Label>
              {/* <Form.Select onChange={e => setEventName(e.target.value)} aria-label="Default select example">
              <option >Choose Event</option>
              <option value="birthdayParty">Birthday Party</option>
              <option value="wedding">Wedding</option>
              <option value="sportsEvent">Sports Event</option>
            </Form.Select> */}
            <Form.Control
                type="text"
                placeholder="Please enter event name"
                autoFocus
                onChange={e => setEventName(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter Event Time</Form.Label>
              <Container>
              <TimePicker start="8:00" end="20:00" step={30} onChange={onChangeValue} value={timeValue}/>
              </Container>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter End Time</Form.Label>
              <Container>
              <TimePicker  start="8:00" end="20:00" step={30} onChange={onChangeValue2} value={timeValue2}/>
              </Container>
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary" onClick={e => createNewEvent(e)} >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BasicExample;