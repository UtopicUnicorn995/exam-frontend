

export default function UserCard2(props){

    const {name, _id} = props.userProp


    return(
        <option value={_id}>{name}</option>
    )
}