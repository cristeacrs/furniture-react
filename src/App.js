import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
    <Container fluid="lg">
      <Row>
        <Col>
          <h1 className="header">Welcome to advices</h1>
          <h3 className="text-center">{advice}</h3>
          <Button variant="primary" onClick={getAdvice} disabled={loading}>
            Get advice
          </Button>
          <div>
            <h1 className="text-3xl font-bold underline  hover:bg-sky-700">
              History!
            </h1>
            {history.map((text) => (
              <div key={text}>{text}</div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
