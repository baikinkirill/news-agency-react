import React, { useEffect, useState, useContext } from 'react'
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'

import MainContentNewsBar from './MainContentNewsBar'
import MainContentSideBar from './MainContentSideBar'
import NothingFound from './NothingFound'
import { AuthContext } from './AuthContext'

function MainContent({ type }) {

    const sidebarAmount = 10

    const [articleIndex] = useState(10)
    const [articles, setArticles] = useState(null)
    const [sidebarArticles, setSidebarArticles] = useState(null)
    
    const category = new URLSearchParams(useLocation().search).get('category')
    const search = new URLSearchParams(useLocation().search).get('search')

    const { userContext } = useContext(AuthContext)
    const [user] = userContext

    useEffect(() => {

        const source = axios.CancelToken.source()

        const getURL = (category !== null) ? `http://localhost:5500/articles?tags_like=${category}&_start=0&_end=${articleIndex + sidebarAmount}` : 
                         (search !== null) ? `http://localhost:5500/articles?q=${search}&_start=0&_end=${articleIndex + sidebarAmount}`
                                           : `http://localhost:5500/articles?_start=0&_end=${articleIndex + sidebarAmount}`

        axios({ method: 'get', url: getURL, responseType: 'json', cancelToken: source.token })
            .then(response => {
                const { data } = response
                data.length < 20 ? setArticles(data) : setArticles(data.slice(0, -sidebarAmount))
                data.length < 20 ? setSidebarArticles(null) : setSidebarArticles(data.slice(-sidebarAmount))
            })
            .catch((error) => 
                (!axios.isCancel(error)) && console.log(error))

        return () => {
            source.cancel();
        }
                
    }, [category, articleIndex, search])

    return (
        <main className="main">
            <div className="container main__container">
                {(user === null || type === 'editor') ? null : 
                <div className="edit-options">
                    <Link to='/editor'><button className="edit-options-btn">Перейти в меню редактора <i className="ri-edit-line"></i></button></Link>
                </div>}
                <h1 className="head-title">{category}</h1>
                <div className="content-container">
                    { (articles === null) ? null : (articles.length === 0 && type !== 'editor') ? <NothingFound /> : 
                    <>
                        { (type === 'editor') ? null : <MainContentSideBar articles={sidebarArticles} />}
                        <MainContentNewsBar articles={articles} type={type} /> 
                    </> }
                </div>
            </div>
        </main>
    )
}

export default MainContent