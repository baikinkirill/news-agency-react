import React from 'react'

import ArticleItemRichLarge from './ArticleItemRichLarge'
import ArticleItemRich from './ArticleItemRich'

function MainContentNewsBar({ articles, type }) {

    const [majorArticle] = (articles === null) ? [null] : articles.slice(0, 1)
    const otherArticles = (articles === null) ? null : (type === 'editor') ? articles : articles.slice(1)

    return (
        <section className="content">
            <div className="article-container article-container_lg">
                { (articles === null || articles.length === 0 || type === 'editor') ? null : <ArticleItemRichLarge 
                    id={majorArticle.id}
                    time={new Date(majorArticle.time)} 
                    tags={majorArticle.tags}
                    title={majorArticle.title}
                    subtitle={majorArticle.subtitle}
                    preview={majorArticle.preview}
                />}
            </div>
            <div className="article-container article-container_md">
                { (type === 'editor') ? 
                    <div className="article article_md article_new">
                        <div className="article_new-btn-container">
                            <button className="red-articles-btn">Добавить статью</button>
                        </div>
                    </div> : null }
                { (articles === null || articles.length === 0) ? null : otherArticles.map(item => 
                    <ArticleItemRich
                        key={item.id}
                        id={item.id}
                        time={new Date(item.time)} 
                        tags={item.tags}
                        title={item.title}
                        subtitle={item.subtitle}
                        preview={item.preview}
                    />
                )}
            </div>
        </section>
    )
}

export default MainContentNewsBar