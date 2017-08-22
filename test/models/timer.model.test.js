
const expect = require('chai').expect;
const conn = require('../../models');
const models = conn.models;
const Timer = models.Timer;

/*
  Timer.addNewTimer(req.body)
  Timer.getTimerData(req.params.url)
  Timer.deleteOne(req.params.id)
*/

describe('Timer', ()=> {

  beforeEach(()=> {
    return conn.sync();
  })


  describe('model', ()=> {
    it('exists', ()=> {
      expect(Timer).to.be.ok;
    })
  })


  describe('gets', ()=> {
    it('all timers', ()=> {


    })

    it('a timer by url', ()=> {


    })
  })


  describe('create and delete', ()=> {
    it('generates unique urls', ()=> {

    })

    it('creates a new timer', ()=> {
      return Promise.all([Timer.addNewTimer({
        day: "10",
        month: "8",
        year: "2050",
        hour: "14",
        minute: "56",
        second: "32",
        options: {
          weekdays: "true",
          weekends: "false"
        },
        name: "My@@    awesome*!$ timer   +)_"
      }), Timer.addNewTimer({
        name: "My@@    awesome*!$ timer   +)_"
      })])
    })

    it('deletes a timer by id', ()=> {

    })
  })
})
