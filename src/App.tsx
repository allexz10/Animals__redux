import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import Translations from './pages/Translations';

const App = () => (
  <div className="container">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/translations" element={<Translations />} />
    </Routes>
  </div>
);
export default App;
