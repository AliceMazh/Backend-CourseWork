import Index from "./pages/index/Index";
import {Route, Routes} from "react-router-dom";
import {Input} from "./pages/input/Input";
import {Register} from "./pages/register/Register"
import {Documents} from "./pages/documents/Documents"
import {AuthHOC} from "./components/authHOC/AuthHOC";

function App() {
    return (
        <Routes>
            <Route path={"/"} element={<Index/>}/>
            <Route path={"/input"} element={<Input/>}/>
            <Route path={"/register"} element={<Register/>}/>
            <Route path={"lk"} element={<AuthHOC/>}>
                <Route path={"documents"} element={<Documents/>}/>
            </Route>
        </Routes>
    );
}

export default App;
