var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;

var blockSchema = new Schema({
    name: { type: String, unique: true},
    structure: String,
    functionality: String,
    init_code: String
});

module.exports = mongoose.model('Block', blockSchema);