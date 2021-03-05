import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

function HeaderCategories({ categories }) {

    const history = useHistory()
    const [menuState, setMenuState] = useState(false)
    const [searchQuery, setSearchQuery] = useState(null)

    const handleOnChange = (e) => {
        const { value } = e.target
        setSearchQuery(value)
    }

    useEffect(() => {
        console.log('render')
        const timeoutId = setTimeout(() => history.push(`?search=${searchQuery}`), 300);
        return () => clearTimeout(timeoutId);
    }, [searchQuery, history]);

    return (
        <section className="category-bar">
            <nav className="container category-bar__container">
                <ul className={ (menuState) ? "list category-bar__list_active" : "list category-bar__list" }>
                    {categories.map((item, index) => 
                        <li className="list-item category-bar__list-item" key={index}>
                            <Link className='text-link' to={(index === 0) ? `/` : `/?category=${item.name}`}>{item.name}</Link></li>) }
                </ul>
                <button 
                    className="category-bar__more-btn" 
                    onClick={() => setMenuState(!menuState)}>
                        <i className={ (menuState) ? "ri-close-fill" : "ri-menu-2-line" }></i>
                </button>
                <div className="category-bar__search-container">
                    <input className="category-bar__search" type="text" placeholder="Поиск новостей" onChange={handleOnChange} />
                    <i className="ri-search-line"></i>
                </div>
            </nav>
        </section>
    )
}

export default HeaderCategories