const mongoose = require('mongoose');
const schemaReferences = require('./schema-references');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: schemaReferences.users,
  },
  title: {
    type: String,
    default: null,
  },
  description: {
    type: String,
    default: null,
  },
});

projectSchema.set('timestamps', true);

module.exports = mongoose.model(schemaReferences.projects, projectSchema);
