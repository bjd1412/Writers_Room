import {Link} from "react-router-dom"
import DefaultBook from "../images/DefaultBook.jpg"
import moment from 'moment'

function StoryInfo({id, title, image, created_at, user}) {
    const imageURL = image || DefaultBook


    return (
        <div>
            <li className="StoryCard">
                <img src={imageURL} alt={"work image"} className="StoryImage"/>
                <Link className="link-class" to={`/stories/${id}`}>{title}</Link>
                <small>by: {user && user.username}</small>
                <small>{moment(created_at).format('MM-DD-YYYY')}</small>
            </li>
        </div>
    )
}


export default StoryInfo