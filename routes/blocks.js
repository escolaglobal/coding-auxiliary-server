var express = require('express');
var router = express.Router();
var BlocksController = require('../controllers/BlocksController');

/* API CALLS WITH OBJECT RETURNS */
/**
 * Create a block
 */
router.post('/create', function(req, res) {

    var attributes = {
        name: req.body.name,
        structure: req.body.structure,
        functionality: req.body.functionality,
        init_code: req.body.init_code
    };

    var block = BlocksController.getInstance(attributes);

    BlocksController.save(block, function(err, savedBlock){
        if (err) res.send(err);
        res.send(savedBlock);
    });
});

/**
 * Get a block by ID or name
 */
router.get('/get', function(req, res){
    if(req.query.id != undefined){
        BlocksController.getById(req.query.id, function(err, block){
            if (err) res.send(err);
            res.send(block);
        });
    }else if(req.query.name!=undefined){
        BlocksController.getByName(req.query.name, function(err, block){
            if (err) res.send(err);
            res.send(block);
        });
    }
});

router.get('/list', function(req, res){
    BlocksController.findAll(function(err, blocks){
        if (err) res.send(err);
        // res.send(blocks);
        res.render('blocks/list',{
            blocks: blocks
        });
    });
});

router.get('/uploadall', function(req, res){
    
        res.render('uploadall', {});
});


router.get('/list-with-ids', function(req, res){
    BlocksController.findByIds(req.query.ids, function(err, blocks){
        if (err) res.send(err);
        else res.send(blocks);
    });
});
/* VIEWS WITH REDIRECT RETURNS*/

router.get('/wizard', function(req, res){
    res.render('blocks/create');
});

router.post('/wizard', function(req, res){
    var attributes = {
        name: req.body.name,
        structure: req.body.structure,
        functionality: req.body.functionality,
        init_code: req.body.init_code
    };

    var block = BlocksController.getInstance(attributes);

    BlocksController.save(block, function(err, savedBlock){
        if (err) res.send(err);
        res.redirect('view?id=' + savedBlock._id);
    });
});

router.get('/view', function(req, res){
    if(req.query.id != undefined){
        BlocksController.getById(req.query.id, function(err, block){
            if (err) res.send(err);
            res.render('blocks/view', {
                block: block
            });
        });
    }else if(req.query.name!=undefined){
        BlocksController.getByName(req.query.name, function(err, block){
            if (err) res.send(err);
            res.render('blocks/view', {
                block: block
            });
        });
    }
});

router.get('/edit', function(req, res){
    BlocksController.getById(req.query.id, function (err, block) {
        if (err) res.send(err);
        res.render('blocks/edit', {
            block: block
        });
    });
});

router.post('/edit', function(req, res){
    BlocksController.getById(req.body._id, function (err, block) {
        if (err) res.send(err);
        BlocksController.update(req.body._id, req.body, function(err, numAffected){
            if (err) res.send(err);
            res.redirect('view?id=' + req.body.id);
        });
    });
})
module.exports = router;
