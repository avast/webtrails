

export function trendCounter (result = {}, data = {}, options = {}) {

    options = Object.assign({
      timestamp : 'timestamp',
      date : null,
    }, options);

    let date = (options.date) ? data[options.date] : new Date(data[options.timestamp]);

    if (!result.frequencyByHour) result.frequencyByHour = Array.apply(null, Array(24)).map(()=> 0);
    if (!result.frequencyByWeekday) result.frequencyByWeekday = Array.apply(null, Array(7)).map(()=> 0);
    if (!result.frequencyByMonth) result.frequencyByMonth = Array.apply(null, Array(12)).map(()=> 0);
    if (!result.frequencyByDay) result.frequencyByDay = {};
    if (!result.from) result.from = data[options.timestamp]

  	result.frequencyByHour[date.getHours()]++;
  	result.frequencyByWeekday[date.getDay()]++;
  	result.frequencyByMonth[date.getMonth()]++;

    // stack daily sampes
    function roundDate(timeStamp){
      timeStamp -= timeStamp % (24 * 60 * 60 * 1000);//subtract amount of time since midnight
      timeStamp += new Date().getTimezoneOffset() * 60 * 1000;//add on the timezone offset
      return new Date(timeStamp);
    }

    let dateid = roundDate(date.valueOf()).valueOf();

    if(!result.frequencyByDay[dateid]){
      result.frequencyByDay[dateid] = 0;
    }
    result.frequencyByDay[dateid]++;

    // calculate start and end of sample;
  	result.from = Math.min(result.from, data[options.timestamp]);
  	result.to = Math.max(result.to, data[options.timestamp]);

  return result;
}
