//$(function() {
  
    $(document).ready(function() { 
        requestContent("home");        
    });

    
    function createEventHandlers() {

        $("#makeUserProfile").on("click", function() {            
            requestContent("user");             
        });
        
        $("#goHome").on("click", function() {            
            requestContent("home");             
        });        
        
    }
    
    function requestContent(path) {
        //path must match a path in app.js and a createContent here 
console.log("requesting", path);
        $.getJSON( path, function( data ) {
console.log("received", data);
            createContent[path](data);
            createEventHandlers();
        });
                    
    }    
    
    var createContent = {};
    
    createContent["home"] = function(initialContent) {
        
        var c = [];

        c.push("<input type='button' id='makeUserProfile' value='user profile'></input>");
        
        
        
        c.push("<h1>" + initialContent.header + "</h1>");
        c.push("<h4>" + initialContent.subHeader + "</h4>");
        c.push("<h2>" + initialContent.bigNotice + "</h2>");
        

        
        $(".container").html(c.join(''));        

        
        
    }
    
    createContent["user"] = function(userProfile) {
        
        var c = [];
                
        c.push("<input type='button' id='goHome' value='go home'></input>");
        
        
        c.push("<h4>" + userProfile.name + "</h4>");
        c.push("<div>" + userProfile.city + "</div>");
        c.push("<div>" + userProfile.country + "</div>");
        

        $(".container").html(c.join(''));        
        
    }
    
//});





