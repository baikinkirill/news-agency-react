import React from 'react'

function ArticleLink({ value, url }) {
    return (
        <div className="article-link">
            <div className="article-link__text-container">
                <a className="article-link__text-container__title" href={url}>{value}</a>
                <p className="article-link__text-container__url">{new URL(url).hostname}</p>
            </div>
            <div className="article-link__icon-container">
                <i className="ri-external-link-line"></i>
            </div>
        </div>
    )
}

export default ArticleLink