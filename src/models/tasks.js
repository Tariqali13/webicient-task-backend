const mongoose = require('mongoose');
const schemaReferences = require('./schema-references');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  project_id: {
    type: Schema.Types.ObjectId,
    ref: schemaReferences.projects,
  },
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
  status: {
    type: String,
    default: null,
    enum: ['todo', 'in-progress', 'done'],
  },
  order_by: {
    type: Number,
    default: 0,
  },
  due_date: {
    type: Schema.Types.Date,
    default: Date.now,
  },
});

taskSchema.set('timestamps', true);

module.exports = mongoose.model(schemaReferences.tasks, taskSchema);
