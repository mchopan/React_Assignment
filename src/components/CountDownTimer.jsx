import React, { useState, useRef } from 'react';

const CountDownTimer = () => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const intervalRef = useRef(null);

    const handleTimeChange = (e) => {
        setTime(parseInt(e.target.value, 10));
    };

    const startTimer = () => {
        if (time > 0 && !running) {
            setRunning(true);
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        }
    };

    const stopTimer = () => {
        setRunning(false);
        clearInterval(intervalRef.current);
    };

    React.useEffect(() => {
        if (time === 0) {
            stopTimer();
        }
    }, [time]);

    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    let hours = Math.floor(minutes / 60);
    minutes %= 60;

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
            }}
        >
            {`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
            <input
                placeholder="Enter Time In Minutes"
                type="number"
                value={time}
                onChange={(e) => handleTimeChange(e)}
                disabled={running}
            />
            <button onClick={startTimer} disabled={running}>
                Start Counter
            </button>
            <button onClick={stopTimer} disabled={!running}>
                Stop Counter
            </button>
        </div>
    );
};

export default CountDownTimer;
