const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  combs: {
    data: [Number],
    offset: {type: Number, default: 0},
  },
  borders: {
    data: [Number],
    offset: {type: Number, default: 0},
  },
  rivers: {
    data: [Number],
    offset: {type: Number, default: 0},
  },
  textObjects: {
    data: [Number],
    offset: {type: Number, default: 0},
    texts: [String]
  },
  townTexts: {
    inside: [String],
    outside: [String],
  },
});

module.exports = mongoose.model('Board', boardSchema);
