import { useCallback, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Nav from "./presentation/components/NavBar/Nav";
import MusicScreen from "./presentation/screens/MusicScreen";
import ReviewsScreen from "./presentation/screens/ReviewsScreen";
import ListsScreen from "./presentation/screens/ListsScreen";
import ProfileScreen from "./presentation/screens/ProfileScreen";
import TrackPage from "./presentation/screens/TrackPage";
import LoginScreen from "./presentation/screens/auth/LoginScreen";
import { AuthContext } from "./context/auth-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState<number | null>(null);

  const handleUser = useCallback((userId: number) => {
    setUserId(userId);
  }, []);

  const login = useCallback(() => {
    setIsLoggedIn(true);
    navigate("/music");
  }, [navigate]);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
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
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
