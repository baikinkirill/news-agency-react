import React, { useState } from "react"
import { useHistory } from "react-router"
import { Categories } from "./Header/Categories"

function Footer() {
  const history = useHistory()

  const splitToChunks = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    )

  const [categories] = useState(Categories)

  const handleClick = (name, index) => {
    index === 0 ? history.push("/") : history.push(`/${name}`)
  }

  return (
    <footer className="footer">
      <section className="footer-content">
        <div className="footer-partion footer-partition_nav">
          <h3 className="footer-links__title">Навигация</h3>
          <div className="footer-links">
            {splitToChunks(categories, 4).map((chunk, chunkIndex) => {
              return (
                <div className="footer-links__container" key={chunkIndex}>
                  {chunk.map((item, itemIndex) => (
                    <p
                      className="footer-links__item"
                      key={itemIndex}
                      onClick={() => handleClick(item.name, chunkIndex)}
                    >
                      {item.name}
                    </p>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
        <div className="footer-partion footer-partition_contacts">
          <h3 className="footer-links__title">Обратная связь</h3>
          <div className="footer-links">
            <div className="footer-links__container">
              <p className="footer-links__item">
                <i className="ri-github-fill"></i>
                <i className="ri-telegram-fill"></i>
              </p>
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
