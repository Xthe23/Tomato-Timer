import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(moment)

const TimeLeft = ({ timerLabel , handleStartStopClick, startStopButtonLabel, timeLeft}) => {

  // change timeLeft whenever sessionLength changes



  const formattedTimeLeft = moment.duration(timeLeft, 's').format('mm:ss', {trim: false})
  return(<div>
  <p id="timer-label" className="text-center text-gray-200 bg-indigo-400 m-2 text-lg">{timerLabel}</p>
    <p id="time-left" className="text-orange-600 text-center text-xl">
    {formattedTimeLeft}
    </p>
  <button id="start_stop" className="mr-5 ml-5 mt-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow m-2" onClick={handleStartStopClick}>{startStopButtonLabel}</button>
  </div>)
}

export default TimeLeft;