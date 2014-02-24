// Truly Global
var loadView;
var loadViewData;  // Might need to load data matching the url as app becomes more data intensive.

// Evil extension of native object, thus the check first.
if (!String.prototype.capitalize) {
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
}

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
            // If the user is linking to a specific part of the SPA, load that view.
            console.log(loadView);
            
            if (loadView) {
                loadView();
            }
            else {
                launchStudyAll();
            }
        });  //fill data objects           
    });

    
    function createEventHandlers() {
        // Remove potential exsiting event handler before adding another one to prevent stacking, 
        // which slows load time (a lot).

        $("#makeStudy").off("click");
        $("#makeStudy").on("click", function() {            
            launchStudyAll();
            setHistory("launchStudyAll");
        }); 
        
        $(".makeStudy").off("click");
        $(".makeStudy").on("click", function() {     
            var idx = $(this).attr("id").substring(2);        
            launchStudyAll(idx);
            setHistory("launchStudyAll", idx);            
        });
        
        $("#goHome").off("click");
        $("#goHome").on("click", function() {            
            createContent["home"]("container"); 
            setHistory("home");            
        });
        
        $("#goToUsers").off("click");
        $("#goToUsers").on("click", function() {            
            createContent["user"]("container");
            setHistory("user");            
        });        
        
        $("#makeUserProfile").off("click");
        $("#makeUserProfile").on("click", function() {            
            createContent["user"]("container"); 
            setHistory("user");            
        });
        
        $(".UserReadMore").off("click");
        $(".UserReadMore").on("click", function() {
            var idx = $(this).attr("id").substring(2);
            createContent["user"]("container", idx);
            setHistory("user", idx);
        });
        
        $("#makeUpdates").off("click");
        $("#makeUpdates").on("click", function() {
            createContent["updates"]("container");
            setHistory("updates");
        });
        
        $(".UpdateReadMore").off("click");
        $(".UpdateReadMore").on("click", function() {
            var idx = $(this).attr("id").substring(2);
            createContent["updates"]("container", idx);
            setHistory("updates", idx);
        });        
        
        $("#makeResults").off("click");
        $("#makeResults").on("click", function() {
            var showAll = true;
            createContent["results"]("container", showAll);
            setHistory("results", showAll);
        });
        
    }
    
    
    function launchStudyAll(idx) {
        if (idx) console.log("Create a study for: " + idx);
        
        //create sub containers
        c = [];
        
        c.push("<div class='row'>");
        c.push("<div class='col-md-6' id='sub_container0'></div>");
        c.push("<div class='col-md-6' id='sub_container1'></div>");
        c.push("</div>");
        
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
        $.getJSON("/home", function( data ) {
            currHome = data;            
        });
        $.getJSON("/study", function( data ) {
            currStudy = data;            
        });        
        $.getJSON("/user", function( data ) {
            currUserSet = data;            
        });        
        $.getJSON("/updates", function( data ) {
            currUpdateSet = data;
        });        
        $.getJSON("/results", function( data ) {
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
    
    // var createContent = {};
    window.createContent = {};  // Bad, but need hook inside closure to execute global loadView populated from app.js.
    
    createContent["home"] = function(containerName) {
        var c = [];
        
        c.push("<h2><span class='label label-success'>" + currHome.header + "</span></h1>");
        c.push("<h4 class='indent'>" + currHome.subHeader + "</span>");
        c.push("<h3><span class='label label-primary'>" + currHome.bigNotice + "<span class='label label-primary'></h2>");        
        c.push("<ul class='list-group indent'>");
            c.push("<li class='list-group-item'><span class='blueLink makeStudy' id='S_0'>" + currHome.studyList[0] + "</span></li>");
            c.push("<li class='list-group-item'>" + 'Dapibus ac facilisis in' + "</li>");
            c.push("<li class='list-group-item'>" + 'Morbi leo risus' + "</li>");
            c.push("<li class='list-group-item'>" + 'Porta ac consectetur ac' + "</li>");
            c.push("<li class='list-group-item'>" + 'Vestibulum at eros' + "</li>");
        c.push('</ul>');
                
        $("#" + containerName).html(c.join(''));        

        createEventHandlers();
    }
    
    
    createContent["study"] = function(containerName, ctx) {
        var c = [];
        
        //BODY
        c.push("<h3><span class='label label-success'>About this Study</span></h3>");
        c.push("<img src='/images/" +  currStudy.photo + "' class='studyPhotos'></img>");   
        c.push("<div><strong>Study:</strong> " + currStudy.name + "</div>");
        c.push("<div>" + currStudy.desc.substring(0,100) + "</div>");        
                
        $("#" + containerName).html(c.join(''));        

        createEventHandlers();
    };
    
    createContent["updates"] = function(containerName, update_id) {
        var c = []; 
        
        //BODY
        
        if(update_id || update_id === 0) { // falsey if update id is 0
            
            
            if(update_id == -1) {
                //request is for short list
                c.push("<h3><span class='label label-success'>Updates</span></h3>");
                
                for(var i = 0; i <currUpdateSet.updates.length; i++) {
                    c.push("<br/><br/>");
                    c.push("<div><span class = 'blueLink UpdateReadMore' id='U_" + i + "'>" + currUpdateSet.updates[i].subject + "</span></div>");
                }
                
            } else {
                c.push("<h3><span class='label label-success'>Update</span></h3>");
                
                //request is for a single update
                
                c.push("<div class='wrapper'>");
                
                    c.push("<img src='/images/" +  currUpdateSet.updates[update_id].photo + "' class='pull-left'></img>");
                    c.push("<div class='update'><strong>" + currUpdateSet.updates[update_id].subject + "</strong></div>");
                    c.push("<div class='update'>" + currUpdateSet.updates[update_id].date + "</div>");
                    c.push("<div class='update'>" + currUpdateSet.updates[update_id].desc + "</div>");
                    
                c.push("</div><!-- /.wrapper -->");
                c.push("<div class='clearfix'></div>");
                
                c.push("<h3 class='comments'><span class='label label-primary'>Comments</span></h3>");
                for(var i = 0; i < currUpdateSet.updates[update_id].comments.length; i++) {
                    c.push("<div class='comments'>");
                        c.push("<div><strong>" + currUpdateSet.updates[update_id].comments[i].subject + "</strong></div>");
                        c.push("<div>By " + currUpdateSet.updates[update_id].comments[i].userName);
                        c.push(" | " + currUpdateSet.updates[update_id].comments[i].date + "</div>");
                        c.push("<div>" + currUpdateSet.updates[update_id].comments[i].text + "</div>");
                    c.push("</div>");
                }
            }    
            
        } else {   
        
            //request is for entire list
            c.push("<h3><span class='label label-success'>Updates</span></h3>");
            
            for(var i = 0; i <currUpdateSet.updates.length; i++) {
                c.push("<div class='wrapper'>");
                
                    c.push("<img class='updateListPhotos' src='/images/" +  currUpdateSet.updates[i].photo + "'></img>");
                    c.push("<div><strong>" + currUpdateSet.updates[i].subject + "</strong></div>");
                    c.push("<div>" + currUpdateSet.updates[i].date + "</div>");
                    c.push("<div>" + currUpdateSet.updates[i].desc.substring(0, 100) + "</div>");
                    c.push("<input type='button' class='UpdateReadMore' id='P_" + i + "' value='read more...'></input>");
                
                c.push("</div><!-- /.wrapper -->");
            }
        }
        
        $("#" + containerName).html(c.join(''));        

        createEventHandlers();
    };    
        
        
    createContent["results"] = function(containerName, ctx) {
        var c = [];
             
        //BODY
        c.push("<h3><span class='label label-success'>Results</span></h3>");
        
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
            // c.push("<br/><br/>");
            c.push("<div>" + currResults.desc.substring(0,200) + "</div>");
        }        
        
        $("#" + containerName).html(c.join(''));        
        // createEventHandlers();
    };   
        
    
    createContent["user"] = function(containerName, user_id) {
        console.log(containerName, user_id);
        
        var c = [];
        
        if(user_id || user_id === 0) { // falsey if user id is 0
            //request for single user - build single profile            
            //NAV
            //c.push("<input type='button' id='goToUsers' value='users'></input>");
            
            c.push("<h3><span class='label label-success'>" + currUserSet.userProfiles[user_id].name + "</span></h3>");
            // c.push("<br/><br/>");

            c.push("<img class='pull-left' src='/images/" +  currUserSet.userProfiles[user_id].photo + "'></img>");
            c.push("<div class='profile-info'><strong>City: </strong>" + currUserSet.userProfiles[user_id].city + "</div>");
            c.push("<div class='profile-info'><strong>State/Province/Territory: </strong>" + currUserSet.userProfiles[user_id].state + "</div>");
            c.push("<div class='profile-info'><strong>Country: </strong>" + currUserSet.userProfiles[user_id].country + "</div>");
            c.push("<div class='profile-info'><strong>Organization: </strong>" + currUserSet.userProfiles[user_id].organization + "</div>");

            c.push("<div class='profile-info'><strong>Research Interests:</strong> ");
                var arrLenRI = (currUserSet.userProfiles[user_id].researchInterests ? currUserSet.userProfiles[user_id].researchInterests.length : 0);
                for(var i = 0; i < arrLenRI; i++) {
                    c.push(currUserSet.userProfiles[user_id].researchInterests[i]);
                    if (i < arrLenRI - 1) {
                        c.push(", ");
                    }
                }
            c.push("</div>");
            c.push("<div class='clearfix'></div>");
               
            c.push("<h3><span class='label label-primary'>Researcher</span></h3>");
            
            c.push("<div class='studies'>");
                c.push("<h4>Current Studies:</h4>");
                var arrLenCS = (currUserSet.userProfiles[user_id].pastStudies ? currUserSet.userProfiles[user_id].pastStudies.length : 0);
          
                for(var i = 0; i < arrLenCS; i++) {
                    c.push("<div class='indent'>" + currUserSet.userProfiles[user_id].currentStudies[i] + "</div>");
                } 
           c.push("</div>");
            
            c.push("<div class='studies'>");
               c.push("<h4>Past Studies:</h4>");
                var arrLenPS = (currUserSet.userProfiles[user_id].pastStudies ? currUserSet.userProfiles[user_id].pastStudies.length : 0);
                
                for(var i = 0; i < arrLenPS; i++) {
                    c.push("<div class='indent'>" + currUserSet.userProfiles[user_id].pastStudies[i] + "</div>");
                }
           c.push("</div>");
          
        } else {
            
            //request for list of users
            
            if(typeof(userSet) != "undefined") {
                //fresh request
                //retain the userlist to avoid fetching again in future
                currUserSet = userSet;                
            }
            
            c.push("<h3><span class='label label-success'>Researchers</span></h3>");
               
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
    
    // Set the URL as the user loads new data/views or navigates back
    function setHistory(view, idx) {
    	if (window.history.pushState) {
            // showStudyAll or front view for a study needs to be handled diffrently right now.
            if (view === "launchStudyAll") {
                var title = "Moringa Hub";
                var route = "/";
            }
            else {
                var title = view.capitalize();
                var route = "/" + view;
                if (idx && idx !== true) {
                    route = route + "/" + idx;
                }
            }
            
            var objState = { "view": view, 'title': title, 'idx': idx }; 
            document.title = title;  // Update page's title as the user loads new content
            
            console.log(objState);
            
            window.history.pushState(objState, title, route);
        }
    }
    
    window.onpopstate = function(event) {
		if (event.state) {
			console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
            document.title = event.state.title;
            
            if (event.state.view === "launchStudyAll") {
                launchStudyAll(event.state.idx);
            }
            else {
                createContent[event.state.view]("container", event.state.idx);
            }
		}
	}
    
});





