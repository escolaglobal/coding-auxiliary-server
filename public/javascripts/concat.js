var toolbox = "";
var control = "<category name='Control'><block type='controls_if'></block><block type='controls_whileUntil'></block></category>";
var logic = "<category name='Logic'><block type='logic_compare'></block><block type='logic_operation'></block><block type='logic_boolean'></block></category>";
var blocks = "<category name='Blocks'><block type='text'></block><block type='text_print'></block></category>";

var XML = document.createElement("xml");

  $(document).ready(function(){

    // initially disable next button
  	localStorage.removeItem('toolbox',toolbox);
  	$('#control').attr('checked', false);
  	$('#logic').attr('checked', false);
    $('#blocks').attr('checked', false);

  	 $("#control").change(function(){
  		if(typeof control !== 'undefined') {
  			if(this.checked){
          // append control element
          appendNodeFromString(control);
  			}
  			else {
          for(var i=0; i<XML.getElementsByTagName("category").length; i++){
              var name = XML.getElementsByTagName("category")[i].getAttribute('name');
              if(name === "Control")
                XML.getElementsByTagName("category")[i].remove();
          }
			  }
  			
  		}
  	});

  	$("#logic").change(function(){
  		if(typeof logic !== 'undefined') {
  			if(this.checked){
          // append control element
          appendNodeFromString(logic);
        } else {
          for(var i=0; i<XML.getElementsByTagName("category").length; i++){
              var name = XML.getElementsByTagName("category")[i].getAttribute('name');
              if(name === "Logic")
                XML.getElementsByTagName("category")[i].remove();
          }
        }
  		}
  	});


    $("#blocks").change(function(){
      if(typeof blocks !== 'undefined') {
        if(this.checked){
          // append control element
          appendNodeFromString(blocks);
        } else {
          for(var i=0; i<XML.getElementsByTagName("category").length; i++){
              var name = XML.getElementsByTagName("category")[i].getAttribute('name');
              if(name === "Blocks")
                XML.getElementsByTagName("category")[i].remove();
          }
        }
      }
    });
  	

    $("#next").click(function(){
        if(XML.childNodes.length === 0) {
          document.getElementById("next").disabled = true;
        }
  			saveData();

  	});
  });

  function saveData(){
    var serializer = new XMLSerializer();
    xmlString = (new XMLSerializer()).serializeToString(XML);
  	localStorage.setItem('toolbox',xmlString);
  };


  function appendNodeFromString(stringNode) {
    parser=new DOMParser();
    xmlDoc=parser.parseFromString(stringNode,"text/xml");
    XML.appendChild(xmlDoc.childNodes[0]);
  }