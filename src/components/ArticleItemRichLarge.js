import React from 'react'
import { Link } from 'react-router-dom'

function ArticleItemRichLarge({ id, time, title, subtitle, tags, preview }) {

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
        <div className="article article_lg" style={{ backgroundImage: `url(${preview})` }}>
            <div className="darken"></div>
            <div className="article-info article-info_lg">
                <div className="meta-info">
                    <p className="publication-time publication-time_lg">{publicationTime}</p>
                </div>
                <div className="article-text-container article-text-container_lg">
                    <Link to={`/article/${id}`} className="text-link"><h2 className="article-title article-title_lg">{title}</h2></Link>
                    <p className="article-subtitle article-subtitle_lg">{(subtitle.length > 250) ? `${subtitle.slice(0, 250)}...` : subtitle}</p>
                </div>
            </div>
        </div>
    )
}

export default ArticleItemRichLarge