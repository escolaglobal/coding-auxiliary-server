var pythonExercisesDAO = require('../model/PythonExercise');

var exports = module.exports = {};

exports.getInstance = function(attributes){
    return new pythonExercisesDAO(attributes);
};

/**
 *
 * @param block
 * @param callback function(err, savedExercise)
 */
exports.save = function(pythonExercise, callback){
    pythonExercise.save(callback);
};

exports.duplicate = function(p1_edXid,p2_edXid,callback)
{
    pythonExercisesDAO.findOne({id_edx: p1_edXid},function(err,exercise){
        if(err || exercise == undefined)
        {
            callback("error duplicating exercise",undefined);
            return;
        }
        delete exercise._id;
        exercise.id_edx = p2_edXid;
        exercise.save(callback);
    });
}

/**
 *
 * @param id
 * @param callback function(err, result)
 */
exports.getById = function(id, callback){
    pythonExercisesDAO.findOne({_id: id}, callback);
}

exports.getByEdXId = function(id, callback){
    pythonExercisesDAO.findOne({id_edx: id}, callback);
}

/**
 *
 * @param callback function(err, exercises)
 */
exports.findAll = function(callback){
    pythonExercisesDAO.find(callback);
}

/**
 *
 * @param callback function(err, numAffected)
 */

exports.update = function(id_edx, attributes, callback){
    pythonExercisesDAO.update(
        {id_edx: id_edx },
        {$set: attributes},
        {},
        callback
    );
}
