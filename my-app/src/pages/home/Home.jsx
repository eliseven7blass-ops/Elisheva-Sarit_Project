import { useContext, useEffect } from "react"; //לשליפת המשתמש המחובר
import { useNavigate, Outlet, Link } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import SideMenu from "../../components/SideMenu.jsx";
import "./Home.css";


function Home() {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    if (!user) {
        return <p>טוען משתמש...</p>;
    }

    function handleLogout() {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
    }



    // בדוק אם אנחנו בנתיב של info/todos/posts/albums
    const isInSubRoute = location.pathname.includes('/info') ||
        location.pathname.includes('/todos') ||
        location.pathname.includes('/posts') ||
        location.pathname.includes('/albums');




    return (
        <div className="home-layout">
            <SideMenu />
            <main>
                <div className="home-container">
                    <h1>Hello {user.username}</h1>

                    {/* הצג את הכרטיסיות רק אם לא בעמוד פנימי */}
                    {!isInSubRoute && (
                        <>
                            <div className="home-actions">
                                <div className="action-card">
                                    <h3>Info</h3>
                                    <p>צפייה בפרטים האישיים שלך.</p>
                                    <Link to={`/users/${user.id}/home/info`}>מעבר למידע</Link>
                                </div>
                                <div className="action-card">
                                    <h3>Todos</h3>
                                    <p>צפייה וניהול רשימת המשימות האישיות שלך.</p>
                                    <Link to={`/users/${user.id}/home/todos`}>מעבר למשימות</Link>
                                </div>
                                <div className="action-card">
                                    <h3>Posts</h3>
                                    <p>צפייה בפוסטים שלך וביצוע פעולות עליהם.</p>
                                    <Link to={`/users/${user.id}/home/posts`}>מעבר לפוסטים</Link>
                                </div>
                                <div className="action-card">
                                    <h3>Albums</h3>
                                    <p>צפייה באלבומי התמונות שלך.</p>
                                    <Link to={`/users/${user.id}/home/albums`}>מעבר לאלבומים</Link>
                                </div>
                            </div>

                            <div className="logout-row">
                                <div className="action-card action-card--logout">
                                    <h3>Logout</h3>
                                    <p>יציאה מהמערכת וחזרה לעמוד ההתחברות.</p>
                                    <button onClick={handleLogout}>התנתקות</button>
                                </div>
                            </div>
                        </>
                    )}

                    {/* הצג את התוכן הפנימי */}
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
export default Home;