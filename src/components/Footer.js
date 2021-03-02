import React, { useState } from 'react'

function Footer() {

    const splitToChunks = (arr, size) => 
        Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size))

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
        <footer className="footer">
            <section className="footer-content">
                <div className="footer-partion footer-partition_nav">
                    <h3 className="footer-links__title">Навигация</h3>
                    <div className="footer-links">
                        { 
                            splitToChunks(categories, 4).map((chunk, chunkIndex) => {
                                return (
                                    <div className="footer-links__container" key={chunkIndex}>
                                        { chunk.map((item, itemIndex) => <p className="footer-links__item" key={itemIndex}>{ item.name }</p>) }
                                    </div>
                                )    
                            })
                        }
                        
                        {/* <div className="footer-links__container">
                            <p className="footer-links__item">Новости</p>
                            <p className="footer-links__item">Тренды</p>
                            <p className="footer-links__item">Политика</p>
                            <p className="footer-links__item">Бизнес</p>
                        </div>
                        <div className="footer-links__container">
                            <p className="footer-links__item">Наука</p>
                            <p className="footer-links__item">Культура</p>
                            <p className="footer-links__item">Фильмы</p>
                            <p className="footer-links__item">Сериалы</p>
                        </div>
                        <div className="footer-links__container">
                            <p className="footer-links__item">Игры</p>
                            <p className="footer-links__item">Технологии</p>
                            <p className="footer-links__item">Спорт</p>
                        </div>*/}
                    </div>
                </div>
                <div className="footer-partion footer-partition_contacts">
                    <h3 className="footer-links__title">Обратная связь</h3>
                    <div className="footer-links">
                        <div className="footer-links__container">
                            <p className="footer-links__item"><i className="ri-github-fill"></i><i className="ri-telegram-fill"></i></p>
                            <p className="footer-links__item">saizaax.off@gmail.com</p>
                            <p className="footer-links__item">vk.com/saizaax</p>
                        </div>
                    </div>
                </div>
            </section>
        </footer>
    )
}

export default Footer