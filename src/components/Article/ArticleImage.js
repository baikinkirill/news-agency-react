import React from 'react'

function ArticleImage({ url }) {
    return (
        <div className="article-image" style={{backgroundImage: `url(${url})`}}></div>
    )
}

export default ArticleImage