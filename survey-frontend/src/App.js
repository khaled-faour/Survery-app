import { Routes, Route, Link } from "react-router-dom";
import './App.css';
import Header from './components/header';

const App = () => {
  return (
    <div className="App">
      <Header/>
      <Routes>
          <Route path="/" element={<>HOME</>} />
          <Route path="/login" element={<>Login</>} />
      </Routes>
    </div>
  );
}



export default App;
