function forward2() {
    if(document.getElementById('img_c').style.display != "none") {
        document.getElementById('img_c').style.display = "none";
        document.getElementById('tp').style.display = "none";

        document.getElementById('is').style.display = "block";
        document.getElementById('ipc').style.display = "block";
        document.getElementById('fpc').style.display = "block";
		
		document.getElementById('back').style.display = "block";
    }
    else {
        document.getElementById('is').style.display = "none";
        document.getElementById('ipc').style.display = "none";
        document.getElementById('fpc').style.display = "none";

        document.getElementById('vcode').style.display = "block";
		
		document.getElementById('next').style.display = "none";
		document.getElementById('crea').style.display = "block";
		document.getElementById('back').style.display = "block";
    }
}

function forward() {
    if(document.getElementById('step1').style.display != "none") {
        document.getElementById('step1').style.display = "none";
        document.getElementById('step2').style.display = "block";

    }
    else if(document.getElementById('step2').style.display != "none"){
        document.getElementById('step2').style.display = "none";
        document.getElementById('step3').style.display = "block";
        
    }
    else if(document.getElementById('step3').style.display != "none"){
        applyToolbox();
        document.getElementById('step3').style.display = "none";
        document.getElementById('step4').style.display = "block";
        
    }
}

function backward() {
    if(document.getElementById('is').style.display != "none") {
        document.getElementById('img_c').style.display = "inline";
        document.getElementById('tp').style.display = "block";

        document.getElementById('is').style.display = "none";
        document.getElementById('ipc').style.display = "none";
        document.getElementById('fpc').style.display = "none";
		
		document.getElementById('back').style.display = "none";
    }
    else {
        document.getElementById('is').style.display = "block";
        document.getElementById('ipc').style.display = "block";
        document.getElementById('fpc').style.display = "block";

        document.getElementById('vcode').style.display = "none";
		
		document.getElementById('next').style.display = "block";
		document.getElementById('crea').style.display = "none";
    }
}
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
