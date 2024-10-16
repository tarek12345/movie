import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/home/home';
import NotFound from './pages/NotFound/NotFound';
import Comments from './pages/comments/comments';
import Albums from './pages/albums/albums';
import Photos from './pages/photos/photos';
import Users from './pages/users/users';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div className="App">
  <BrowserRouter>
        <Routes>
          <Route
            index
            path={"/"}
            element={
                <Home />
            }
          />
          <Route
            
            path={"/home"}
            element={
                <Home />

            }
          /> 
            <Route
            
            path={"/Posts"}
            element={
                <posts/>

            }
          />
          <Route  path="/albums" element={<Albums />} />
          <Route path="/photos" element={<Photos />} />
          <Route path="/users" element={<Users />} />
          <Route  path="/comments" element={<Comments />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
