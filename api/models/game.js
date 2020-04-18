const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, required: true },
  nextPlayerIndex: { type: Number, default: 0 },
  players: [{
    name: { type: String, required: true },
    penColor: { type: String, required: true },
  }],
  dices: {
    redA: Number,
    whiteA: Number,
    redB: Number,
    whiteB: Number,      
  },
  scoreTable: { 
    rows: [],  
  },
  puppets: [{
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    playerId: { type: String, required: true }
  }],
  drawLines: [{
    points: [Number],
    playerId: { type: String, required: true }
  }],
  board: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Board', required: true 
  },
});

module.exports = mongoose.model('game', gameSchema);