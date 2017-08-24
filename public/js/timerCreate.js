// making a second call with ajax D:
$.getJSON(`/json/${$('timer').data().url}`, data=> {
  // draw timer
  let now = new Date(),
    weekdayCount = calcDays(now, new Date(data.expire));

  drawTimer({
    parent: '#timer',
    to: new Date(data.expire),
    weekdays: data.weekdays,
    weekends: data.weekends,
    weekdayCount
  })
})