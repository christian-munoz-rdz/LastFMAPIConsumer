import { useCallback, useState, useEffect } from "react";

import { Routes, Route, useNavigate } from "react-router-dom";

import { AuthContext } from "./context/auth-context";
import Nav from "./components/NavBar/Nav";
import MusicScreen from "./views/MusicScreen";
import ReviewsScreen from "./views/ReviewsScreen";
import ListsScreen from "./views/ListsScreen";
import ProfileScreen from "./views/ProfileScreen";
import TrackPage from "./views/TrackPage";
import LoginScreen from "./views/LoginScreen";
import SearchResultsScreen from "./views/SearchResultsScreen"; 

const App = () => {
  
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });


  const [userId, setUserId] = useState<number | null>(() => {
    const storedUserId = localStorage.getItem("userId");
    return storedUserId ? parseInt(storedUserId, 10) : null;
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", String(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    if (userId !== null) {
      localStorage.setItem("userId", String(userId));
    } else {
      localStorage.removeItem("userId");
    }
  }, [userId]);

  const handleUser = useCallback((userId: number) => {
    setUserId(userId);
  }, []);

  const login = useCallback(() => {
    setIsLoggedIn(true);
    navigate("/music");
  }, [navigate]);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
    navigate("/");
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        login: login,
        logout: logout,
        currentUser: userId,
        handleUser: handleUser,
      }}
    >
      {isLoggedIn && <Nav />}
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/music" element={<MusicScreen />} />
        <Route path="/reviews" element={<ReviewsScreen />} />
        <Route path="/lists" element={<ListsScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/:artist/:track" element={<TrackPage />} />
        <Route path="/search" element={<SearchResultsScreen />} />
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
