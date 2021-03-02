import React from 'react'

import logo from '../../assets/svg/logo.svg'

function HeaderInfo({ currencies, currentDate, weatherTemp }) {

    const formatTime = (date) => ("0" + date).slice(-2)
    const time = `${formatTime(currentDate.getDate())}.${formatTime(currentDate.getMonth() + 1)}.${currentDate.getFullYear()}, ${formatTime(currentDate.getHours())}:${formatTime(currentDate.getMinutes())}`

    return (
        <section className="info-section">
            <div className="container">
                <img src={logo} alt="" className="info-section__logo" />
                <ul className="list info-section__list">
                    <li className="list-item info-section__list-item"><i className="ri-calendar-todo-line"></i> {time}</li>
                    <li className="list-item info-section__list-item"><i className="ri-sun-cloudy-line"></i> Москва, {weatherTemp}°C</li>
                    <li className="list-item info-section__list-item"><i className="ri-money-dollar-circle-line"></i> {(1 / currencies.usd).toFixed(2)}</li>
                    <li className="list-item info-section__list-item"><i className="ri-money-euro-circle-line"></i> {(1 / currencies.eur).toFixed(2)}</li>
                    <li className="list-item info-section__list-item"><i className="ri-bit-coin-line"></i> {currencies.btc} $</li>
                </ul>
                <div className="info-section__auth">
                    <button className="info-section__btn info-section__register-btn">Зарегистрироваться</button>
                    <button className="info-section__btn info-section__login-btn">Войти</button>
                    <button className="info-section__btn info-section__mobile-btn"><i className="ri-login-box-line"></i></button>
                </div>
            </div>
        </section>
    )
}

export default HeaderInfo