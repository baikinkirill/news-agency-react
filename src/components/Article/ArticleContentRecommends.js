import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function ArticleContentRecommends({ article }) {

    const isToday = (someDate) => {
        const today = new Date()
        return someDate.getDate() === today.getDate() &&
            someDate.getMonth() === today.getMonth() &&
            someDate.getFullYear() === today.getFullYear()
    }

    const publicationTime = (time) => isToday(time) 
        ? `Сегодня, ${time.getHours()}:${time.getMinutes()}` 
        : `${time.getDate()}.${("0" + (time.getMonth() + 1)).slice(-2)}, ${time.getHours()}:${time.getMinutes()}`

    const [recommends, setRecommends] = useState(null)

    useEffect(() => {
        (article !== null) && axios({ method: 'get', url:`http://localhost:5500/articles?${article.tags.map(el => `tags_like=${el}`).join('&')}&_start=0&_end=${6}`, responseType: 'json' })
            .then(response => 
                setRecommends(response.data))
            .catch((error) => 
                console.log(error))
    }, [article])

    return (
        (recommends === null) ? null : (
            <section className="side-bar side-bar_recommendations">
                { recommends.map((item, index) => item.id === article.id ? null :
                    <div key={index} className="side-bar__item-container side-bar__item-container_overview" style={{ backgroundImage: `url(${item.preview})` }}>
                        <div className="darken darken_recommendations"></div>
                        <p className="side-bar__item-meta side-bar__item-meta_recommendations">{publicationTime(new Date(item.time))}</p>
                        <p className="side-bar__item side-bar__item_recommendations"><Link className="text-link" to={`/article/${item.id}`}>{item.title}</Link></p>
                        <p className="side-bar__item-meta side-bar__item-meta_recommendations side-bar__item-meta_tag side-bar__item-meta_tag_recommendations">{item.tags.join(', ')}</p>
                    </div>) }
            </section>
        )
    )
}

export default ArticleContentRecommends