import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Authenticated from "./App/guards/Authenticated";
import Guest from "./App/guards/Guest";
import WalletDashboard from './App/pages/WalletDashboard';
import Login from './App/pages/Login';
import Home from "./App/pages/Home";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" >
          <Route index element={<Home />} />

          <Route element={<Authenticated />}>
            <Route path="wallet">
              <Route path="dashboard" element={<WalletDashboard />} />
            </Route>
          </Route>

          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
