import { Container } from 'react-bootstrap';
import './App.css';
import Home from './pages/Home'
import NavBar from './components/NavBar'

function App() {
  return (
    // <Router>
    //   <Container>
    //     <Routes>
    //       <Route exact path='/' element={<Home/>}/>
    //     </Routes>
    //   </Container>
    // </Router>
    <>
    <NavBar/>
    <Container>
      <Home/>
    </Container>
    </>
  );
}

export default App;
