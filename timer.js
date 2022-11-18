/*
 * @interval number Duration of interval between repeats in ms
 * @options object has keys of either `reps` or `duration` Default {reps: 1}
 * @cb function
 * @error function
*/

function isNumber(val) {

}

function argsValidation(interval, options, cb, error) {
  let argsObject = {}
  // Validate `interval`
  if(!isNAN(interval)) {
    
  } else {
    
  }
  // Validate `options`
  
  // Validate `cb`
  
  // Validate `error`
  
  return
}

function timer(interval, options = {reps: 1}, cb, error) {
  // Validate the arguments. If `false` then return an error.
  if (!argsValidation(interval, options, cb, error)) { 
    const message = "Incorrect arguments. Require (interval, options, cb, [error])"
    error ? return error({message}) : return console.error(message)
  }
  if(interval && duration && cb) {
    const start = Date.now();
    const end = start + duration
    let expected = start + interval;
    let setTimer = setTimeout(step, interval);

    function step() {
      if(Date.now() > end) {
        stopTimer()
        return null
      }
        const dt = Date.now() - expected; // the drift (positive for overshooting)
        if (dt > interval) {
          const message = "Exiting timer to avoid possible futile catchup."
          stopTimer()
          error ? return error({message}) : return console.error(message)
        }
        cb(expected)
        expected += interval;
        setTimer = setTimeout(step, Math.max(0, interval - dt)); // take into account drift
    }

    function stopTimer() {
     clearTimeout(setTimer)
    }
  }
  return
}

export default timer
