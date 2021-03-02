import React, { useEffect, useState } from 'react'
import axios from 'axios'

import HeaderInfo from './HeaderInfo'
import HeaderCategories from './HeaderCategories'
import HeaderInfoResponsive from './HeaderInfoResponsive'
import HeaderSearch from './HeaderSearch'

function Header() {

    /* Current USD/EUR/BTC Currencies & Moscow Weather Temperature */
    const [currencies, setCurrencies] = useState({ usd: null, eur: null, btc: null })
    const [weatherTemp, setWeatherTemp] = useState(null)

    useEffect(() => {
        /* USD & EUR */
        axios({ method: 'get', url: 'https://www.cbr-xml-daily.ru/latest.js', responseType: 'json' })
            .then(response => setCurrencies((prevState) => 
                ({ ...prevState, usd: response.data.rates.USD, eur: response.data.rates.EUR,})))
            .catch((error) => 
                console.log(error))

        /* BTC */
        axios({ method: 'get', url: 'https://api.coinbase.com/v2/exchange-rates?currency=BTC', responseType: 'json' })
            .then(response => setCurrencies((prevState) => 
                ({ ...prevState, btc: response.data.data.rates.USD })))
            .catch((error) => 
                console.log(error))

        /* Moscow Weather */
        axios({ method: 'get', url: 'http://api.openweathermap.org/data/2.5/weather?q=moscow&appid=178ae9a5a359aa5a542be240bd36bc59&units=metric', responseType: 'json' })
            .then(response => 
                setWeatherTemp(Math.round(response.data.main.feels_like)))
            .catch((error) => 
                console.log(error))
    }, [])

    /* Current Date & Time */
    const [currentDate, setCurrentDate] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setCurrentDate(new Date()), 10000)
        return () => clearInterval(timer)
    })


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
        <header>
            <HeaderInfo currencies={currencies} currentDate={currentDate} weatherTemp={weatherTemp} />
            <HeaderCategories categories={categories} />
            <HeaderInfoResponsive currencies={currencies} currentDate={currentDate} weatherTemp={weatherTemp} />
            <HeaderSearch />
        </header>
    )
}

export default Header