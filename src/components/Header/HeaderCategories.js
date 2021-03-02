import React, { useState } from 'react'

function HeaderCategories({ categories }) {

    const [menuState, setMenuState] = useState(false)

    return (
        <section className="category-bar">
            <nav className="container category-bar__container">
                <ul className={ (menuState) ? "list category-bar__list_active" : "list category-bar__list" }>
                    {categories.map((item, index) => 
                        <li className="list-item category-bar__list-item" key={index}>{item.name}</li>)}
                </ul>
                <button 
                    className="category-bar__more-btn" 
                    onClick={() => setMenuState(!menuState)}>
                        <i className={ (menuState) ? "ri-close-fill" : "ri-menu-2-line" }></i>
                </button>
                <div className="category-bar__search-container">
                    <input className="category-bar__search" type="text" placeholder="Поиск новостей" />
                    <i className="ri-search-line"></i>
                </div>
            </nav>
        </section>
    )
}

export default HeaderCategories