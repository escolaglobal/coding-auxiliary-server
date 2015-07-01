var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;

var blocklyExerciseSchema = new Schema({
    id_edx: {type: String, unique:true} ,
    init_python_code: String,
    final_python_code: String,
    validation_python_code: String,
    toolbox: [Schema.Types.ObjectId],
    initial_state: String,
    text: String,
    turtle: Boolean,
    background_image_url: String,
    validation_image: String
});

module.exports = mongoose.model('BlocklyExercise', blocklyExerciseSchema);