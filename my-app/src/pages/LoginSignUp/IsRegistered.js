async function IsRegistered(username, password) {
  try {
    const response = await fetch("http://localhost:3001/users");
    const users = await response.json();

    const foundUser = users.find(
      (user) =>
        user.username === username &&
        user.website === password
    );

    return foundUser || null;

  } catch (error) {
    console.error("Error checking user:", error);
    return null;
  }
}

export default IsRegistered;
