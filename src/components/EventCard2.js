


export default function EventCard2(props){
    const {eventName, _id} = props.eventProp2;
    console.log(eventName)

    return(
        <option value={_id}>{eventName}</option>
    )
}