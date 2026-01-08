import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/LoginSignUp/Login.jsx";
import Signup from "./pages/LoginSignUp/Signup.jsx";
import UserInformation from "./pages/LoginSignUp/UserInformation.jsx";
import Home from "./pages/home/Home.jsx";
import Info from "./pages/info/Info.jsx";
// import Todos from "./pages/todos/Todos.jsx";
import Posts from "./pages/posts/Posts.jsx";
// import Albums from "./pages/albums/Albums.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/users/:userId/userInformation" element={<UserInformation />} />
      <Route path="/users/:userId/home" element={<Home />}>
        <Route path="info" element={<Info />} />
        <Route path="posts" element={<Posts />} />
        {/* <Route path="todos" element={<Todos />} />
        <Route path="albums" element={<Albums />} /> */}
      </Route>

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
