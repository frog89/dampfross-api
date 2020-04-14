const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  players: [{
    name: { type: String, required: true, unique: true },
    penColor: { type: String, required: true },
  }],
  dices: {
    redA: Number,
    whiteA: Number,
    redB: Number,
    whiteB: Number,      
  },
  scoreTable: { 
    isVisible: Boolean,
    rows: [{
      no: Number,
      scores: [Number],
    }],  
  },
  puppets: [{
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    playerName: { type: String, required: true, unique: true }
  }],
  drawLines: [{
    penColor: { type: String, required: true },
    points: [Number],  
  }],
});

module.exports = mongoose.model('game', gameSchema);