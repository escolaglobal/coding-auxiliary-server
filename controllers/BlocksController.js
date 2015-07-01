var blocksDAO = require('../model/Block');

var exports = module.exports = {};

exports.getInstance = function(attributes){
    return new blocksDAO(attributes);
};

/**
 *
 * @param block
 * @param callback function(err, savedBlock)
 */
exports.save = function(block, callback){
    block.save(callback);
};
/**
 *
 * @param id
 * @param callback function(err, result)
 */
exports.getById = function(id, callback){
    blocksDAO.findOne({_id: id}, callback);
}

/**
 *
 * @param name
 * @param callback function(err, result)
 */
exports.getByName = function(name, callback){
    blocksDAO.findOne({name: name}, callback);
}

/**
 *
 * @param callback function(err, blocks)
 */
exports.findAll = function(callback){
    blocksDAO.find(callback);
}

/**
 *
 * @param callback function(err, blocks)
 */
exports.findByIds = function(ids, callback){
    blocksDAO.find({'_id': {$in: ids}}, callback);
}

exports.update = function(id, attributes, callback){
    blocksDAO.update(
        {_id: id },
        {$set: attributes},
        {},
        callback
    );
}

