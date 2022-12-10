import './Documents.scss';
import {useNavigate} from "react-router-dom";
import {useQuery} from "react-query";
import {BsDownload, BsFillTrashFill} from "react-icons/bs";

function getDatetime(e) {
    return new Date(e.createdAt).toLocaleDateString("ru") + " в " + new Date(e.createdAt).toLocaleTimeString("ru");
}

function uploadFile(e, refetch) {
    const file = e.target.files[0];

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
    console.log(file)
    const formdata = new FormData();
    formdata.append("file", file);

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch(process.env.REACT_APP_API_URL + "/files/upload", requestOptions)
        .then(response => response.text())
        .then(result => {
            refetch()
        })
        .catch(error => alert("Ошибка загрузки"));
}

function getTable(data, refetch) {
    return <table>
        <thead>
        <tr>
            <td>Название</td>
            <td>Дата загрузки</td>
            <td>Оригинальность</td>
            <td>Действия</td>
        </tr>
        </thead>
        <tbody>
        {data?.files.map((e) => {
            return (
                <tr key={e.id}>
                    <td>{e.filename}</td>
                    <td>{getDatetime(e)}</td>
                    <td>{100 - e.overlap}%</td>
                    <td>
                        <div className={"actions-buttons"}>
                            <BsDownload onClick={() => {
                                window.open(process.env.REACT_APP_API_URL + `/files/download?fileId=${e.id}&token=${e.token}`)
                            }} style={{color: "blue"}}/>
                            <BsFillTrashFill onClick={() => {
                                fetch(process.env.REACT_APP_API_URL + "/files?fileId=" + e.id, {
                                    method: "DELETE",
                                    headers: {
                                        Authorization: "Bearer " + localStorage.getItem("token")
                                    }
                                }).then(() => {
                                    refetch()
                                })
                            }} style={{color: "red"}}/>
                        </div>
                    </td>
                </tr>
            )
        })}
        </tbody>
    </table>;
}

export function Documents() {
    const navigate = useNavigate()

    const {isLoading, error, data, refetch, isRefetching} = useQuery("files", () => {
        return fetch(process.env.REACT_APP_API_URL + "/files", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((e) => e.json())
    })

    return (
        <div className="Documents">
            <header className="documents-header">
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135874.png" width="30px" height="30px"/>
                <button onClick={() => {
                    localStorage.setItem("token", "")
                    navigate("/")
                }}>Выйти
                </button>
            </header>
            <main>
                <div className="add">
                    <button className="size" onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';

                        input.onchange = e => {
                            uploadFile(e, refetch);
                        }

                        input.click();
                    }}>Добавить документ
                    </button>
                </div>
                {data?.files?.length > 0 && (
                    <>
                        {getTable(data, refetch)}
                    </>
                )}
                {!(isLoading || isRefetching) && data?.files?.length === 0 && (
                    <div>
                        <br/>
                        <br/>
                        <p>У вас нет загруженных файлов</p>
                    </div>
                )}
                {(isLoading || isRefetching) && (
                    <div>
                        <br/>
                        <br/>
                        <p>Загрузка...</p>
                    </div>
                )}
            </main>
        </div>
    )
}