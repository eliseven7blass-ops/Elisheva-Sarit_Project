import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../pages/AuthContext.jsx";
import "./SideMenu.css";

function SideMenu() {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    }

    if (!user) return null;

    return (
        <aside className="side-menu">
            <div className="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className="menu-content">
                <div className="user-name">
                   hello {user.username}
                </div>

                <nav>
                    <Link to={`/users/${user.id}/home/info`}>Info</Link>
                    <Link to={`/users/${user.id}/home/todos`}>Todos</Link>
                    <Link to={`/users/${user.id}/home/posts`}>Posts</Link>
                    <Link to={`/users/${user.id}/home/albums`}>Albums</Link>
                    <button onClick={handleLogout}>Logout</button>
                </nav>
            </div>
        </aside>
    );
}

export default SideMenu;
