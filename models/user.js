const { Schema, model } = require('mongoose')

const userShema = new Schema({
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  wishlist: {
    items: [
      {
        count: {
          type: Number,
          require: true,
          default: 1
        },
        wishId: {
          type: Schema.Types.ObjectId,
          ref: 'Habit',
          required: true
        }
      }
    ]
  }
});

module.exports = model('User', userShema)