const drawForm = config=> {
  let template = `
    <form action="/" method="POST">
      <div class="button-cont">
        <button class="today">Today</button>
        <button class="reset">Reset</button>
      </div>

      <div class="name">
        <label for="title">Title</label>
        <input class="name" name="title" type="text"></input>
      </div>

      <div class="date">
      Date
        <input name="month" class="month" type="number"></input>
        <input name="day" class="day" type="number"></input>
        <input name="year" class="year" type="number"></input>
      </div>

      <div class="time">
      Time
        <input name="hour" class="hour" type="number"></input>
        <input name="minute" class="minute" type="number"></input>
        <input name="second" class="second" type="number"></input>
        <select name="ampm">
          <option value="am">am</option>
          <option value="pm">pm</option>
        </select>
      </div>

      <div class="options">
        <input name="weekedays" type="checkbox" checked>Weekdays</input>
        <input name="weekends" type="checkbox" checked>Weekends</input>
      </div>

      <input type="submit" value="Gimme a timer!"></input>
    </form>
  `;

  // html inputs are sucky!!!

  let $html = $(template),
    $button = $html.find('button'),
    $today = $html.find('.today'),
    $reset = $html.find('.reset');

  $button.on('click', function(e) {
    e.preventDefault();
  })

  $today.on('click', function(e) {
    let today = new Date();
    $html.find('.year').val(today.getFullYear());
    $html.find('.month').val(today.getMonth());
    $html.find('.day').val(today.getDate());
    $html.find('.hour').val(today.getHours() % 12);
    $html.find('.minute').val(today.getMinutes());
    $html.find('.second').val(today.getSeconds());
    $html.find('select').val(today.getHours() >= 12 ? 'pm' : 'am');
  });

  // $html.find('.name').on('keyup', function(e) {
  //   $html.find('.url').val($(this).val());
  // })

  $reset.on('click', function(e) {
    $html.find('input[type!=submit]').val("");
    $html.find('select').val('am');
  })

  $(config.parent).append($html);
}

drawForm({
  parent: '.input'
})
