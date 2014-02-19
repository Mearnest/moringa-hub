$(function() {
  
    //globals
    
    //current json objects
    var currUserSet = {};
    var currStudy = {};    
    var currResults = {};
    var currUpdateSet = {};
    
    
    $(document).ready(function() { 
        requestContent("home");        
    });

    
    function createEventHandlers() {

        $("#makeStudy").on("click", function() {            
            requestContent("study");             
        });
        
        $("#makeUserProfile").on("click", function() {            
            requestContent("user");             
        });
        
        $("#goToUsers").on("click", function() {            
            createContent["user"]();        
        });        
        
        $("#goHome").on("click", function() {            
            requestContent("home");             
        }); 
        
        $(".UserReadMore").on("click", function() {
            createContent["user"]($(this).attr("id"));
        });
        
        $("#makeUpdates").on("click", function() {
            requestContent("updates");
        });
        
        $("#makeResults").on("click", function() {
            requestContent("results");
        });
        
    }
    
    function requestContent(path) {
        //path must match a path in app.js and a createContent here 
//console.log("requesting", path);
        $.getJSON( path, function( data ) {
//console.log("received", data);
            createContent[path](data);
            
        });
                    
    }    
    
    
    var createContent = {};
    
    createContent["home"] = function(initialContent) {
        
        var c = [];

        
        //NAV
        c.push("<input type='button' id='makeStudy' value='study'></input>");
                
        
        c.push("<h1>" + initialContent.header + "</h1>");
        c.push("<h4>" + initialContent.subHeader + "</h4>");
        c.push("<h2>" + initialContent.bigNotice + "</h2>");        

        
        $(".container").html(c.join(''));        

        createEventHandlers();
        
    }
    
    
    createContent["study"] = function(study) {
        
        var c = [];
        
        currStudy = study;

        //NAV
        c.push("<input type='button' id='goHome' value='home'></input>");
        c.push("<input type='button' id='makeUserProfile' value='user profiles'></input>");
        c.push("<input type='button' id='makeUpdates' value='updates'></input>");
        c.push("<input type='button' id='makeResults' value='results'></input>");
        
        //BODY
        c.push("<br/><br/>");
        c.push("<img src='/images/" +  study.photo + "'></img>");
        c.push("<h4>" + study.name + "</h4>");
        c.push("<div>" + study.desc + "</div>");        
                
        
        $(".container").html(c.join(''));        

        createEventHandlers();
        
    };
    
    createContent["updates"] = function(updateSet) {

        currUpdateSet = updateSet;
        
        var c = [];

        
        //NAV
        c.push("<input type='button' id='goHome' value='home'></input>");       
        c.push("<input type='button' id='makeStudy' value='study'></input>");
        
        //BODY
        c.push("<br/><br/>");
        c.push("<div>Updates</div>");
        
        
        
        for(var i = 0; i <updateSet.updates.length; i++) {
            c.push("<br/><br/>");
            
            c.push("<img src='/images/" +  updateSet.updates[i].photo + "'></img>");
            c.push("<div>" + updateSet.updates[i].subject + "</div>");
            c.push("<div>" + updateSet.updates[i].date + "</div>");
            c.push("<div>" + updateSet.updates[i].desc + "</div>");
        }
        
        
        $(".container").html(c.join(''));        

        createEventHandlers();
    };    
        
        
    createContent["results"] = function(results) {

        currResults = results;
        
        var c = [];

        //NAV
        c.push("<input type='button' id='goHome' value='home'></input>");
        c.push("<input type='button' id='makeStudy' value='study'></input>");
                
        //BODY
        c.push("<div>Results</div>");
        
        c.push("<br/><br/>");
        c.push("<div>" + results.desc + "</div>");
        
        for(var i = 0; i < results.photos.length; i++) {
            c.push("<img src='/images/" +  results.photos[i] + "'></img>");
        }
        
        for(var i = 0; i < results.comments.length; i++) {
            c.push("<br/><br/>");
            c.push("<div>" + results.comments[i].subject + "</div>");
            c.push("<div>" + results.comments[i].userName + "</div>");
            c.push("<div>" + results.comments[i].date + "</div>");
            c.push("<div>" + results.comments[i].text + "</div>");
            
        }        
        
        
        
        $(".container").html(c.join(''));        

        createEventHandlers();
        
    };   
        
    
    createContent["user"] = function(userSet) {
        
        //NOTE: this does 3 things:
        //1. Creates the initial user list from Json
        //2. Creates a single user profile
        //3. Creates the same user list without requesting Json
        
        var c = [];
        
        //NAV
        c.push("<input type='button' id='goHome' value='home'></input>");
        c.push("<input type='button' id='makeStudy' value='study'></input>");
        
        //check the type of data to determine which content is needed
        if(typeof(userSet) === "string") {
            //request for single user - build single profile
            var idx = userSet.substring(9);
//console.log("idx", idx, currUserSet);
            
            //NAV
            c.push("<input type='button' id='goToUsers' value='users'></input>");
            
            c.push("<br/><br/>");
            c.push("<img src='/images/" +  currUserSet.userProfiles[idx].photo + "'></img>");
            c.push("<h4>" + currUserSet.userProfiles[idx].name + "</h4>");
            
        } else {
            
            //request for list of users
            
            if(typeof(userSet) != "undefined") {
                //fresh request
                //retain the userlist to avoid fetching again in future
                currUserSet = userSet;                
            }
               
            for(var i = 0; i < currUserSet.userProfiles.length; i++) {
            
                c.push("<br/><br/>");
                c.push("<img src='/images/" +  currUserSet.userProfiles[i].photo + "'></img>");
                c.push("<h4>" + currUserSet.userProfiles[i].name + "</h4>");
                c.push("<div>" + currUserSet.userProfiles[i].city + "</div>");
                c.push("<div>" + currUserSet.userProfiles[i].country + "</div>");
                c.push("<input type='button' class='UserReadMore' id='readMore_" + i + "' value='read more...'></input>");
                
                
            }
            
        }

        $(".container").html(c.join(''));  
        
        createEventHandlers();
        
    }
    
});





