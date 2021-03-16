import React, { useState, useEffect } from "react"
import { motion } from 'framer-motion'
import { getPublicationTime } from "./ArticleHelper"
import { Link } from "react-router-dom"
import axios from "axios"

import config from "../../config.json"

function ArticleContentRecommends({ article }) {
  
  const [recommends, setRecommends] = useState(null)

  const animations = {
    animationContainer: {
      hidden: { opacity: 1, scale: 1 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          delayChildren: 0.1,
          staggerChildren: 0.1
        }
      }
    },
    animationItems: {
      hidden: {
        opacity: 0,
        x: 100,
        y: 0
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0
      }
    }
  }

  useEffect(() => {
    article !== null &&
      axios({
        method: "get",
        url: `${config.json_server_address}/articles?${article.tags
          .map((el) => `tags_like=${el}`)
          .join("&")}&_start=0&_end=${6}&id_ne=${
          article.id
        }&_sort=id&_order=desc`,
        responseType: "json"
      })
        .then((response) => setRecommends(response.data))
        .catch((error) => console.log(error))
  }, [article])

  return recommends === null || recommends.length === 0 ? null : (
    <motion.section className="side-bar side-bar_recommendations" variants={animations.animationContainer} initial="hidden" animate="visible" >
      {recommends.map((item, index) =>
        item.id === article.id ? null : (
          <motion.div
            variants={animations.animationItems}
            key={index}
            className="side-bar__item-container side-bar__item-container_overview"
            style={{ backgroundImage: `url(${item.preview})` }}
          >
            <div className="darken darken_recommendations"></div>
            <p className="side-bar__item-meta side-bar__item-meta_recommendations">
              {getPublicationTime(new Date(item.time))}
            </p>
            <p className="side-bar__item side-bar__item_recommendations">
              <Link className="text-link" to={`/article/${item.id}`}>
                {item.title}
              </Link>
            </p>
            <p className="side-bar__item-meta side-bar__item-meta_recommendations side-bar__item-meta_tag side-bar__item-meta_tag_recommendations">
              {item.tags.join(", ")}
            </p>
          </motion.div>
        )
      )}
    </motion.section>
  )
}

export default ArticleContentRecommends
