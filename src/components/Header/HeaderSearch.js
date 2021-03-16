import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

function HeaderSearch() {
  const history = useHistory()
  const [searchQuery, setSearchQuery] = useState(null)

  const handleOnChange = (e) => {
    const { value } = e.target
    setSearchQuery(value)
  }

  useEffect(() => {
    const timeoutId = setTimeout(
      () =>
        searchQuery !== null
          ? history.push(`?search=${searchQuery}`)
          : history.push(`?`),
      300
    )
    return () => clearTimeout(timeoutId)
  }, [searchQuery, history])

  return (
    <>
      <input
        className="category-bar__search"
        type="text"
        placeholder="Поиск новостей"
        onChange={handleOnChange}
      />
      <i className="ri-search-line"></i>
    </>
  )
}

export default HeaderSearch
