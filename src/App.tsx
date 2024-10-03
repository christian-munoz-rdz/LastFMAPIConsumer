import { Routes, Route } from "react-router-dom";
import Nav from "./presentation/components/NavBar/Nav";
import MusicScreen from "./presentation/screens/MusicScreen";
import ReviewsScreen from "./presentation/screens/ReviewsScreen";
import ListsScreen from "./presentation/screens/ListsScreen";
import ProfileScreen from "./presentation/screens/ProfileScreen";
import TrackPage from "./presentation/screens/TrackPage";
import LoginScreen from "./presentation/screens/auth/LoginScreen";

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<MusicScreen />} />
        <Route path="/log-in" element={<LoginScreen/>} />
        <Route path="/reviews" element={<ReviewsScreen />} />
        <Route path="/lists" element={<ListsScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/:artist/:track" element={<TrackPage/>} />
      </Routes>
    </>
  );
};

export default App;
