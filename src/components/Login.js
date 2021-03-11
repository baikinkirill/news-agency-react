import React, { useState, useContext } from 'react'
import Cookies from 'js-cookie'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'

import authImage from '../assets/jpg/auth.jpg'

import { AuthContext } from './AuthContext'

function Login() {

    const history = useHistory()
    const { userContext, tokenContext } = useContext(AuthContext)

    const [, setUser] = userContext
    const [, setToken] = tokenContext

    const [login, setLogin] = useState(null)
    const [password, setPassword] = useState(null)
    const [repeatPassword, setRepeatPassword] = useState(null)

    const urlParams = new URLSearchParams(window.location.search)
    const [authType, setAuthType] = useState(urlParams.get('type') || 'login')

    const handleAuth = () => {
        axios({ method: 'post', url: `http://localhost:5500/${authType}`, responseType: 'json', data: { login: login, password: password }})
            .then(response => { 
                if (response.data !== null && response.data.accessToken !== null) {
                    setUser(login)
                    setToken(response.data.accessToken)
                    // document.cookie = `token=${response.data.accessToken};`
                    // document.cookie = `user=${login}`
                    Cookies.set('token', response.data.accessToken, { expires: 7, path: '/' })
                    Cookies.set('user', login, { expires: 7, path: '/' });
                    history.push('/')
                }
            })
    }

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
                    <input type="text" className="authorization__input authorization__input_login" placeholder="Логин" onChange={e => setLogin(e.target.value)} />
                    <input type="password" className="authorization__input authorization__input_password" placeholder="Пароль" onChange={e => setPassword(e.target.value)} />
                    { (authType === 'login') ? null : <input type="password" className="authorization__input authorization__input_password" placeholder="Повторите пароль" onChange={e => setRepeatPassword(e.target.value)} /> }
                </div>
                <div className="authorization__inline-container">
                    {(authType === 'login') ? <button className="authorization__btn authorization__btn_action" onClick={handleAuth}>Войти</button> :
                    <button className="authorization__btn authorization__btn_action" onClick={(repeatPassword === password) ? handleAuth : null}>{(repeatPassword === password) ? "Зарегистрироваться" : "Пароли не совпадают"}</button>}
                </div>
                <div className="authorization__inline-container">
                    <Link to="/"><button className="authorization__btn authorization__btn_return">Вернуться на главную</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Login