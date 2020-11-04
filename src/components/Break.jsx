import React from 'react';
import moment from 'moment'

const Break = ({breakLength, decrementBreakLengthByOneMinute, incrementBreakLengthByOneMinute}) => {

  const breakLengthInMinutes = moment.duration(breakLength, 's').minutes()
  return (
  <div className="text-center">
    <p id="break-label" className="text-center text-gray-200 bg-indigo-400 m-2">Break</p>
    <p id="break-length" className="text-lg text-white">{breakLengthInMinutes}</p>
    <button id="break-decrement" className="bg-white-500 hover:bg-gray-600 text-white font-bold py-2 px-4 border border-blue-700 rounded m-2" onClick={decrementBreakLengthByOneMinute}>-</button>
    <button id="break-increment" className="bg-white-500 hover:bg-gray-600 text-white font-bold py-2 px-4 border border-blue-700 rounded" onClick={incrementBreakLengthByOneMinute}>+</button>
    </div>);
}

export default Break;