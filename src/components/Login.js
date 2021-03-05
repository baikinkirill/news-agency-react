import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import authImage from '../assets/jpg/auth.jpg'

function Login() {

    const urlParams = new URLSearchParams(window.location.search)
    const [authType, setAuthType] = useState(urlParams.get('type') || 'login')

    return (
        <div className="authorization__container">
            <div className="authorization__image-side" style={{ backgroundImage: `url(${authImage})` }}></div>
            <div className="authorization__auth-form">
                <div className="authorization__inline-container"><h3 className="authorization__title">Авторизация</h3></div>
                <div className="authorization__inline-container authorization__inline-container_btns">
                    <button className={(authType === 'login') ? "authorization__btn authorization__btn_login authorization__btn_active" : "authorization__btn authorization__btn_login"} onClick={() => setAuthType('login')}>Вход</button>
                    <button className={(authType === 'register') ? "authorization__btn authorization__btn_register authorization__btn_active" : "authorization__btn authorization__btn_register"} onClick={() => setAuthType('register')}>Регистрация</button>
                </div>
                <div className="authorization__inline-container authorization__inline-container_column">
                    <input type="text" className="authorization__input authorization__input_login" placeholder="Логин" />
                    <input type="password" className="authorization__input authorization__input_password" placeholder="Пароль" />
                    { (authType === 'login') ? null : <input type="password" className="authorization__input authorization__input_password" placeholder="Повторите пароль" /> }
                </div>
                <div className="authorization__inline-container">
                    <button className="authorization__btn authorization__btn_action">{ (authType === 'login') ? "Войти" : "Зарегистрироваться" }</button>
                </div>
                <div className="authorization__inline-container">
                    <Link to="/"><button className="authorization__btn authorization__btn_return">Вернуться на главную</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Login