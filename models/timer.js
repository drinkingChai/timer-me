const conn = require('./_db');

const generateUrl = (name, random = false)=> {
  // regex!
  return `${name.replace(/([^\w\d ])/g, '').trim().replace(/\s+/g, '_')}${random ? Math.floor(Math.random()*9999) : ''}`;
}

const Timer = conn.define('timer', {
  expire: {
    type: conn.Sequelize.DATE,
    allowNull: false
  },
  url: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  weekdays: {
    type: conn.Sequelize.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  weekends: {
    type: conn.Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
})

Timer.addNewTimer = data=> {
  let today = new Date(),
    date = new Date(
      data.year || today.getFullYear(),
      data.month || today.getMonth(),
      data.date || today.getDate(),
      data.hours || today.getHours(),
      data.minutes || today.getMinutes(),
      data.seconds || today.getSeconds()
    );

  return Timer.findAll()
  .then(results=> {
    let allUrls = results.map(r=>r.url),
      url = generateUrl(data.name);
    while(allUrls.includes(url)) {
      url = generateUrl(data.name, true)
    }

    return Timer.create({
      expire: date,
      url: url
    })
  }).catch(err=> err.message);
}

Timer.getTimerData = url=> {
  return Timer.findOne({
    where: { url: url }
  }).catch(err=> err.message);
}

Timer.deleteOne = id=> {
  return Timer.findOne({
    where: { id: id }
  }).then(result=> {
    return result.destroy();
  }).catch(err=> err.message);
}

module.exports = Timer;
