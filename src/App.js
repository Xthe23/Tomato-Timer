import {useState} from 'react'
import {useEffect} from 'react'
import {useRef} from 'react'
import Break from "./components/Break"
import Session from "./components/Session"
import TimeLeft from './components/TimeLeft'
import Counter from './components/Counter'
import "./assets/main.css"

function App() {
  const audioElement = useRef(null);
  const [sessionLength, setSessionLength] = useState(60 * 25);
  const [breakLength, setBreakLength] = useState(300);
  const [currentSessionType, setCurrentSessionType] = useState("Session");
  const [intervalId, setIntervalId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(sessionLength);
  const [tomatoCounter, setTomtatoCounter] = useState(0)

  useEffect(() => {
    setTimeLeft(sessionLength)
  }, [sessionLength])


  //listen to timeleft changes
  useEffect(() => {
    // if it is zero
    if(timeLeft === 0) {
      // play the audio
      audioElement.current.play()
      // change session to break or break to session
      if(currentSessionType === "Session") {
        setTomtatoCounter(tomatoCounter + 1)
        setCurrentSessionType("Break")
        setTimeLeft(breakLength)
      } else if (currentSessionType === "Break") {
        setCurrentSessionType("Session")
        setTimeLeft(sessionLength)
      }
    }
  }, [ breakLength,currentSessionType, sessionLength, timeLeft, tomatoCounter])
 
  const decrementBreakLengthByOneMinute = () => {
    const newBreakLength =  breakLength - 60
    if (newBreakLength > 0) {
      setBreakLength(newBreakLength)
    }
  }

  const incrementBreakLengthByOneMinute = () => {
    const newBreakLength = breakLength + 60
    if(newBreakLength <= 60*60){
      setBreakLength(newBreakLength)
    }
  };

  const decrementSessionLengthByOneMinute = () => {
    const newSessionLength =  sessionLength - 60

    if(newSessionLength < 0) {
      setSessionLength(0)
    } else {setSessionLength(newSessionLength)}
  };

  const incrementSessionLengthByOneMinute = () => {
    const newSessionLength = sessionLength + 60
    if (newSessionLength <= 60*60){
      setSessionLength(sessionLength + 60)
    }
  };

  const isStarted = intervalId != null
  const handleStartStopClick = () => {
    if(isStarted) {
      // if we are in started mode:
      // we want to stop the timer
      // clearInterval
      clearInterval(intervalId)
      setIntervalId(null)
    }
    else {
      // if we are in stopped mode:
      // decrement TimeLeft by one every second (1s = 1000 ms)
      const newIntervalId = setInterval(() => {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1)

      }, 100);
      setIntervalId(newIntervalId);
    }
  };

  const handleResetButtonClick = () => {
    //reset audio
    audioElement.current.load()
    // clear the timeout interval
    clearInterval(intervalId)
    // set the intervalId to null
    setIntervalId(null)
    // set the sessiontype to 'Session'
    setCurrentSessionType("Session")
    // reset sessionLength to 25 minutes
    setSessionLength(60 * 25)
    // reset break length to 5 minutes
    setBreakLength(60 * 5)
    // reset the timer to 25 minutes (initial session length)
    setTimeLeft(60 * 25)
  }

  
  return (
    <div className="flex flex-col h-screen items-center justify-center bg-indigo-900">
      <div className="flex flex-row">
      <Break
      breakLength={breakLength}
      decrementBreakLengthByOneMinute={decrementBreakLengthByOneMinute}
      incrementBreakLengthByOneMinute={incrementBreakLengthByOneMinute}
      ></Break>
      <TimeLeft
      timerLabel={currentSessionType}
      handleStartStopClick={handleStartStopClick}
      startStopButtonLabel={isStarted? "Stop" : "Start"}
      timeLeft={timeLeft}
      />
      <Session
      sessionLength={sessionLength}
      decrementSessionLengthByOneMinute={decrementSessionLengthByOneMinute}
      incrementSessionLengthByOneMinute={incrementSessionLengthByOneMinute}
      ></Session>
      <Counter 
      tomatoCounter={tomatoCounter}
      ></Counter>
      <audio id="beep" ref={audioElement}>
        <source src="https://onlineclock.net/audio/options/default.mp3" type="audio/mpeg"/>
      </audio>
      </div>
      <button id="reset" className="bg-white-500 hover:bg-gray-600 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={handleResetButtonClick}>Reset</button>
    </div>
  );
}

export default App;
