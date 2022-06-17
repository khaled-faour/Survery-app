import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import Header from './components/header';
import Login from "./screens/login";
import AddSurvey from "./screens/addSurvey";

const App = () => {
  return (
    <div className="App">
      <Header/>
      <Routes>
          <Route path="/" element={<>HOME</>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/addSurvey" element={<AddSurvey/>} />
      </Routes>
    </div>
  );
}



export default App;
