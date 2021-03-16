import React, { useEffect, useState, useContext } from "react"
import { useLocation, Link } from "react-router-dom"
import axios from "axios"

import config from "../config.json"
import { MainContentLoader } from "./ContentLoaders"
import MainContentNewsBar from "./MainContentNewsBar"
import MainContentSideBar from "./MainContentSideBar"
import NothingFound from "./NothingFound"
import { AuthContext } from "./AuthContext"

function MainContent({ type, match }) {
  const sidebarAmount = 10

  const [articlesCount, setArticlesCount] = useState(0)
  const [articleIndex, setArticleIndex] = useState(10)
  const [articles, setArticles] = useState(null)
  const [sidebarArticles, setSidebarArticles] = useState(null)

  const category = match.params.category
  const search = new URLSearchParams(useLocation().search).get("search")

  const { userContext } = useContext(AuthContext)
  const [user] = userContext

  const host = config.json_server_address
  const urlParams = {
    startPos: `_start=${0}`,
    endPos: `_end=${articleIndex + sidebarAmount}`,
    sortById: `_sort=id&_order=desc`,
    isEditor: `${type === "editor" ? null : "isPublished_ne=false"}`
  }
  const urls = {
    category: `${host}/articles?tags_like=${category}&${urlParams.startPos}&${urlParams.endPos}&${urlParams.sortById}&${urlParams.isEditor}`,
    search: `${host}/articles?q=${search}&${urlParams.startPos}&${urlParams.endPos}&${urlParams.sortById}&${urlParams.isEditor}`,
    default: `${host}/articles?${urlParams.startPos}&${urlParams.endPos}&${urlParams.sortById}&${urlParams.isEditor}`
  }

  const getUrl =
    category !== undefined
      ? urls.category
      : search !== null
      ? urls.search
      : urls.default

  useEffect(() => {
    const source = axios.CancelToken.source()

    axios({
      method: "get",
      url: getUrl,
      responseType: "json",
      cancelToken: source.token
    })
      .then((response) => {
        const { data } = response

        if (data.length < 20 || type === "editor") setArticles(data)
        else setArticles(data.slice(0, -sidebarAmount))

        data.length < 20
          ? setSidebarArticles(null)
          : setSidebarArticles(data.slice(-sidebarAmount))
        setArticlesCount(response.headers["x-total-count"])
      })
      .catch((error) => !axios.isCancel(error) && console.log(error))

    return () => {
      source.cancel()
    }
  }, [category, articleIndex, search, getUrl, type])

  return (
    <main className="main">
      <div className="container main__container">
        {user === null || type === "editor" ? null : (
          <div className="edit-options">
            <Link to="/editor">
              <button className="edit-options-btn">
                Перейти в меню редактора <i className="ri-edit-line"></i>
              </button>
            </Link>
          </div>
        )}
        <h1 className="head-title">{category}</h1>
        <div className="content-container">
          {articles === null ? (
            <MainContentLoader />
          ) : articles.length === 0 && type !== "editor" ? (
            <NothingFound />
          ) : (
            <>
              {type === "editor" ? null : (
                <MainContentSideBar articles={sidebarArticles} />
              )}
              <MainContentNewsBar
                articles={articles}
                type={type}
                setArticles={setArticles}
              />
            </>
          )}
        </div>
        {articlesCount <= articleIndex + sidebarAmount ? null : (
          <div className="more-articles-btn-container">
            <button
              className="red-articles-btn"
              onClick={() => setArticleIndex((prev) => prev + 10)}
            >
              Больше новостей
            </button>
          </div>
        )}
      </div>
    </main>
  )
}

export default MainContent
