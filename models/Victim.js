const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const VictimSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  } 
});

mongoose.plugin(timestamp);

const victim = mongoose.model('Victim', VictimSchema);
module.exports = victim;
