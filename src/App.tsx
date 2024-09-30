import { Routes, Route } from "react-router-dom";
import Nav from "./presentation/components/Nav";
import MusicScreen from "./presentation/screens/MusicScreen";
import ReviewsScreen from "./presentation/screens/ReviewsScreen";
import ListsScreen from "./presentation/screens/ListsScreen";
import ProfileScreen from "./presentation/screens/ProfileScreen";

const App = () => {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<MusicScreen />} />
        <Route path="/reviews" element={<ReviewsScreen />} />
        <Route path="/lists" element={<ListsScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Routes>
    </>
  );
};

export default App;
