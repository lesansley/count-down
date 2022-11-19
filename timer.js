/*
 * @interval number Duration of interval between repeats in ms
 * @options object has keys of either `reps` or `duration` Default {reps: 1}
 * @cb function
 * @error function
*/

function isNumber(val) {
  if(!isNaN(val)) {
    return parseInt(val)
  } else {
    return null
  }
}

function isOptions(options) {
  if(options.hasOwnProperty("reps")) {
    return {reps: options.reps}            
  } else if(options.hasOwnProperty("duration")) {
    return {duration: options.duration}            
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
      throw ("The interval argument is not a number")
    }
    
    const optionsValidation = isOptions(options)
    if(optionsValidation) {
      argsObject = {...argsObject, ...optionsValidation}
    } else {
      throw ("The options argument should contain either a 'reps' or 'duration' property")
    }
    // Validate `options`
    if(typeof cb === "function") {
      argsObject.cb = cb
    } else {
      throw ("The callback argument should be a function")
    }
    return argsObject
  } catch(error){
    return {error}
  }
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
      throw new Error({message})
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
