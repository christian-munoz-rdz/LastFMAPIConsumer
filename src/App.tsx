import { Routes, Route } from "react-router-dom";
import Nav from "./presentation/components/NavBar/Nav";
import MusicScreen from "./presentation/screens/MusicScreen";
import ReviewsScreen from "./presentation/screens/ReviewsScreen";
import ListsScreen from "./presentation/screens/ListsScreen";
import ProfileScreen from "./presentation/screens/ProfileScreen";
import TrackPage from "./presentation/screens/TrackPage";
import LoginScreen from "./presentation/screens/auth/LoginScreen";
import { AuthContext } from "./context/auth-context";
import { useCallback, useState } from "react";

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Nav />
      <Routes>
        <Route path="/" element={<MusicScreen />} />
        <Route path="/log-in" element={<LoginScreen/>} />
        <Route path="/reviews" element={<ReviewsScreen />} />
        <Route path="/lists" element={<ListsScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/:artist/:track" element={<TrackPage/>} />
      </Routes>
      </AuthContext.Provider>
  );
};

export default App;
