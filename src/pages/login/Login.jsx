import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  const handleLogin = async(e) => {
    e.preventDefault();

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCred) => {
        const user = userCred.user;
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            userID: user.uid,
            token: user.accessToken,
          })
        );
        setCurrentUser(user.uid);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        setError(true);
        // ..
      });
  };

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("user")) || null);
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    dispatch(
      setUser({
        email: currentUser?.email,
        userID: currentUser?.uid,
        token: currentUser?.accessToken,
      })
    );
  }, [currentUser]);

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="email"
          name={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          name={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <span>Wrong Email or password</span>}
      </form>
    </div>
  );
};

export default Login;
