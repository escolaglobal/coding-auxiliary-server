var express = require('express');
var router = express.Router();
var PythonExercisesController = require('../controllers/PythonExercisesController');
var BlocklyExercisesController = require('../controllers/BlocklyExercisesController');

router.get('/:edXid', function(req, res) {
    if (req.params.edXid != undefined) {
        PythonExercisesController.getByEdXId(req.params.edXid, function (err, exercise) {
            if (err) res.send(err);
            if(exercise != undefined) {
                console.log("python exercise");
                res.setHeader('Content-Type', 'application/json');
                res.render('edX/view', {
                    hostname: req.headers.host,
                    baseRoute: req.headers['x-base-route'] || "",
                    exercise: exercise,
                    split_lines_enun: exercise.text.split("\n"),
                    split_lines: exercise.validation_python_code.split("\n"),
                    exerciseRoute: 'pythonExercises'
                },function(err, html){
                    res.send(req.query.callback+"("+JSON.stringify({output:html})+");");
                });
            }else{
                BlocklyExercisesController.getByEdXId(req.params.edXid, function (err, exercise) {
                    if (err) res.send(err);
                    if(exercise != undefined) {
                        res.render('edX/view', {
                            hostname: req.headers.host,
                            baseRoute: req.headers['x-base-route'] || "",
                            exercise: exercise,
                            exerciseRoute: 'blocklyExercises',
                            split_lines_enun: exercise.text.split("\n"),
                            split_lines: exercise.validation_python_code.split("\n"),
                        },function(err, html){
                    res.send(req.query.callback+"("+JSON.stringify({output:html})+");");
                });
                    }else{
                        res.status(404).send('Not found');
                    }
                });
            }
        });
    }
});

module.exports = router;
