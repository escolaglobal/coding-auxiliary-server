
function activateStep(step){
    step.show();
    step.addClass('active-step');
}

function deactivateStep(step){
    step.hide();
    step.removeClass('active-step');
}

function checkButtons(step){
    if(step.next().length == 0){
        $('#next').hide();
    }else $('#next').show();

    if(step.prev().length == 0){
        $('#back').hide();
    }else $('#back').show();
}

function forward() {
    var activeStep = $('.active-step');
    var nextStep = activeStep.next();
    activateStep(nextStep);
    deactivateStep(activeStep);

    checkButtons(nextStep);

}

function backward() {
    var activeStep = $('.active-step');
    var nextStep = activeStep.prev();

    activateStep(nextStep);
    deactivateStep(activeStep);

    checkButtons(nextStep);
}

$('.step').hide();
activateStep($('.step').first());
checkButtons($('.step').first());
/*make_base();

function make_base()
{
    var canvas = document.getElementById('img_c'),
        context = canvas.getContext('2d');

    base_image = new Image();
    base_image.src = '';
    base_image.onload = function(){
        context.drawImage(base_image, 0, 0);
    }
}*/
