import React from 'react'

import EditArticleContent from './EditArticleContent'
import Header from './Header/Header'

function EditArticle() {
    return (
        <>
            <Header type={'article_edit'} />
            <EditArticleContent />
        </>
    )
}

export default EditArticle