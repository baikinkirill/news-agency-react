import React from 'react'

import Header from './Header/Header'
import MainContent from './MainContent'

function Editor() {
    return (
        <>
            <Header />
            <MainContent type='editor' />
        </>
    )
}

export default Editor