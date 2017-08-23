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
    days = Math.floor(diff / 60 / 60 / 24);

  console.log(expire.getDate());
  console.log(seconds, minutes, hours, days);
})
