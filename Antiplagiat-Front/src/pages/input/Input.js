import './Input.css';
import {Link, useNavigate} from "react-router-dom";
import {useRef} from "react";
import {useAuth} from "../index/Index";

export function Input() {
    const loginRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()
    useAuth(navigate);

    const handleOnClick = () => {
        const login = loginRef.current.value
        const password = passwordRef.current.value

        fetch(process.env.REACT_APP_API_URL + `/users/auth?login=${login}&password=${password}`, {
            method: "GET"
        })
            .then((e) => e.json())
            .then((e) => {
                if (!e?.token) {
                    alert("Ошибка авторизации")
                    return
                }
                localStorage.setItem("token", e.token)
                navigate("/lk/documents")
            })
    }
    return (
        <div className="Input">
            <header className="App-header">
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135874.png" width="30px" height="30px"/>
            </header>
            <div className="all">
                <div className="form">
                    <div className="Logo">
                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135874.png" width="30px" height="30px"/>
                        <h2>Авторизация</h2>
                    </div>
                    <div className="Login">
                        <input class="input1" type="text" placeholder="Логин" ref={loginRef}/>
                    </div>
                    <div className="Password">
                        <input className="input1" type="text" placeholder="Пароль" ref={passwordRef}/>
                    </div>
                    <div className="inp">
                        <button onClick={handleOnClick} className="b">Войти</button>
                    </div>
                    <div className="accoun">
                        <p>Нет аккаунта?</p><Link to="/register">Зарегистрируйтесь!</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}