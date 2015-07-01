// output functions are configurable.  This one just appends some text
// to a pre element.
function outf(text) { 
    var mypre = $("#output");
    mypre.append(text);
}
function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

function getCode(main_code)
{
    var ini_code = $('#initial_code').text();
    var fin_code = $('#final_code').text();
    var prog = main_code;
    return ini_code + '\n' + prog + '\n' + fin_code;
}

function runit(show,main_code,no_complete) { 
    if(no_complete==true)
        var full_code =  main_code;
    else var full_code = getCode(main_code);
    var canvas = $('#mycanvas');
    canvas[0].getContext("2d").clearRect ( 0 , 0 , canvas.width, canvas.height );

    if(full_code.indexOf("import turtle") != -1 && show)
    {
        if($('#myModal').length){
            $('#myModal').modal('show');
        }
    }


    var mypre = $("#output");
    mypre.html('');
    Sk.canvas = "mycanvas";
    Sk.pre = "output";
    Sk.configure({output:outf, read:builtinRead});
    if(show){
         Sk.onAfterImport = function(library) {
          switch(library) {
            case 'turtle':
              Sk.tg.defaults.animate = true;
              break;
          }
        }
        setTimeout(function(){ runSub(full_code,main_code); }, 1000);
    }else
    {
        Sk.onAfterImport = function(library) {
          switch(library) {
            case 'turtle':
              Sk.tg.defaults.animate = false;
              break;
          }
        }
        var turtle_vars = full_code.match("[A-Za-z0-9]+(?= +\= +turtle.Turtle\(\))");
        console.log(turtle_vars);
        if(turtle_vars)
        {
            turtle_vars.forEach(function(element, index, array){
            a = full_code.replace(new RegExp(element+".speed\(.+\)"),function(match,num,offset,string){
                return element+".speed()";
            });
            full_code = a;
        });
        }
        console.log(full_code);
        runSub(full_code,main_code);
    }
}

function runSub(full_code,main_code)
{
    try {
        eval(Sk.importMainWithBody("<stdin>",false,full_code));
    }
    catch(e) {
        var error = e.toString();
        console.log(error);
        var num_lines_ini = $('#initial_code').text().split("\n").length;
        var num_lines_main = main_code.split("\n").length;
        error = error.replace(new RegExp("on line ([0-9]+)"),
            function(match,num,offset,string)
            {
                var n = num - num_lines_ini;
                if(n <= 0 || n > num_lines_main+1)
                    return "in evaluation code";
                return "around line "+n;
            });
        outf(error);
    }
}