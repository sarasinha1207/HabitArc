import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Heatmap from './pages/Heatmap';
import Profile from './pages/Profile';
import Help from './pages/Help';
import Ranks from './pages/Ranks';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="heatmap" element={<Heatmap />} />
          <Route path="profile" element={<Profile />} />
          <Route path="help" element={<Help />} />
          <Route path="ranks" element={<Ranks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
