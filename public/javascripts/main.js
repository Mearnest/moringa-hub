$(function() {
  
    //globals
    
    //current json objects
    var currHome = {};
    var currUserSet = {};
    var currStudy = {};    
    var currResults = {};
    var currUpdateSet = {};
    
    
    $(document).ready(function() { 
        requestContent(function() {
            launchStudyAll();
        });  //fill data objects      
    });

    
    function createEventHandlers() {
        
        $("#makeStudy").on("click", function() {            
            launchStudyAll();                         
        });
        
        $("#goHome").on("click", function() {            
            createContent["home"]("container");             
        });
        
        $("#goToUsers").on("click", function() {            
            createContent["user"]("container");        
        });        
        
        $("#makeUserProfile").on("click", function() {            
            createContent["user"]("container");             
        });
        
        $(".UserReadMore").on("click", function() {
            var idx = $(this).attr("id").substring(2);
            createContent["user"]("container", idx);
        });
        
        $("#makeUpdates").on("click", function() {
            createContent["updates"]("container");
        });
        
        $(".UpdateReadMore").on("click", function() {
            var idx = $(this).attr("id").substring(2);
            createContent["updates"]("container", idx);
        });        
        
        $("#makeResults").on("click", function() {
            createContent["results"]("container");
        });
        
    }
    
    
    function launchStudyAll() {

     
        
        
        //create sub containers
        c = [];
        
        c.push("<div class='row'>");
        c.push("<div class='col-md-6' id='sub_container0'></div>");
        c.push("<div class='col-md-6' id='sub_container1'></div>");
        c.push("</div>");
        
        c.push("<div class='row'>");
        c.push("<div class='row'>");
        c.push("<div class='col-md-6' id='sub_container2'></div>");
        c.push("<div class='col-md-6' id='sub_container3'></div>");
        c.push("</div>");
        
        $("#container").html(c.join(''));
        
        //create content
        
        createContent["user"]("sub_container0");
        createContent["updates"]("sub_container1", -1); 
        createContent["study"]("sub_container2");
        createContent["results"]("sub_container3");
        
        
    }
    
    function requestContent(callback) {
        
        $.getJSON("home", function( data ) {
            currHome = data;            
        });
        $.getJSON("study", function( data ) {
            currStudy = data;            
        });        
        $.getJSON("user", function( data ) {
            currUserSet = data;            
        });        
        $.getJSON("updates", function( data ) {
            currUpdateSet = data;            
        });        
        $.getJSON("results", function( data ) {
            currResults = data; 
            
            callback(); 
            
            createNav();
            
            createEventHandlers();
                    
        });
        
        
                    
    } 
    
    
    function createNav() {
        

        
        var c = [];
        
        c.push("<input type='button' id='makeStudy' value='Go To Study'></input>");

        c.push("<input type='button' id='goHome' value='home'></input>");
        c.push("<input type='button' id='makeUserProfile' value='user profiles'></input>");
        c.push("<input type='button' id='makeUpdates' value='updates'></input>");
        c.push("<input type='button' id='makeResults' value='results'></input>");

        //NAV

        
        $("#nav").html(c.join(''));       
    }
    
    
    var createContent = {};
    
    createContent["home"] = function(containerName) {
        
        var c = [];
        
        c.push("<h1>" + currHome.header + "</h1>");
        c.push("<h4>" + currHome.subHeader + "</h4>");
        c.push("<h2>" + currHome.bigNotice + "</h2>");        
        c.push("<div>" + currHome.studyList[0] + "</div>"); 
                
        $("#" + containerName).html(c.join(''));        

        createEventHandlers();
        
    }
    
    
    createContent["study"] = function(containerName, ctx) {
        
        var c = [];
        
        
        
        //BODY
        c.push("<h3>About this Study</h3>");
        c.push("<div>" + currStudy.name + "</div>");
        c.push("<img src='/images/" +  currStudy.photo + "' class='studyPhotos'></img>");        
        c.push("<div>" + currStudy.desc.substring(0,100) + "</div>");        
                
        
        $("#" + containerName).html(c.join(''));        

        createEventHandlers();
        
    };
    
    createContent["updates"] = function(containerName, update_id) {
                
        var c = []; 
        
        //BODY
        c.push("<h3>Updates</h3>");
        
        
        
        if(update_id) {
            
            if(update_id == -1) {
                //request is for short list
                
                for(var i = 0; i <currUpdateSet.updates.length; i++) {
                    c.push("<br/><br/>");

                    c.push("<div>" + currUpdateSet.updates[i].subject + "</div>");
                
                }
                
            } else {
            
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
            }    
            
        } else {   
        
            //request is for entire list
            
            for(var i = 0; i <currUpdateSet.updates.length; i++) {
                c.push("<br/><br/>");
                
                c.push("<img class='updateListPhotos' src='/images/" +  currUpdateSet.updates[i].photo + "'></img>");
                c.push("<div>" + currUpdateSet.updates[i].subject + "</div>");
                c.push("<div>" + currUpdateSet.updates[i].date + "</div>");
                c.push("<div>" + currUpdateSet.updates[i].desc.substring(0, 100) + "</div>");
                c.push("<input type='button' class='UpdateReadMore' id='P_" + i + "' value='read more...'></input>");
            }
            
        }
        
        
        $("#" + containerName).html(c.join(''));        

        createEventHandlers();
    };    
        
        
    createContent["results"] = function(containerName, ctx) {
        
        var c = [];
             
        //BODY
        c.push("<h3>Results</h3>");
        
        if(ctx == 1) {
            //show full
            c.push("<div>" + currResults.desc.substring(0,200) + "</div>");
                
            for(var i = 0; i < currResults.photos.length; i++) {
                c.push("<img src='/images/" +  currResults.photos[i] + "'></img>");
            }
            
            for(var i = 0; i < currResults.comments.length; i++) {
                c.push("<br/><br/>");
                c.push("<div>" + currResults.comments[i].subject + "</div>");
                c.push("<div>" + currResults.comments[i].userName + "</div>");
                c.push("<div>" + currResults.comments[i].date + "</div>");
                c.push("<div>" + currResults.comments[i].text + "</div>");
            
            } 
            
        } else {
            //show abbreviated
            c.push("<br/><br/>");
            c.push("<div>" + currResults.desc.substring(0,200) + "</div>");
        
        

            
            
        }        
        
        
        
        $("#" + containerName).html(c.join(''));        

        createEventHandlers();
        
    };   
        
    
    createContent["user"] = function(containerName, user_id) {
        
        var c = [];
        
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
            
            c.push("<h3>Researchers</h3>");
               
            for(var i = 0; i < currUserSet.userProfiles.length; i++) {
            
                c.push("<div class='userPanel'>");
                c.push("<img class='userListPhotos' src='/images/" +  currUserSet.userProfiles[i].photo + "'></img>");
                c.push("<div>" + currUserSet.userProfiles[i].name + "</div>");
                c.push("<div>" + currUserSet.userProfiles[i].city + "," + currUserSet.userProfiles[i].state + "</div>");
                c.push("<div>" + currUserSet.userProfiles[i].country + "</div>");
                c.push("<div>");
                c.push("<span class='blueLink UserReadMore' id='U_" + i + "'>Profile</span>");
                c.push("<span>  |  </span>");
                c.push("<span class='blueLink UserEmail' id='U_" + i + "'>Email</span>");
                c.push("</div>");
                c.push("</div>");
                
                
            }
            
        }

        $("#" + containerName).html(c.join(''));  
        
        createEventHandlers();
        
    }
    
});





