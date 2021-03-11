import React, { useState } from 'react'

import HeaderInfo from './HeaderInfo'
import HeaderCategories from './HeaderCategories'
import HeaderInfoResponsive from './HeaderInfoResponsive'
import { HeaderInfoProvider } from './HeaderInfoContext'
import HeaderSearchResponsive from './HeaderSearchResponsive'

function Header({ type }) {

    // todo: move to server
    const [categories] = useState(
        [
            { name: "Новости" }, 
            { name: "Тренды" },
            { name: "Политика" },
            { name: "Бизнес" },
            { name: "Наука" },
            { name: "Культура" },
            { name: "Фильмы" },
            { name: "Сериалы" },
            { name: "Игры" },
            { name: "Технологии" },
            { name: "Спорт" }
        ]
    )

    return (
        <HeaderInfoProvider>
            <header>
                <HeaderInfo type={type} />
                {(type === 'article_edit') ? null : <HeaderCategories categories={categories} />}
                <HeaderInfoResponsive type={type} />
                {(type === 'article_edit') ? null : <HeaderSearchResponsive />}
            </header>
        </HeaderInfoProvider>
    )
}

export default Header