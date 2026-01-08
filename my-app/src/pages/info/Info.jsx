import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../api/InfoAPI";
import "./Info.css";

function Info() {
    
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        setLoading(true);
        setError("");

        const data = await getUserById(userId);
        setUserInfo(data);  //שומרים את המידע מהשרת בסטייט
      } catch (e) {
        setError("שגיאה בטעינת פרטי המשתמש");
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [userId]);

  if (loading) return <p className="info-status">טוען מידע...</p>;
  if (error) return <p className="info-error">{error}</p>;
  if (!userInfo) return null;

  return (
    <div className="info-container">
      <h2>מידע אישי</h2>

      <div className="info-grid">
        <div className="info-item">
          <span className="info-label">שם מלא:</span>
          <span className="info-value">{userInfo.name}</span>
        </div>

        <div className="info-item">
          <span className="info-label">שם משתמש:</span>
          <span className="info-value">{userInfo.username}</span>
        </div>

        <div className="info-item">
          <span className="info-label">אימייל:</span>
          <span className="info-value">{userInfo.email}</span>
        </div>

        <div className="info-item">
          <span className="info-label">טלפון:</span>
          <span className="info-value">{userInfo.phone}</span>
        </div>

        <div className="info-item">
          <span className="info-label">אתר:</span>
          <span className="info-value">{userInfo.website}</span>
        </div>

        <div className="info-item">
          <span className="info-label">כתובת:</span>
          <span className="info-value">
            {userInfo.address?.street}, {userInfo.address?.suite}, {userInfo.address?.city}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Info;

