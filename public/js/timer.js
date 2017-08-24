const calcDiff = (t1, t2, wkds, wknds, count)=> {
  let diff = Math.floor((t2 - t1) / 1000),
    df = Math.floor(diff / 60 / 60 / 24) % 7;

  diff = wkds ? diff : diff - count.weekdays * 24 * 60 * 60;
  diff = wknds ? diff : diff - count.weekends * 24 * 60 * 60;

  let seconds = diff % 60,
    minutes = Math.floor(diff / 60) % 60,
    hours = Math.floor(diff / 60 / 60) % 24,
    days = Math.floor(diff / 60 / 60 / 24) % 7,
    weeks = Math.floor(diff / 60 / 60 / 24 / 7) % 4,
    months = Math.floor(diff / 60 / 60 / 24 / 7 / 4),
    totaldays = Math.floor(diff / 60 / 60 / 24);

  return {
    seconds,
    minutes,
    hours,
    days,
    weeks,
    months,
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
      <h3>Timer to: ${config.to.toDateString()} @ ${config.to.toLocaleString().split(',')[1]}</h3>
      <div class='sections'>
        <section class="daysleft"></section>
        <section class="timeleft"></section>
        <section class="totaldays"></section>
      </div>
      <div class="message"></div>
    </div>
  `;

  let $html = $(template),
    $message = $html.find('.message');


  if (!config.weekends) {
    $message.append(`
      <div>Without weekends</div>
    `);
  }

  if (!config.weekdays) {
    $message.append(`
      <div>Without weekdays</div>
    `);
  }

  let $daysleft = $html.find('.daysleft'),
    $timeleft = $html.find('.timeleft'),
    $totaldays = $html.find('.totaldays'),
    $sections = $html.find('section');

  const updateTime = ()=> {
    setTimeout(function() {
      let now = new Date();
      let diff = calcDiff(now, config.to, config.weekdays, config.weekends, config.weekdayCount);
      $sections.empty();
      drawCountDown($timeleft, 'h : ', diff.hours);
      drawCountDown($timeleft, 'm : ', diff.minutes);
      drawCountDown($timeleft, 's', diff.seconds);
      drawCountDown($daysleft, 'months ', diff.months);
      drawCountDown($daysleft, 'weeks ', diff.weeks);
      drawCountDown($daysleft, 'days ', diff.days);
      if (!config.weekends || !config.weekdays) drawCountDown($totaldays, 'total days', diff.totaldays);
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
    <span>${value} ${label}</span>
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
    weekends: data.weekends,
    weekdayCount
  })
})
