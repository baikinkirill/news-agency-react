import React from "react"

import Header from "./Header/Header"
import MainContent from "./MainContent"

function Editor(props) {
  return (
    <>
      <Header />
      <MainContent type="editor" {...props} />
    </>
  )
}

export default Editor
