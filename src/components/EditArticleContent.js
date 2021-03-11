import React, { useEffect, useState, useContext } from 'react'
import ImageUploading from 'react-images-uploading'

import { AuthContext } from './AuthContext'

import EditArticleImage from './EditArticleImage'
import EditArticleLink from './EditArticleLink'
import EditArticleQuote from './EditArticleQuote'
import EditArticleText from './EditArticleText'
import EditArticleVideo from './EditArticleVideo'

import ArticleText from './Article/ArticleText'
import ArticleQuote from './Article/ArticleQuote'
import ArticleLink from './Article/ArticleLink'
import ArticleImage from './Article/ArticleImage'
import ArticleVideo from './Article/ArticleVideo'

function EditArticleContent() {

    const isToday = (someDate) => {
        const today = new Date()
        return someDate.getDate() === today.getDate() &&
            someDate.getMonth() === today.getMonth() &&
            someDate.getFullYear() === today.getFullYear()
    }

    const publicationTime = (time) => isToday(time) ? `Сегодня, ${("0" + time.getHours()).slice(-2)}:${("0" + time.getMinutes()).slice(-2)}` : `${time.getDate()}.${("0" + (time.getMonth() + 1)).slice(-2)}, ${("0" + time.getHours()).slice(-2)}:${("0" + time.getMinutes()).slice(-2)}`

    const { userContext } = useContext(AuthContext)
    
    const [user] = userContext
    const [currentTime, setCurrentTime] = useState(new Date())
    
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 10000)
        return () => clearInterval(timer)
    })

    const [values, setValues] = useState({
        title: 'Заголовок',
        subtitle: 'Подзаголовок',
        preview: null,
        tags: ['Новости'],
        time: null,
        content: []
    });

    const handleInputChange = (e, type = null, id = null) => {
        const { name, value } = e.target
        if (type === null) setValues({
            ...values,
            [name]: (name === 'tags') ? value.split(',').map(i => i.replace(/\s/g, '')) : value,
        })
        else setValues({
            ...values,
            content: values.content.map((item, index) => {
                if (index === id) item[name] = value
                return item
            }),
        })
    };

    console.log(values)

    return (
        <main className="main">
            <div className="container main__container">
                <div className="content-container content-container_article-edit">
                    <section className="content content_article-edit">
                        <div className="data-input">
                            <div className="data-input__container data-input__container_meta">
                                <div className="data-input__container_meta-container data-input__container_image stripe-background"
                                    style={values.preview === null ? {} : { 
                                        backgroundImage: `url(${values.preview[0].data_url})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
                                    }}
                                >
                                    {(values.preview !== null) && <div className="darken"></div>}
                                    <ImageUploading
                                        value={values.preview}
                                        onChange={img => setValues({...values, preview: img })}
                                        dataURLKey="data_url"
                                        resolutionType="more"
                                        resolutionHeight="500"
                                        resolutionWidth="500"
                                    >
                                        {({ onImageUpload, dragProps }) => 
                                            (values.preview !== null) ? 
                                                <label className="data-input__input-label data-input__input-label_active" onClick={onImageUpload} {...dragProps}>
                                                    <p>Изменить обложку</p>
                                                </label> 
                                                : <label className="data-input__input-label" onClick={onImageUpload} {...dragProps}>
                                                    <i className="ri-drag-drop-line"></i>
                                                    <p>Загрузить обложку (мин. 500x500)</p>
                                                </label>
                                        }
                                    </ImageUploading>
                                </div>
                                <div className="data-input__container_meta-container">
                                    <p className="data-input__title">Заголовок</p>
                                    <input type="text" className="data-input__input data-input__input_title" placeholder="Введите заголовок статьи" name="title" onChange={handleInputChange} />
                                </div>
                                <div className="data-input__container_meta-container">
                                    <p className="data-input__title">Подзаголовок</p>
                                    <input type="text" className="data-input__input data-input__input_subtitle" placeholder="Введите подзаголовок статьи" name="subtitle" onChange={handleInputChange} />
                                </div>
                                <div className="data-input__container_meta-container">
                                    <p className="data-input__title">Категория</p>
                                    <input type="text" className="data-input__input data-input__input_tags" placeholder="Введите категорию статьи" name="tags" onChange={handleInputChange} />
                                </div>
                                {values.content.map((item, index) => 
                                    (item.type === 'text')  ? <EditArticleText  key={index} {...{ handleInputChange, values, setValues }} id={index} /> :
                                    (item.type === 'quote') ? <EditArticleQuote key={index} {...{ handleInputChange, values, setValues }} id={index} /> :
                                    (item.type === 'link')  ? <EditArticleLink  key={index} {...{ handleInputChange, values, setValues }} id={index} /> :
                                    (item.type === 'image') ? <EditArticleImage key={index} {...{ handleInputChange, values, setValues }} id={index} /> :
                                    (item.type === 'video') ? <EditArticleVideo key={index} {...{ handleInputChange, values, setValues }} id={index} /> : null
                                )}
                            </div>
                            <div className="data-input__instruments">
                                <div className="data-input__instruments-item" onClick={() => setValues({...values, content: [...values.content, { type: 'text', value: '' }]})}><i className="ri-text"></i></div>
                                <div className="data-input__instruments-item" onClick={() => setValues({...values, content: [...values.content, { type: 'quote', value: '' }]})}><i className="ri-double-quotes-l"></i></div>
                                <div className="data-input__instruments-item" onClick={() => setValues({...values, content: [...values.content, { type: 'image', url: null }]})}><i className="ri-image-fill"></i></div>
                                <div className="data-input__instruments-item" onClick={() => setValues({...values, content: [...values.content, { type: 'link', value: '', url: '' }]})}><i className="ri-external-link-line"></i></div>
                                <div className="data-input__instruments-item" onClick={() => setValues({...values, content: [...values.content, { type: 'video', url: '' }]})}><i className="ri-live-line"></i></div>
                            </div>
                            <div className="data-input__action">
                                <div className="data-input__action-buttons">
                                    <button className="data-input__action-buttons_btn data-input__action-buttons_publish">Опубликовать</button>
                                    <button className="data-input__action-buttons_btn data-input__action-buttons_save">Сохранить черновик</button>
                                </div>
                                <button className="data-input__action-buttons_btn data-input__action-buttons_delete">Назад</button>
                            </div>
                        </div>            
                    </section>
                    
                    { /* Preview Article */ }
                    <section className="content content_overview">
                        <div className="article-info article-info_overview">
                            <div className="meta-info">
                                <p className="publication-time">{publicationTime(currentTime)}</p>
                                <ul className="list">
                                    <li className="list-item meta-info__tag-item">{(values.tags.length === 0) ? 'Категория' : values.tags.slice(0, 1)}</li>
                                </ul>
                            </div>
                            <h2 className="article-title article-title_overview">{values.title}</h2>
                            <p className="article-subtitle article-subtitle_overview">{values.subtitle}</p>
                            <div className="article-image stripe-background" 
                                style={ (values.preview === null) ? {} : { 
                                    background: `url(${values.preview[0].data_url})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover'
                                }}></div>
                            { values.content.map((item, index) => 
                                    (item.type === 'text')  ? <ArticleText  key={index} value={item.value} /> :
                                    (item.type === 'quote') ? <ArticleQuote key={index} value={item.value} /> :
                                    (item.type === 'link')  ? <ArticleLink  key={index} value={item.value} url={item.url} /> :
                                    (item.type === 'image') ? <ArticleImage key={index} url={item.url} /> :
                                    (item.type === 'video') ? <ArticleVideo key={index} url={item.url} /> : null
                            )}
                            <div className="article-author">
                                <p className="article-author__text">Автор статьи • {user}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    )
}

export default EditArticleContent