import React from 'react'
import { Link } from 'react-router-dom'

function ArticleItem({ id, title, time, tags }) {

    const isToday = (someDate) => {
        const today = new Date()
        return someDate.getDate() === today.getDate() &&
            someDate.getMonth() === today.getMonth() &&
            someDate.getFullYear() === today.getFullYear()
    }

    const publicationTime = isToday(time) 
        ? `Сегодня, ${time.getHours()}:${time.getMinutes()}` 
        : `${time.getDate()}.${("0" + (time.getMonth() + 1)).slice(-2)}, ${time.getHours()}:${time.getMinutes()}`

    return (
        <div className="side-bar__item-container">
            <p className="side-bar__item-meta">{publicationTime}</p>
            <Link to={`/article/${id}`} className="text-link"><p className="side-bar__item">{title}</p></Link>
            <p className="side-bar__item-meta side-bar__item-meta_tag">{tags.join(", ")}</p>
        </div>
    )
}

export default ArticleItem