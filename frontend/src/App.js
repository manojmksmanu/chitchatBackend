import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import Chats from "./Pages/Chats";
import Loader from "./component/LoaderForApp/Loader";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App overflow-hidden">
      {isLoading ? (
        // <Loader />
       <Loader/>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chats" element={<Chats />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
