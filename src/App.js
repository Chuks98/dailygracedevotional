import React, {useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header";
import './index.css';
import Home from "./components/home";
import Login from "./components/AdminLogin/AdminLogin";
import CreateDevotion from "./components/CreateDevotion/CreateDevotion";
import Display from "./components/display/Display";
import General from "./components/general/General";
import GeneralDevotion from "./components/GeneralDevotions/GeneralDevotions";
import SearchByDate from "./components/SearchByDate/SearchByDate";
import TodaysDevotion from "./components/TodaysDevotion/TodaysDevotion";
import UpdateList from "./components/UpdateList/update-list";
import UpdateDevotion from "./components/UpdateDevotion/update-devotion";
import Footer from "./components/footer";

function App() {

  return (
    <Router>
      <div>
        <Header />
        <div className="max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin-login" element={<Login />} />
            <Route path="/add-devotion" element={<CreateDevotion />} />
            <Route path="/display/:id" element={<Display />} />
            <Route path="/all-devotions" element={<General />} />
            <Route path="/general-devotion" element={<GeneralDevotion />} />
            <Route path="/find-devotion-by-date/:date" element={<SearchByDate />} />
            <Route path="/today's-devotion" element={<TodaysDevotion />} />
            <Route path="/update-list" element={<UpdateList />} />
            <Route path="/update-devotion/:id" element={<UpdateDevotion />} />
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
