import NavDropdown from 'react-bootstrap/NavDropdown';

export default function UserCard(props){

    const {name, _id} = props.userProp
    console.log(name)
    console.log(_id)

    return(
        <NavDropdown.Item href={_id}>{name}</NavDropdown.Item>
    )
}