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
            // requestContent("study");             
            requestContent("studyAll");             
        });
        
        $("#goHome").on("click", function() {            
            requestContent("home");             
        });
        
        $("#goToUsers").on("click", function() {            
            createContent["user"]();        
        });        
        
        $("#makeUserProfile").on("click", function() {            
            requestContent("user");             
        });
        
        $(".UserReadMore").on("click", function() {
            var idx = $(this).attr("id").substring(9);
            createContent["user"](null, idx);
        });
        
        $("#makeUpdates").on("click", function() {
            requestContent("updates");
        });
        
        $(".UpdateReadMore").on("click", function() {
            var idx = $(this).attr("id").substring(9);
            createContent["updates"](null, idx);
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
        
        c.push("<h1>" + initialContent.header + "</h1>");
        c.push("<h4>" + initialContent.subHeader + "</h4>");
        c.push("<h2>" + initialContent.bigNotice + "</h2>");        
        c.push("<div>" + initialContent.studyList[0] + "</div>"); 
        c.push("<input type='button' id='makeStudy' value='Go To Study'></input>");
        
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
    
    createContent["studyAll"] = function(study) {
        
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
    
    createContent["updates"] = function(updateSet, update_id) {

        if(updateSet) {
            currUpdateSet = updateSet;
        }
                
        var c = []; 
        
        //NAV
        c.push("<input type='button' id='goHome' value='home'></input>");       
        c.push("<input type='button' id='makeStudy' value='study'></input>");
        
        //BODY
        c.push("<br/><br/>");
        c.push("<div>Updates</div>");
        
        if(update_id) {
            
            //request is for a single update
            
            c.push("<img src='/images/" +  currUpdateSet.updates[update_id].photo + "'></img>");
            c.push("<div>" + currUpdateSet.updates[update_id].subject + "</div>");
            c.push("<div>" + currUpdateSet.updates[update_id].date + "</div>");
            c.push("<div>" + currUpdateSet.updates[update_id].desc + "</div>");
            
            
            for(var i = 0; i < currUpdateSet.updates[update_id].comments.length; i++) {
                
                c.push("<br/><br/>");
                c.push("<div>" + currUpdateSet.updates[update_id].comments[i].subject + "</div>");
                c.push("<div>" + currUpdateSet.updates[update_id].comments[i].userName + "</div>");
                c.push("<div>" + currUpdateSet.updates[update_id].comments[i].date + "</div>");
                c.push("<div>" + currUpdateSet.updates[update_id].comments[i].text + "</div>");                
                
            }
            
            
        } else {   
        
            //request is for entire list
            
            for(var i = 0; i <currUpdateSet.updates.length; i++) {
                c.push("<br/><br/>");
                
                c.push("<img class='updateListPhotos' src='/images/" +  currUpdateSet.updates[i].photo + "'></img>");
                c.push("<div>" + currUpdateSet.updates[i].subject + "</div>");
                c.push("<div>" + currUpdateSet.updates[i].date + "</div>");
                c.push("<div>" + currUpdateSet.updates[i].desc.substring(0, 100) + "</div>");
                c.push("<input type='button' class='UpdateReadMore' id='readMore_" + i + "' value='read more...'></input>");
            }
            
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
        
    
    createContent["user"] = function(userSet, user_id) {
        
        if(userSet) {
            currUserSet = userSet;
        }
        
        var c = [];
        
        //NAV
        c.push("<input type='button' id='goHome' value='home'></input>");
        c.push("<input type='button' id='makeStudy' value='study'></input>");
        
        if(user_id) {
            //request for single user - build single profile            
            //NAV
            c.push("<input type='button' id='goToUsers' value='users'></input>");
            
            c.push("<br/><br/>");
            c.push("<img src='/images/" +  currUserSet.userProfiles[user_id].photo + "'></img>");
            c.push("<div>" + currUserSet.userProfiles[user_id].name + "</div>");
            c.push("<div>" + currUserSet.userProfiles[user_id].city + "</div>");
            c.push("<div>" + currUserSet.userProfiles[user_id].state + "</div>");
            c.push("<div>" + currUserSet.userProfiles[user_id].country + "</div>");
            c.push("<div>" + currUserSet.userProfiles[user_id].organization + "</div>");

            
            c.push("<br/><br/>Research Interests:");
            var arrLenRI = (currUserSet.userProfiles[user_id].researchInterests ? currUserSet.userProfiles[user_id].researchInterests.length : 0);
            for(var i = 0; i < arrLenRI; i++) {
                
                
                c.push("<div>" + currUserSet.userProfiles[user_id].researchInterests[i] + "</div>");
            }
                        
            c.push("<br/><br/>Current Studies:");
            var arrLenCS = (currUserSet.userProfiles[user_id].pastStudies ? currUserSet.userProfiles[user_id].pastStudies.length : 0);
            for(var i = 0; i < arrLenCS; i++) {
                
                c.push("<div>" + currUserSet.userProfiles[user_id].currentStudies[i] + "</div>");
            } 
            
            c.push("<br/><br/>Past Studies:");
            var arrLenPS = (currUserSet.userProfiles[user_id].pastStudies ? currUserSet.userProfiles[user_id].pastStudies.length : 0);
            for(var i = 0; i < arrLenPS; i++) {
                
                c.push("<div>" + currUserSet.userProfiles[user_id].pastStudies[i] + "</div>");
            }
          
            
        } else {
            
            //request for list of users
            
            if(typeof(userSet) != "undefined") {
                //fresh request
                //retain the userlist to avoid fetching again in future
                currUserSet = userSet;                
            }
               
            for(var i = 0; i < currUserSet.userProfiles.length; i++) {
            
                c.push("<br/><br/>");
                c.push("<img class='userListPhotos' src='/images/" +  currUserSet.userProfiles[i].photo + "'></img>");
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





