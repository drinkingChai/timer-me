const drawTimerForm = config=> {
  let template = `
    <form action="/" method="POST">
      <div class="name">
        <label for="title">Title</label>
        <input name="title" type="text" placeholder="My awesome timer"></input>
      </div>

      <div class="date">
      Date
      </div>

      <div class="time">
      Time
      </div>

      <div class="options">
        Includes
        <input name="weekdays" type="checkbox" checked>Weekdays</input>
        <input name="weekends" type="checkbox" checked>Weekends</input>
      </div>

      <div class="error"></div>

      <input type="submit" value="Gimme a timer!"></input>
    </form>
  `;

  // html inputs are sucky!!!
  // separate dumb inputs
  // options to view
  // defaults date only

  let $html = $(template),
    now = new Date();

  let $date = $html.find('.date'),
    $time = $html.find('.time'),
    $options = $html.find('.options');

  // ^([1-9]|0[1-9]|[1-2][0-2])\/([1-9]|0[1-9]|1[0-9]|2[0-9]|3[0-1])\/([1-9]{2}|[1-9]{3}|[1-9]{4})$ date
  // ^([1-9]|0[1-9]|1[0-2]):([0-9]|[0-5][0-9])(:([0-5][0-9]|[0-9]))?$ time

  drawRegExInput({
    parent: $date,
    name: 'date',
    regex: /^([1-9]|0[1-9]|[1-2][0-2])\/([1-9]|0[1-9]|1[0-9]|2[0-9]|3[0-1])\/([1-9]{2}|[1-9]{3}|[1-9]{4})$/g,
    placeholder: '12/10/1815'
  })

  drawRegExInput({
    parent: $time,
    name: 'time',
    regex: /^([1-9]|0[1-9]|1[0-2]):([0-9]|[0-5][0-9])(:([0-5][0-9]|[0-9]))?$/g,
    placeholder: '04:08:15'
  })

  drawOption({
    parent: $time,
    name: 'ampm',
    options: [{ name: 'AM', value: 'am' }, { name: 'PM', value: 'pm' }],
  })

  $(config.parent).append($html);
}

const drawRegExInput = config=> {
  /*
    parent
    regex
    draws an input
    draws a verification text underneath
  */
  let template = `
    <div>
      <input type="text" name="${config.name}" placeholder=${config.placeholder}></input>
      <div></div>
    </div>
  `;

  let $html = $(template),
    $input = $html.find('input'),
    $error = $html.find('div');

  $html.on('keyup', 'input', function() {
    if (!$input.val().match(config.regex)) $error.html('Invalid format!');
    else $error.html('');
  })

  $(config.parent).append($html);
}

const drawOption = config=> {
  /*
    parent
    name
    options { value, text }
    default
  */
  let template = `
    <select name="${config.name}"></select>
  `;

  let $html = $(template);
  config.options.forEach(option=> {
    $html.append($(`
      <option value=${option.value}>${option.name}</option>
    `))
  })

  $(config.parent).append($html);
}
