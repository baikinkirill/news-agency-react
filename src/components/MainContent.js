import React, { useState } from 'react'

import MainContentNewsBar from './MainContentNewsBar'
import MainContentSideBar from './MainContentSideBar'

function MainContent() {

    const [articles] = useState(
        [
            {   
                id: 1,
                title: "Илон Маск пригласил Владимира Путина к диалогу в ClubHоuse",
                subtitle: "Маск разместил два твита 2 твита с разницей в 12 минут в субботу около полуночи по московскому времени.",
                tags: ["Бизнес", "Технологии", "Тренды"],
                preview: "https://www.kxan.com/wp-content/uploads/sites/40/2021/02/Elon-1.jpg",
                time: "2021-02-14T07:58:16Z"
            },
            {   
                id: 2,
                title: "Илон Маск пригласил Владимира Путина к диалогу в ClubHоuse",
                subtitle: "Маск разместил два твита 2 твита с разницей в 12 минут в субботу около полуночи по московскому времени.",
                tags: ["Бизнес", "Технологии", "Тренды"],
                preview: "https://i1.wp.com/calmatters.org/wp-content/uploads/2020/05/Flickr_ElonMusk_01.jpg",
                time: "2021-02-14T07:58:16Z"
            },
            {   
                id: 3,
                title: "Илон Маск пригласил Владимира Путина к диалогу в ClubHоuse",
                subtitle: "Маск разместил два твита 2 твита с разницей в 12 минут в субботу около полуночи по московскому времени.",
                tags: ["Бизнес", "Технологии", "Тренды"],
                preview: "https://i1.wp.com/calmatters.org/wp-content/uploads/2020/05/Flickr_ElonMusk_01.jpg",
                time: "2021-02-14T07:58:16Z"
            },
            {   
                id: 4,
                title: "Илон Маск пригласил Владимира Путина к диалогу в ClubHоuse",
                subtitle: "Маск разместил два твита 2 твита с разницей в 12 минут в субботу около полуночи по московскому времени.",
                tags: ["Бизнес", "Технологии", "Тренды"],
                preview: "https://i1.wp.com/calmatters.org/wp-content/uploads/2020/05/Flickr_ElonMusk_01.jpg",
                time: "2021-02-14T07:58:16Z"
            }
        ]
    )

    return (
        <main className="main">
            <div className="container main__container">
                <h1 className="head-title">Главное за день</h1>
                <div className="content-container">
                    <MainContentSideBar articles={articles} />
                    <MainContentNewsBar articles={articles} />
                </div>
            </div>
        </main>
    )
}

export default MainContent