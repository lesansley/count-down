TODO: Add a delay argument to start the timer in the future
TODO: Add a cancel functionality
/*
 * @interval number Positive integer. Duration of interval between repeats in ms
 * @cb function Calls the funcitn passing in an object. Either {interval: integer} or {error: text}
 * @options object has keys of either `reps` or `duration` Default {reps: 1}
*/
unction isNumber(val) {
  if(!isNaN(val)) {
    if(parseInt(val) > 0) return parseInt(val)
    return null
  } else {
    return null
  }
}

function isOptions(options) {
  if(typeof options !== "object") return null
  if(options.hasOwnProperty("reps")) {
    if(isNumber(options.reps)) return {reps: isNumber(options.reps)}
    return null
  } else if(options.hasOwnProperty("duration")) {
    if(isNumber(options.duration)) return {reps: isNumber(options.duration)}
    return null            
  } else {
    return null
  }
}

function getReps(interval, options) {
  if (options.reps) return options.reps
  if (options.duration) return options.duration/interval
  else return null
}

function isFunction(cb) {
  const func = cb
  if(typeof func === "function") {
    return true
  } else {
    return null
  }
}

function argsValidation(interval, cb, options) {
  let argsObject = {}
  try {
    const validInterval = isNumber(interval)
    if(validInterval) {
      argsObject.interval = validInterval
    } else {
      throw ("The interval argument must be a positive integer")
    }
    
    const validOptions = isOptions(options)
    if(validOptions) {
      argsObject = {...argsObject, reps: getReps(interval, options)}
    } else {
      throw ("The options argument must contain either a 'reps' or 'duration' property the value of which must be a positive integer")
    }
    
    if(isFunction(cb)) {
      argsObject.cb = cb
    } else {
      throw ("The callback argument must be a function")
    }
    return argsObject
  } catch(error){
    console.error({error})
    return {error}
  }
}

function timer(interval, cb, options = {reps: 1}) {
  try {
      const timerOptions = argsValidation(interval, cb, options)
    if (timerOptions.error) {
      return timerOptions.error
    }

    const reps = Math.floor(timerOptions.reps)
    let start = Date.now()
    const duration = interval * (reps + 1);

    cb({timeStamp: start, cancel: cancelInterval})
    
    let expected = start + interval
    setTimeout(step, interval);
    
    function step() {
      if(Date.now() > start + duration) {
        stopTimer()
        return null
      }
      const dt = Date.now() - expected; // the drift (positive for overshooting)
      if (dt > interval) {
        stopTimer(name)
        throw ("Exiting timer to avoid possible futile catchup.")
      }
      cb({timeStamp: start, cancel: cancelInterval})
      expected += interval;
      setTimeout(step, Math.max(0, interval - dt)); // take into account drift
    }

    function stopTimer() {
      clearTimeout()
    }
    
    function cancelInterval() {
      start = 0
    }
    
  } catch(error){
    const errorMessage = Object.keys(error).length !== 0 ? error: `Unknown error. Timer has aborted.`
    console.error({error: errorMessage})
    return {error: errorMessage}
  }
}

export default timer
