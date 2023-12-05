import React from "react";
// import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
// import {AcmeLogo} from "./AcmeLogo.jsx";

import { useState, useEffect } from "react";
// import {NextUIProvider} from "@nextui-org/react";

import "./App.css";
function App() {
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState("Initial advice");

  const [history, setHistory] = useState([]);

  useEffect(() => {
    console.log("de cate ori sunt folosit ", advice);
  }, [advice]);

  async function getAdvice() {
    setLoading(true);
    try {
      const timeStamp = Date.now();
      const res = await fetch("https://api.adviceslip.com/advice?" + timeStamp);
      const data = await res.json();
      setAdvice(data.slip.advice);
      const currentHistory = [...history];
      currentHistory.push(data.slip.advice);
      setHistory(currentHistory);
    } catch (error) {
      console.error("Eroare prinsa de cristi", error);

      setAdvice(error.message);
    }
    setLoading(false);
  }
  return (
    <div>
      <h1 className="header">Welcome to advices</h1>

      <button
        type="button"
        className="btn btn-success button-advice"
        onClick={getAdvice}
        disabled={loading}
      >
        Get advice
      </button>
      {history.map((text) => (
        <div key={text}>{text}</div>
      ))}
      <h3 className="text-center">{advice}</h3>
    </div>
  );
}

export default App;
