import { Routes, Route } from 'react-router-dom';
import { AllUsers } from './pages/AllUsers';
import { DetailsOfUser } from './pages/DetailsOfUser';
import { ReposOfUser } from './pages/ReposOfUser';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/users" element={<AllUsers />} />
        <Route path="/users/:username" element={<DetailsOfUser />} />
        <Route path="/users/:username/repos" element={<ReposOfUser />} />
      </Routes>
    </div>
  );
}

export default App;
