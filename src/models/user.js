const mongoose = require('mongoose');
const schemaReferences = require('./schema-references');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  first_name: {
    type: String,
    default: null,
  },
  last_name: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unique: true,
    default: null,
  },
  password: {
    type: String,
    default: null,
  },
});

userSchema.set('timestamps', true);

module.exports = mongoose.model(schemaReferences.users, userSchema);
