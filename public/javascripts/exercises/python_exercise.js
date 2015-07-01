/* Returns a string with code written by the students. */
function getState() {
    var state = {code:String(editor.getValue())};
    return JSON.stringify(state);
}

/* Returns a JSON object with console output and image content if there */
function getGrade() {
    runit(false,editor.getValue());
    var output = $("#output").text();

   if(getCode(editor.getValue()).indexOf("import turtle") == -1)
       var text = JSON.stringify({"console": output.trim()});
   else{
        var image = compare();
        var text = JSON.stringify({"console": output.trim(),"image": image});
   }
    return text;
}

function compare()
{
    var image = document.getElementById("mycanvas").toDataURL();

    return $.ajax({
        type: "GET",
        url: "compare",
        data: {
            image1:image,
            exercise_id:$("#code").attr("data-exercise-id")
        },
        async: false
    }).responseText;
}


/* Sets the old state for the students exercises */
function setState(stateStr) {
    stateStr = arguments.length === 1 ? arguments[0] : arguments[1];
    var state = JSON.parse(stateStr);
    editor.setValue(state.code);
    runit(true,editor.getValue());
}

// Establish a channel only if this application is embedded in an iframe.
    // This will let the parent window communicate with this application using
    // RPC and bypass SOP restrictions.
    if (window.parent !== window) {
        channel = Channel.build({
            window: window.parent,
            origin: "*",
            scope: "JSInput"
        });

        channel.bind("getGrade", getGrade);
        channel.bind("getState", getState);
        channel.bind("setState", setState);
    }