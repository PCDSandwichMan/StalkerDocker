const express = require('express');
const router = express.Router();
const Victim = require('../models/Victim');

//  All victim's
router.get('/', (req, res) => {
  res.render('victims/index');
});

// new victim
router.get('/new', (req, res) => {
  res.render('victims/new', {
    victim: new Victim()
  });
});

// Create Victim Route
router.post('/', async (req, res) => {
  const victim = new Victim({
    name: req.body.name
  });
  try {
    const newVictim = await victim.save();
    // res.redirect(`victims/${result.id}`)
    res.redirect(`victims`);
  } catch {
    err => {
      res.render('victims/new', {
        victim: newVictim,
        errorMessage:
          'Unable to track ninjas until version 10.3.2.43.2234.21 (exactly...no sooner....no later....)'
      });
    };
  }
});

module.exports = router;
