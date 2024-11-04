import {Link} from "react-router-dom"

function StoryInfo({id, title, image, created_at }) {


    return (
        <div>
            <li className="StoryList">
                <img src={image} alt={"work image"}/>
                <Link className="link-class" to={`/story/${id}`}>{title}</Link>
                <h3>{created_at}</h3>
            </li>
        </div>
    )
}


export default StoryInfo