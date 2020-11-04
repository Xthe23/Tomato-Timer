import React from 'react';
import moment from 'moment'

const Session = ({sessionLength, decrementSessionLengthByOneMinute, incrementSessionLengthByOneMinute}) => {

  const sessionLengthInMinutes = moment.duration(sessionLength, 's').asMinutes()
  return (
  <div className="text-center">
    <p id="session-label" className="text-center text-gray-200 bg-indigo-400 m-2">Session</p>
    <p id="session-length" className="text-lg text-white">{sessionLengthInMinutes}</p>
    <button id="session-decrement" className="bg-white-500 hover:bg-gray-600 text-white font-bold py-2 px-4 border border-blue-700 rounded m-2"onClick={decrementSessionLengthByOneMinute}>-</button>
    <button id="session-increment" className="bg-white-500 hover:bg-gray-600 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={incrementSessionLengthByOneMinute}>+</button>
    </div>);
}

export default Session;