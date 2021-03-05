import React from 'react'
import { Link } from 'react-router-dom'

function ArticleItemRich({ id, time, title, subtitle, tags, preview }) {
    
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
        <div className="article article_md">
            <div className="article-info">
                <div className="meta-info">
                    <p className="publication-time">{publicationTime}</p>
                    <ul className="list">
                        <li className="list-item meta-info__tag-item">{tags.slice(0, 1)}</li>
                    </ul>
                </div>
                <Link to={`/article/${id}`} className="text-link"><h2 className="article-title">{title}</h2></Link>
                <p className="article-subtitle">{(subtitle.length > 200) ? `${subtitle.slice(0, 200)}...` : subtitle}</p>
            </div>
            <div className="article__preview article__preview_md" style={{ backgroundImage: `url(${preview})` }}></div>
        </div>
    )
}

export default ArticleItemRich