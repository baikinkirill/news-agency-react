import React from 'react'

import ArticleItemRichLarge from './ArticleItemRichLarge'
import ArticleItemRich from './ArticleItemRich'

function MainContentNewsBar({ articles }) {

    const [majorArticle] = (articles === null) ? [null] : articles.slice(0, 1)
    const otherArticles = (articles === null) ? null : articles.slice(1)

    return (
        <section className="content">
            <div className="article-container article-container_lg">
                { (articles === null || articles.length === 0) ? null : <ArticleItemRichLarge 
                    id={majorArticle.id}
                    time={new Date(majorArticle.time)} 
                    tags={majorArticle.tags}
                    title={majorArticle.title}
                    subtitle={majorArticle.subtitle}
                    preview={majorArticle.preview}
                />}
            </div>
            <div className="article-container article-container_md">
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