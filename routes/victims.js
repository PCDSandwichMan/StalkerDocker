const express = require('express');
const router = express.Router();
const Victim = require('../models/Victim');

//  All victim's
router.get('/', async (req, res) => {
  let searchOptions = {};
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = await new RegExp(req.query.name, 'i');
  } 
  
  try {
    const victims = await Victim.find(searchOptions);
    res.render('victims/index', {
      victims: victims,
      searchOptions: req.query.name
    });
  } catch {
    res.redirect('/');
    err => console.log(`get / error ${err}`);
  }
});

// new victim
router.get('/new', (req, res) => {
  res.render('victims/new', {
    victim: new Victim()
  });
});

// Create Victim Route
router.post('/', async (req, res) => {
  const existing = await Victim.find({ name: req.body.name });
  if (existing.length >= 1) {
    return res.render('victims/new', {
      errorMessage:
        "Dude NO double tracking on a single victim. That's just creepy.....weirdo......"
    });
  }

  try {
    new Victim({
      name: req.body.name
    })
      .save()
      .then()
      .catch(err => console.log('something went down in the "/" post ===> ' + err));
    // res.redirect(`victims/${result.id}`)
    res.redirect('/victims');
  } catch {
    err => {
      res.render('victims/new', {
        victim: victim,
        errorMessage:
          'Unable to track ninjas until version 10.3.2.43.2234.21 (exactly...no sooner....no later....)'
      });
    };
  }
});

module.exports = router;
