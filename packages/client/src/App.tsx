import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./utils/router/routes";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="bg-blue-100 h-100vh w-100vw">
      <Router>
        <Routes>
          {routes.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<item.component />}
            />
          ))}
        </Routes>
      </Router>

      <ToastContainer />
    </div>
  );
}

export default App;
