const conn = require('./_db');

const generateUrl = (name)=> {
  // regex!
  return name.replace(/([^\w\d ])/g, '').trim().replace(/\s+/g, '_');
}

const generateUrlRandom = (name)=> {
  return `${generateUrl(name)}_${Math.floor(Math.random()*9999)}`
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
  }
})

Timer.addNewTimer = data=> {
  let today = new Date();
  let date = new Date(
    data.year || today.getFullYear(),
    data.month || today.getMonth(),
    data.date || today.getDate(),
    data.hours || today.getHours(),
    data.minutes || today.getMinutes(),
    data.seconds || today.getSeconds()
  );
  let newTimer = Timer.build({
    expire: date,
    url: generateUrl(data.name)
  })

  return newTimer.save()
    .then(null, err=> {
      let newTimer = Timer.build({
        expire: date,
        url: generateUrlRandom(data.name)
      })
      return newTimer.save();
    })
    .catch(err=> {
      return err;
    });
 
  // gen url first, then save
  // return generateUrl(data.name)
}

module.exports = Timer;