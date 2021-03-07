import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { HeaderInfoContext } from './HeaderInfoContext'
import { AuthContext } from '../AuthContext'
import HeaderSignin from './HeaderSignin'
import HeaderProfile from './HeaderProfile'

import logo from '../../assets/svg/logo.svg'

function HeaderInfo({ type }) {

    const { currenciesContext, weatherContext, dateContext } = useContext(HeaderInfoContext)
    const { userContext } = useContext(AuthContext)

    const [user] = userContext
    const [currencies] = currenciesContext
    const [weatherTemp] = weatherContext
    const [currentDate] = dateContext

    const formatTime = (date) => ("0" + date).slice(-2)
    const time = `${formatTime(currentDate.getDate())}.${formatTime(currentDate.getMonth() + 1)}.${currentDate.getFullYear()}, ${formatTime(currentDate.getHours())}:${formatTime(currentDate.getMinutes())}`

    return (
        <section className="info-section">
            <div className={(type === "auth") ? "container info-section__container_login" : "container" }>
                <Link to="/"><img src={logo} alt="" className="info-section__logo" /></Link>
                <ul className="list info-section__list">
                    <li className="list-item info-section__list-item"><i className="ri-calendar-todo-line"></i> {time}</li>
                    <li className="list-item info-section__list-item"><i className="ri-sun-cloudy-line"></i> Москва, {weatherTemp}°C</li>
                    <li className="list-item info-section__list-item"><i className="ri-money-dollar-circle-line"></i> {(1 / currencies.usd).toFixed(2)}</li>
                    <li className="list-item info-section__list-item"><i className="ri-money-euro-circle-line"></i> {(1 / currencies.eur).toFixed(2)}</li>
                    <li className="list-item info-section__list-item"><i className="ri-bit-coin-line"></i> {currencies.btc} $</li>
                </ul>
                {(type !== "auth") ? (user !== null) ? <HeaderProfile /> : <HeaderSignin /> : null }
            </div>
        </section>
    )
}

export default HeaderInfo