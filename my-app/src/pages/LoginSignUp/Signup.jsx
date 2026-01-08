import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    website: "",
    verifyWebsite: ""
  });

  const [errors, setErrors] = useState({
    username: "",
    website: "",
    verifyWebsite: ""
  });

  const [touched, setTouched] = useState({
    username: false,
    website: false,
    verifyWebsite: false
  });

  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  }

  function validateField(name, value) {
    switch (name) {
      case "username":
        if (!value) return "יש להזין שם משתמש";
        if (value.length < 3) return "שם המשתמש חייב להיות מעל 3 תווים";
        return "";
      case "website":
        if (!value) return "יש להזין סיסמה";
        if (value.length < 4) return "הסיסמה חייבת להיות מעל 4 תווים";
        return "";
      case "verifyWebsite":
        if (!value) return "יש לאמת את הסיסמה";
        if (value !== formData.website) return "הסיסמאות אינן תואמות";
        return "";
      default:
        return "";
    }
  }

  useEffect(() => {
    const newErrors = {};
    for (const key in formData) {
      newErrors[key] = validateField(key, formData[key]);
    }
    setErrors(newErrors);
  }, [formData]);

  function validateForm() {
    let valid = true;
    for (const key in errors) {
      if (errors[key]) valid = false;
    }
    return valid;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ username: true, website: true, verifyWebsite: true });

    if (!validateForm()) return;

    const response = await fetch("http://localhost:3001/users");
    const users = await response.json();
    const existingUser = users.find(user => user.username === formData.username);

    if (existingUser) {
      alert("שם משתמש כבר קיים במערכת");
      setFormData({ username: "", website: "", verifyWebsite: "" });
      setTouched({ username: false, website: false, verifyWebsite: false });
      return;
    }

    const createResponse = await fetch("http://localhost:3001/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: formData.username, website: formData.website })
    });

    const newUser = await createResponse.json();
    navigate(`/users/${newUser.id}/userInformation`);
  }

  const getBorderColor = (field) => {
    if (!touched[field]) return "#ccc";
    return errors[field] ? "red" : "green";
  };

  return (
    <div className="login-container">
      <h2>הרשמה</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>שם משתמש</label><br />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ borderColor: getBorderColor("username") }}
          />
          {errors.username && touched.username && (
            <p className="error">{errors.username}</p>
          )}
        </div>

        <div>
          <label>סיסמה</label><br />
          <input
            type="password"
            name="website"
            value={formData.website}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ borderColor: getBorderColor("website") }}
          />
          {errors.website && touched.website && (
            <p className="error">{errors.website}</p>
          )}
        </div>

        <div>
          <label>אימות סיסמה</label><br />
          <input
            type="password"
            name="verifyWebsite"
            value={formData.verifyWebsite}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ borderColor: getBorderColor("verifyWebsite") }}
          />
          {errors.verifyWebsite && touched.verifyWebsite && (
            <p className="error">{errors.verifyWebsite}</p>
          )}
        </div>

        <button type="submit">הרשמה</button>
      </form>

      <Link to="/login">כבר רשום? התחבר</Link>
    </div>
  );
}

export default Signup;