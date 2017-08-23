const router = require('express').Router();
const Timer = require('../models').models.Timer;

router.get('/', (req, res, next)=> {
  res.render('index');
})

router.post('/', (req, res, next)=> {
  req.body.month -= 1; // month is +1
  console.log(req.body)
  Timer.addNewTimer(req.body)
    .then((url)=> {
      res.redirect(`/${url}`)
    })
    .catch(next);
})

router.get('/:url', (req, res, next)=> {
  Timer.getTimerData(req.params.url)
    .then((data)=> res.render('timer', { data }))
    .catch(next);
})

router.get('/json/:url', (req, res, next)=> {
  Timer.getTimerData(req.params.url)
    .then((data)=> res.json(data))
    .catch(next);
})

router.delete('/:id', (req, res, next)=> {
  Timer.deleteOne(req.params.id)
    .then(()=> res.redirect('/'))
    .catch(next);
})

// lets write some routes!
/*
  get /:url - retreives that unique url
    creates the page

  post / - create a new timer
    redirects to that timer url
    sends the url to the frontend

  delete /:id - deletes that timer
*/

module.exports = router;
