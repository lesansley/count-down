/*
 * @interval number Duration of interval between repeats in ms
 * @options object has keys of either `reps` or `duration` Default {reps: 1}
 * @cb function
 * @error function
*/

function isNumber(val) {
  if(!isNaN(val)) {
    if(parseInt(val) >= 0) return parseInt(val)
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

function isFunction(func) {
  if(typeof cb === "function") {
    return true
  } else {
    return null
  }
}

function argsValidation(interval, cb, options) {
  let argsObject = {}
  try {
    if(isNumber(interval)) {
      argsObject.interval = isNumber(interval)
    } else {
      throw ("The interval argument must be a positive number")
    }
    
    const optionsValidation = isOptions(options)
    if(optionsValidation) {
      argsObject = {...argsObject, ...formatOptions()}
    } else {
      throw ("The options argument must contain either a 'reps' or 'duration' property the value of which is must be a positive number")
    }
    
    if(isFunction(cb)) {
      argsObject.cb = cb
    } else {
      throw ("The callback argument must be a function")
    }
    return argsObject
  } catch(error){
    return {error}
  }
}

function formatOptions(interval, options) {
  const newOptions = {}
  option.reps ?
  
}

function timer(interval, cb, options = {reps: 1}) {
  const validation = argsValidation(interval, cb, options)
  if (validation.error) {
    return validation.error
  }
  
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
      throw new Error(message)
    }
    cb(expected)
    expected += interval;
    setTimer = setTimeout(step, Math.max(0, interval - dt)); // take into account drift
  }

  function stopTimer() {
    clearTimeout(setTimer)
  }
}

export default timer
