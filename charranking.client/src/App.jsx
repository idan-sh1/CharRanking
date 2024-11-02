import './App.css';
import './custom.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home.jsx';
import Rank from './Pages/Rank.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';

import OnePieceImageArr from "./Components/ImagesData/OnePieceImages.jsx";
import DragonBallImageArr from "./Components/ImagesData/DragonBallImages.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/rank-op" element={<Rank dataType={1} imgArr={OnePieceImageArr} />} />
                <Route path="/rank-db" element={<Rank dataType={2} imgArr={DragonBallImageArr} />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;