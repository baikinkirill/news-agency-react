import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

import MainContentNewsBar from './MainContentNewsBar'
import MainContentSideBar from './MainContentSideBar'
import NothingFound from './NothingFound'

function MainContent() {

    const sidebarAmount = 10

    const [articleIndex] = useState(10)
    const [articles, setArticles] = useState(null)
    const [sidebarArticles, setSidebarArticles] = useState(null)
    
    const category = new URLSearchParams(useLocation().search).get('category')
    const search = new URLSearchParams(useLocation().search).get('search')

    useEffect(() => {

        const getURL = (category !== null) ? `http://localhost:5500/articles?tags_like=${category}&_start=0&_end=${articleIndex + sidebarAmount}` : 
                         (search !== null) ? `http://localhost:5500/articles?q=${search}&_start=0&_end=${articleIndex + sidebarAmount}`
                                           : `http://localhost:5500/articles?_start=0&_end=${articleIndex + sidebarAmount}`

        axios({ method: 'get', url: getURL, responseType: 'json' })
            .then(response => {
                const { data } = response
                data.length < 20 ? setArticles(data) : setArticles(data.slice(0, -sidebarAmount))
                data.length < 20 ? setSidebarArticles(null) : setSidebarArticles(data.slice(-sidebarAmount))
            })
            .catch(error => 
                console.log(error))
                
    }, [category, articleIndex, search])

    return (
        <main className="main">
            <div className="container main__container">
                <h1 className="head-title">{category}</h1>
                <div className="content-container">
                    { (articles === null || articles.length === 0) ? (<NothingFound />) : 
                    (<>
                        <MainContentSideBar articles={sidebarArticles} />
                        <MainContentNewsBar articles={articles} /> 
                    </>) }
                </div>
            </div>
        </main>
    )
}

export default MainContent