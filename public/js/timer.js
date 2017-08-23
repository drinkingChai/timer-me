const calcDiff = (t1, t2)=> {
  // let now = new Date(),
  //   expire = new Date(data.expire),
  let diff = Math.floor((t2 - t1) / 1000),
    seconds = diff % 60,
    minutes = Math.floor(diff / 60) % 60,
    hours = Math.floor(diff / 60 / 60) % 60,
    days = Math.floor(diff / 60 / 60 / 24) % 7,
    weeks = Math.floor(diff / 60 / 60 / 24 / 7);

  return {
    seconds,
    minutes,
    hours,
    days,
    weeks
  }
}

const drawTimer = config=> {
  /*
    parent
    timer fields
      - days, months, years
      - hours, minutes, seconds
  */
  let template = `
    <div></div>
  `;

  let $html = $(template);
  $(config.parent).append($html);

  const updateTime = ()=> {
    setTimeout(function() {
      let diff = calcDiff(new Date(), config.to);
      $html.empty();
      drawCountDown({ parent: $html, value: diff.seconds });
      drawCountDown({ parent: $html, value: diff.minutes });
      drawCountDown({ parent: $html, value: diff.hours });
      drawCountDown({ parent: $html, value: diff.days });
      drawCountDown({ parent: $html, value: diff.weeks });
      updateTime();
    }, 1000);
  }

  updateTime();
}

const drawCountDown = config=> {
  /*
    parent
    value
  */
  let template = `
    <span>${config.value}</span>
  `;

  let $html = $(template);
  $(config.parent).append($html);
}


// making a second call with ajax D:
$.getJSON(`/json/${$('timer').data().url}`, data=> {
  // draw timer
  let now = new Date(),
    expire = new Date(data.expire),
    diff = Math.floor((expire - now) / 1000),
    seconds = diff % 60,
    minutes = Math.floor(diff / 60) % 60,
    hours = Math.floor(diff / 60 / 60) % 24,
    days = Math.floor(diff / 60 / 60 / 24) % 7,
    weeks = Math.floor(diff / 60 / 60 / 24 / 7);

  // console.log(seconds, minutes, hours, days, weeks);

  drawTimer({
    parent: '#timer',
    to: new Date(data.expire)
  })
})
