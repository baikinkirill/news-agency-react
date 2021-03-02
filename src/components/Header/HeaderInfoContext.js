import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const HeaderInfoContext = createContext()

export function HeaderInfoProvider(props) {

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

    return (
        <HeaderInfoContext.Provider 
            value={{ 
                currenciesContext: [currencies, setCurrencies], 
                weatherContext: [weatherTemp, setWeatherTemp], 
                dateContext: [currentDate, setCurrentDate] 
            }}>
            {props.children}
        </HeaderInfoContext.Provider>
    )
}