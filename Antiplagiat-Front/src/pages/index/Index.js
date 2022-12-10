import './Index.css';
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";

export function useAuth(navigate) {
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/lk/documents")
        }
    }, [])
}

export function Index() {
    const navigate = useNavigate()

    useAuth(navigate);

    return (
        <div className="App">
            <header className="App-header">
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135874.png" width="30px" height="30px"/>
                <div className="Buttom">
                    <Link to={"/input"}>Вход</Link>
                    <Link to={"/register"}>Регистрация</Link>
                </div>
            </header>
            <div className="he"><h1>Антиплагиат</h1></div>
            <div className="WhatAndWhy">
                <div className="What">
                    <h3>Что это такое?</h3>
                    <div className="palka"></div>
                    <p>«Антиплагиат» - это специализированная поисковая система,<br/>
                        основным назначением которой является <br/>проверка текстовых файлов на наличие плагиата<br/>
                        (присвоение плодов чужого творчества)
                    </p>
                </div>
                <div className="Why">
                    <h3>Зачем это нужно?</h3>
                    <div className="palka"></div>
                    <p>Основная цель системы антиплагиат - это проверка<br/> документа на наличие заимствований.<br/>
                        По простому говоря, система Антиплагиат анализирует текст, <br/>который в нее загружают,<br/>
                        и в виде отчета выдает результат,<br/> а именно процент оригинальных источников и процент<br/>
                        заимствованных источников.
                    </p>
                </div>
            </div>
            <div className="Work">
                <h3>Как это работает?</h3>
                <div className="palka"></div>
                <div className="Blocks">
                    <div className="Loading">
                        <h5>1. Загрузка</h5>
                        <div className="picture">
                            <img src="https://cdn-icons-png.flaticon.com/512/3676/3676299.png" width="150px"
                                 height="150px"/>
                        </div>
                        <p>Пользователь загружает<br/> документ в систему</p>
                    </div>
                    <div className="Search">
                        <h5>2. Поиск</h5>
                        <div className="picture">
                            <img src="https://cdn-icons-png.flaticon.com/512/1440/1440384.png" width="150px"
                                 height="150px"/>
                        </div>
                        <p>Система ищет текст<br/> документа во внутренней базе</p>
                    </div>
                    <div className="Analysis">
                        <h5>3. Анализ</h5>
                        <div className="picture">
                            <img src="https://cdn-icons-png.flaticon.com/512/3041/3041209.png" width="150px"
                                 height="150px"/>
                        </div>
                        <p>Система анализирует совпадения<br/> и определяет фрагменты<br/> заимствования или цитирования
                        </p>
                    </div>
                    <div className="Result">
                        <h5>4. Результат</h5>
                        <div className="picture">
                            <img src="https://cdn-icons-png.flaticon.com/512/753/753490.png" width="150px"
                                 height="150px"/>
                        </div>
                        <p>Пользователь получает отчёт<br/> о результатах проверки <br/>документа на заимствования</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;
