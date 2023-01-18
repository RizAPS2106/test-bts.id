import { Routes, Route } from "react-router-dom";
import Register from "./Pages/Auth/Register";
import Main from "./Pages/Main/Main";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/register' element={<Register />}></Route>
      </Routes>
    </div>
  );
}

export default App;
