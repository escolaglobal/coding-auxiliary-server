var blocklyExercisesDAO = require('../model/BlocklyExercise');

var exports = module.exports = {};

exports.getInstance = function(attributes){
    return new blocklyExercisesDAO(attributes);
};

/**
 *
 * @param block
 * @param callback function(err, savedExercise)
 */
exports.save = function(blocklyExercise, callback){
    blocklyExercise.save(callback);
};
/**
 *
 * @param id
 * @param callback function(err, result)
 */
exports.getById = function(id, callback){
    blocklyExercisesDAO.findOne({_id: id}, callback);
}

exports.getByEdXId = function(id, callback){
    blocklyExercisesDAO.findOne({id_edx: id}, callback);
}

/**
 *
 * @param callback function(err, exercises)
 */
exports.findAll = function(callback){
    blocklyExercisesDAO.find(callback);
}

exports.duplicate = function(p1_edXid,p2_edXid,callback)
{
    blocklyExercisesDAO.findOne({id_edx: p1_edXid},function(err,exercise){
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

exports.update = function(id_edx, attributes, callback){
    blocklyExercisesDAO.update(
        {id_edx: id_edx },
        {$set: attributes},
        {},
        callback
    );
}
