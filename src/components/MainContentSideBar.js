import React from 'react'

import ArticleItem from './ArticleItem'

function MainContentSideBar({ articles }) {
    return (
        <section className="side-bar">
            <h3 className="side-bar__title">Популярное</h3>
            { articles.map(item => 
                <ArticleItem key={item.id} title={item.title} time={new Date(item.time)} tags={item.tags} />) }
        </section>
    )
}

export default MainContentSideBar