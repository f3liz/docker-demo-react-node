import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';

function App() {

  const [message, setMessage] = useState("");

  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await fetch("http://localhost:3000/test");
        const data = await res.json();
        setMessage(data.message);
      } catch (error) {
        console.error("Error getting message");
        setMessage("Faield to get message");
      }
    };

    getMessage();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2>React + Node Docker Demo</h2>
        <h2>{message || "Awaiting message..."}</h2>
      </header>
    </div>
  );
}

export default App;
