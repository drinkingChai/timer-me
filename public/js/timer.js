const calcDiff = (t1, t2, wkds, wknds, count)=> {
  let diff = Math.floor((t2 - t1) / 1000),
    df = Math.floor(diff / 60 / 60 / 24) % 7;

  diff = wkds ? diff : diff - count.weekdays * 24 * 60 * 60;
  diff = wknds ? diff : diff - count.weekends * 24 * 60 * 60;

  let seconds = diff % 60,
    minutes = Math.floor(diff / 60) % 60,
    hours = Math.floor(diff / 60 / 60) % 24,
    days = Math.floor(diff / 60 / 60 / 24) % 7,
    weeks = Math.floor(diff / 60 / 60 / 24 / 7),
    totaldays = Math.floor(diff / 60 / 60 / 24);

  return {
    seconds,
    minutes,
    hours,
    days,
    weeks,
    totaldays
  }
}

const calcDays = (t1, t2)=> {
  let weekdays = 0,
    weekends = 0;
  if (t2 > t1) {
    let ct2 = t2,
      ct1 = t1;

    ct1.setDate(ct1.getDate() + 1)

    while(ct2 > ct1) {
      let day = ct1.getDay();
      if (day == 0 || day == 6) weekends += 1;
      else weekdays += 1;
      ct1.setDate(ct1.getDate() + 1);
    }
  }

  return { weekdays, weekends }
}

const drawTimer = config=> {
  /*
    parent
    timer fields
      - days, months, years
      - hours, minutes, seconds
  */
  let template = `
    <div>
      <div>Timer to: ${config.to}</div>
      <section></section>
    </div>
  `;

  let $html = $(template);

  if (!config.weekends) {
    $html.append(`
      <div>Without weekends</div>
    `);
  }

  if (!config.weekdays) {
    $html.append(`
      <div class='weekdays'>Without weekdays</div>
    `);
  }

  let $section = $html.find('section');

  const updateTime = ()=> {
    setTimeout(function() {
      let now = new Date();
      let diff = calcDiff(now, config.to, config.weekdays, config.weekends, config.weekdayCount);
      $section.empty();
      drawCountDown( $section, 'seconds', diff.seconds);
      drawCountDown($section, 'minutes', diff.minutes);
      drawCountDown($section, 'hours', diff.hours);
      drawCountDown($section, 'days', diff.days);
      drawCountDown($section, 'weeks', diff.weeks);
      if (!config.weekends || !config.weekdays) drawCountDown($section, 'total days', diff.totaldays);
      updateTime();
    }, 1000);
  }

  updateTime();
  $(config.parent).append($html);
}

const drawCountDown = (parent, label, value)=> {
  /*
    parent
    value
  */
  let template = `
    <div>
      <span>${label}</span>
      <span>${value}</span>
    </div>
  `;

  let $html = $(template);
  $(parent).append($html);
}


// making a second call with ajax D:
$.getJSON(`/json/${$('timer').data().url}`, data=> {
  // draw timer
  let now = new Date(),
    weekdayCount = calcDays(now, new Date(data.expire));

  drawTimer({
    parent: '#timer',
    to: new Date(data.expire),
    weekdays: data.weekdays,
    weekends: false,
    weekdayCount
  })
})
