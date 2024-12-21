import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Button, Input, FormGroup } from 'reactstrap';
import { FaStop } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";

const Timer = () => {
  const [duration, setDuration] = useState(5); // Default to 5 minutes
  const [customDuration, setCustomDuration] = useState('');
  const [remainingTime, setRemainingTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Countdown effect
  useEffect(() => {
    let timer;
    if (isRunning && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else if (remainingTime === 0) {
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, remainingTime]);

  const startTimer = () => {
    setRemainingTime((duration === 'custom' ? customDuration : duration) * 60);
    setIsRunning(true);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <Card className="shadow-lg p-4 text-center">
      <CardTitle tag="h4">Set Timer</CardTitle>
      <CardBody>
        <div className="d-flex justify-content-center mb-3">
          {[5,30, 60].map((min) => (
            <Button
              key={min}
              style={{ background: duration === min ? '#2c5f6e' : 'gray' }}
              onClick={() => setDuration(min)}
              className="mx-2"
            >
              {min} Min
            </Button>
          ))}
          <Button
          style={{ background: duration === 'custom' ? '#2c5f6e' : 'gray' }}
            onClick={() => setDuration('custom')}
            className="mx-2"
          >
            Custom
          </Button>
        </div>
        {duration === 'custom' && (
          <FormGroup>
            <Input
              type="number"
              placeholder="Enter minutes"
              value={customDuration}
              onChange={(e) => setCustomDuration(e.target.value)}
              className="w-50 mx-auto"
            />
          </FormGroup>
        )}
        <h2 className="mt-4 text-center">{formatTime(remainingTime)}</h2>
        <div className="mt-3">
          <Button 
          style={{ background:'#2c5f6e'}}
          className="mx-2" onClick={startTimer} disabled={isRunning}>
          <FaPlay />
          </Button>
          <Button 
          style={{ background:'#2c5f6e'}}
          className="mx-2" onClick={() => setIsRunning(false)} disabled={!isRunning}>
          <FaStop />
          </Button>
          <Button 
          style={{ background:'#2c5f6e'}}
          className="mx-2" onClick={() => setRemainingTime(0)}>
            Resatrt
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default Timer;
