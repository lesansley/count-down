/*
 * @interval number Duration of interval between repeats in ms
 * @duration number Duration of entire event in ms
 * @cb function
 * @error function
*/

//TODO: Accept a reps argument
//TODO: Improve validation of arguments passed in
export function timer(interval, duration, cb, error) {
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
