const mongoose = require('mongoose')

const cabinetSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  type:  { type: String, required: true },
  quantity: {type: Number, required: true},
  color: {type: String, required: true},
  description: String, 
  inStock: Boolean,
})

const Cabinet = mongoose.model('Cabinet', cabinetSchema)

module.exports = Cabinet