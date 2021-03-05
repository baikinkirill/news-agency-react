import React from 'react'

import ArticleText from './ArticleText'
import ArticleQuote from './ArticleQuote'
import ArticleLink from './ArticleLink'
import ArticleImage from './ArticleImage'
import ArticleVideo from './ArticleVideo'

function ArticleContentBar({ article }) {

    const isToday = (someDate) => {
        const today = new Date()
        return someDate.getDate() === today.getDate() &&
            someDate.getMonth() === today.getMonth() &&
            someDate.getFullYear() === today.getFullYear()
    }

    const publicationTime = (time) => isToday(time) ? `Сегодня, ${time.getHours()}:${time.getMinutes()}` : `${time.getDate()}.${("0" + (time.getMonth() + 1)).slice(-2)}, ${time.getHours()}:${time.getMinutes()}`

    return (
        <section className="content content_overview">
            <div className="article-info article-info_overview">
                <div className="meta-info">
                    <p className="publication-time">{(article === null) ? null : publicationTime(new Date(article.time))}</p>
                    <ul className="list">
                        <li className="list-item meta-info__tag-item">{(article === null) ? null : article.tags.slice(0, 1)}</li>
                    </ul>
                </div>
                <h2 className="article-title article-title_overview">{(article === null) ? null : article.title}</h2>
                <p className="article-subtitle article-subtitle_overview">{(article === null) ? null : article.subtitle}</p>
                <div className="article-image" style={{ backgroundImage: `url(${(article === null) ? null : article.preview})` }}></div>
                { (article === null) ? null : article.content.map((item, index) => 
                        (item.type === 'text')  ? <ArticleText  key={index} value={item.value} /> :
                        (item.type === 'quote') ? <ArticleQuote key={index} value={item.value} /> :
                        (item.type === 'link')  ? <ArticleLink  key={index} value={item.value} url={item.url} /> :
                        (item.type === 'image') ? <ArticleImage key={index} url={item.url} /> :
                        (item.type === 'video') ? <ArticleVideo key={index} url={item.url} /> : null
                )}
                <div className="article-author">
                    <p className="article-author__text">Автор статьи • {(article === null) ? null : article.author}</p>
                </div>
            </div>
        </section>
    )
}

export default ArticleContentBar