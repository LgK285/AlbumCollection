import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CollectionPage from './components/CollectionPage';
import FloatingHearts from './components/FloatingHearts';

function App() {
  return (
    <Router>
      <FloatingHearts />
      <div className="relative z-10">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<CollectionPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;