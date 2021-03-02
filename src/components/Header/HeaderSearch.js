import React from 'react'

function HeaderSearch() {
    return (
        <section className="search-bar">
            <div className="search-bar__container">
                <input className="category-bar__search" type="text" placeholder="Поиск новостей" />
                <i className="ri-search-line"></i>
            </div>
        </section>
    )
}

export default HeaderSearch