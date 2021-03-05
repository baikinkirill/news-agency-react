import React, { useEffect, useState } from 'react'
import axios from 'axios'

import ArticleContentBar from './ArticleContentBar'
import ArticleContentRecommends from './ArticleContentRecommends'

function ArticleContent({ match }) {

    const [article, setArticle] = useState(null)

    useEffect(() => {
        axios({ method: 'get', url:`http://localhost:5500/articles/${match.params.id}`, responseType: 'json' })
            .then(response => 
                setArticle(response.data))
            .catch((error) => 
                console.log(error))
    }, [match.params.id])

    return (
        <main className="main">
            <div className="container main__container">
                <div className="content-container">
                    <ArticleContentBar article={article} />
                    <ArticleContentRecommends article={article} />
                </div>
            </div>
        </main>
    )
}

export default ArticleContent