import React, {useState, useEffect} from "react";
// import { Bars3Icon } from "@heroicons/react/24/solid";
import {Link} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaBell } from 'react-icons/fa';
import NavLinks from "./navlinks";
import SearchBox from "./searchbox";  

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jiggle, setJiggle] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('AdminDevotion');
    if (user) {
      setIsLoggedIn(true);
    }
  
    // Show a sample notification after 5 seconds
    const notificationTimeout = setTimeout(() => {
      toggleNotification();
    }, 5000);
  
    // Jiggle the bell icon every 2 seconds
    const jiggleInterval = setInterval(() => {
      setJiggle(true);
  
      setTimeout(() => {
        setJiggle(false);
      }, 500); // Jiggle for 0.5 seconds
  
    }, 2000); // Repeat every 2 seconds
  
    // Clear the notification timeout and the jiggle interval on component unmount
    return () => {
      clearTimeout(notificationTimeout);
      clearInterval(jiggleInterval);
    };
  }, []);
  

  const notify = () => {
    toast.info(
      <div>
        <img src="/images/youtube-icon.png" alt="YouTube Icon" style={{ width: "30px", height: "30px", marginRight: "5px" }}/>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: "#E99C5E", fontSize: '13px' }}>
          Click here to watch YouTube video.
        </a>
      </div>,
      {
        position: 'top-right',
        autoClose: false, // Or set to 10000 (10 secs)
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  const toggleNotification = () => {
    if (isNotificationOpen) {
      toast.dismiss(); // Close the notification if it's open
    } else {
      notify(); // Show the notification if it's closed
    }
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleLogout  = () => {
    setLoading(true);
    localStorage.removeItem('AdminDevotion');
    window.location.reload();
  };

  return (
    <header>
      <ToastContainer position="top-right" />
      <div className="grid grid-cols-3 p-10 items-center">
        <div style={{width: '100px', height: '100px'}}>
          <img style={{width: '100%', height: '100%'}} src="/images/logo.jpeg"/>
        </div>
        <Link style={{width: '100%'}} href="/" prefetch={false}>
          <p id="main-text" style={{fontFamily: 'arial', fontWeight: 'bold'}} className="font-serif text-4xl text-center">Daily Grace Devotional</p>
          <p id="sub-text">Meeting God Every Morning.</p>
        </Link>

        <div className="flex items-center flex-wrap justify-end space-x-2 ml-20">
          <div className="w-10 h-10 bg-E99C5E button flex items-center justify-center rounded-full cursor-pointer" onClick={toggleNotification}>
            <FaBell className={`text-white ${jiggle ? 'jiggle' : ''}`} />
          </div>
          {/* <DarkModeButton /> */}
          {!isLoggedIn &&
            (!loading && <a onClick={() => setLoading(true)} href="/adminLogin" style={{lineHeight: '40px', padding: '0px 15px'}} className="md:inline button">
              Login
            </a>)
          }
          {loading && <p>Loading...</p>}

          {isLoggedIn &&
            (!loading && <a style={{lineHeight: '40px', padding: '0px 15px'}} className="md:inline button" onClick={handleLogout}>
              Logout
            </a>)
          }
          
          
        </div>
      </div>
      <NavLinks />
      <SearchBox />
    </header>
  );
}

export default Header;
