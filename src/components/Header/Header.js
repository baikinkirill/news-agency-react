import React, { useState } from 'react'

import HeaderInfo from './HeaderInfo'
import HeaderCategories from './HeaderCategories'
import HeaderInfoResponsive from './HeaderInfoResponsive'
import { HeaderInfoProvider } from './HeaderInfoContext'
import HeaderSearchResponsive from './HeaderSearchResponsive'

function Header() {

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
                <HeaderInfo />
                <HeaderCategories categories={categories} />
                <HeaderInfoResponsive />
                <HeaderSearchResponsive />
            </header>
        </HeaderInfoProvider>
    )
}

export default Header