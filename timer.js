/*
 * @interval number Duration of interval between repeats in ms
 * @options object has keys of either `reps` or `duration` Default {reps: 1}
 * @cb function
 * @error function
*/

function isNumber(val) {
  if(!isNAN(val)) {
    return parseInt(val)
  } else {
    return null
  }
}

function isOptions(opt) {
  if(opt.hasOwnProperty("reps")) {
    return {reps: opt.reps}            
  } else if(opt.hasOwnProperty("duration")) {
    return {duration: opt.duration}            
  } else {
    return null
  }
}

function argsValidation(interval, options, cb, error) {
  let argsObject = {}
  // Validate `interval`
  if(!isNumber(interval)) {
    argsObject.interval = isNumber(interval)
  } else {
    throw new Error("The interval parameter is not a number")
  }
  // Validate options
  if(!isOptions(obj)) {
    argsObject.interval = isNumber(interval)
  } else {
    throw new Error("The options parameter should contain either a `reps` or `duration` property")
  }
  // Validate `options`
  
  // Validate `cb`
   argsObject.cb = typeof cb === "function" ? cb : null
  // Validate `error`
  argsObject.cb = typeof cb === "function" ? cb : null
  return argsObject
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
