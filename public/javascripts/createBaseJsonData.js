//makeInitialHeaderJson();
//makeStudyJson();
//makeUserProfileJson();
//makeStudyUpdatesJson();
//makeResultsJson();

exports.makeInitialHeaderJson = function() {

var initialContent = {};

initialContent.header = "Moringa Hub";
initialContent.subHeader = "A tool for Moringa Scholars to collaborate...</h4>";
initialContent.bigNotice = "Calls for Studies & Studies in Progress";

initialContent.studyList = ["Protein quality and content in Moringa oleifera leaves"];
//console.log(JSON.stringify(initialContent));
return initialContent;

};



exports.makeStudyJson = function() {

var study = {};

study.name ="Study: Protein quality and content in Moringa oleifera leaves";
study.desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt, dolor in convallis placerat, quam eros rhoncus erat, at sodales purus velit non metus. Aenean lacinia facilisis metus et condimentum. \n Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer ac sagittis arcu. Suspendisse vel tincidunt libero.";
study.photo = "study_photo.jpg"; 
    
    
//console.log(JSON.stringify(study));
return study;

};





exports.makeResultsJson = function() {
    
var results = {};
    
results.desc = "We planted the Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt, dolor in convallis placerat, quam eros rhoncus erat, at sodales purus velit non metus. Aenean lacinia facilisis metus et condimentum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer ac sagittis arcu. Suspendisse vel tincidunt libero. Quisque in eleifend \n ligula id dictum. Donec ac ultrices turpis. Nullam lobortis felis quis ipsum mollis, ac accumsan diam faucibus. In nisl elit, tincidunt id odio sed, gravida tempus sapien. Nunc convallis pretium quam ultrices dignissim. Proin risus mi, blandit non est at, molestie tempus arcu. \n Mauris tempor ipsum vitae massa pellentesque, ac posuere sem sollicitudin. Cras justo neque, tincidunt non luctus ut, adipiscing sed lectus. Fusce ornare pretium leo, ut tincidunt quam adipiscing eget. Mauris at sapien diam. Duis sit amet est et sem tempor placerat. Suspendisse pulvinar iaculis ligula, sed rutrum orci ullamcorper in. In tempor felis nisi, non luctus est egestas ac. Ut mollis faucibus laoreet. Suspendisse aliquam urna eget euismod convallis. Proin nibh metus, porttitor vitae sollicitudin sit amet, lobortis eget erat. Sed auctor quam vel tincidunt feugiat.";

results.photos = [];
results.photos[0] = "result_table.png";
results.photos[1] = "results_pic.jpg";

results.comments = [];
    
results.comments[0] = {};
results.comments[0].hierarchy = 1.0;
results.comments[0].subject = "Measurements";
results.comments[0].userName = "Mary Cotton";
results.comments[0].date = "Aug 16, 2006";
results.comments[0].text = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ut ornare velit vel nunc. Donec molestie. Nulla tincidunt nisl non elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In condimentum enim vitae pede.";
    
results.comments[1] = {};
results.comments[1].hierarchy = 1.1;
results.comments[1].subject = "Measurements";
results.comments[1].userName = "Jed Fahey";
results.comments[1].date = "Aug 16, 2006";
results.comments[1].text = "Phasellus auctor vulputate ante. Sed at ipsum. Cras purus. Pellentesque vestibulum nisi a enim. Duis rutrum condimentum enim. Cras sed urna. Vivamus dictum ipsum ut felis.";   

//console.log(JSON.stringify(results));
return results;  
};


exports.makeStudyUpdatesJson = function() {   

var studyUpdates = {};
studyUpdates.updates = [];
studyUpdates.updates[0] = {};
    
studyUpdates.updates[0].subject = "Moringa harvested first time";  
studyUpdates.updates[0].date = "Aug 30, 2006";
studyUpdates.updates[0].photo = "moringa_harvested.jpg";
studyUpdates.updates[0].desc = "We planted the Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.";

studyUpdates.updates[0].comments = [];

studyUpdates.updates[1] = {};
studyUpdates.updates[1].subject = "Progress of Moringa growth";  
studyUpdates.updates[1].date = "Aug 20, 2006";
studyUpdates.updates[1].photo = "progress_of_moringa.jpg";
studyUpdates.updates[1].desc = "The Moringa is growing Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.";

studyUpdates.updates[1].comments = [];

studyUpdates.updates[2] = {};
studyUpdates.updates[2].subject = "Moringa planted today";  
studyUpdates.updates[2].date = "Aug 6, 2006";
studyUpdates.updates[2].photo = "moringa_planted.jpg";
studyUpdates.updates[2].desc = "We planted the Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. \n Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.ligula id dictum. Donec ac ultrices turpis. Nullam lobortis felis quis ipsum mollis, ac accumsan diam faucibus. In nisl elit, tincidunt id odio sed, gravida tempus sapien. Nunc convallis pretium quam ultrices dignissim. Proin risus mi, blandit non est at, molestie tempus arcu. \n Mauris tempor ipsum vitae massa pellentesque, ac posuere sem sollicitudin. Cras justo neque, tincidunt non luctus ut, adipiscing sed lectus. Fusce ornare pretium leo, ut tincidunt quam adipiscing eget. Mauris at sapien diam. Duis sit amet est et sem tempor placerat. Suspendisse pulvinar iaculis ligula, sed rutrum orci ullamcorper in. In tempor felis nisi, non luctus est egestas ac. Ut mollis faucibus laoreet. Suspendisse aliquam urna eget euismod convallis. Proin nibh metus, porttitor vitae sollicitudin sit amet, lobortis eget erat. Sed auctor quam vel tincidunt feugiat.";

studyUpdates.updates[2].comments = [];
    
studyUpdates.updates[2].comments[0] = {};
studyUpdates.updates[2].comments[0].hierarchy = 1.0;
studyUpdates.updates[2].comments[0].subject = "Measurements";
studyUpdates.updates[2].comments[0].userName = "Mary Cotton";
studyUpdates.updates[2].comments[0].date = "Aug 16, 2006";
studyUpdates.updates[2].comments[0].text = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Ut ornare velit vel nunc. Donec molestie. Nulla tincidunt nisl non elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In condimentum enim vitae pede."; 

studyUpdates.updates[2].comments[1] = {};
studyUpdates.updates[2].comments[1].hierarchy = 1.1;
studyUpdates.updates[2].comments[1].subject = "Measurements";
studyUpdates.updates[2].comments[1].userName = "Jed Fahey";
studyUpdates.updates[2].comments[1].date = "Aug 16, 2006";
studyUpdates.updates[2].comments[1].text = "Phasellus auctor vulputate ante. Sed at ipsum. Cras purus. Pellentesque vestibulum nisi a enim. Duis rutrum condimentum enim. Cras sed urna. Vivamus dictum ipsum ut felis. ";

studyUpdates.updates[2].comments[2] = {};
studyUpdates.updates[2].comments[2].hierarchy = 1.2;
studyUpdates.updates[2].comments[2].subject = "Measurements";
studyUpdates.updates[2].comments[2].userName = "Mark Earnest";
studyUpdates.updates[2].comments[2].date = "May 8th, 2007";
studyUpdates.updates[2].comments[2].text = "Phasellus auctor vulputate ante. Sed at ipsum. Cras purus. Pellentesque vestibulum nisi a enim. Duis rutrum condimentum enim. Cras sed urna. Vivamus dictum ipsum ut felis. ";

//console.log(JSON.stringify(studyUpdates));    
return studyUpdates; 
    
};


exports.makeUserProfileJson = function() {

var userProfileSet = {};
userProfileSet.userProfiles = [];
    
var userProfile = {};
userProfile.name = "Mark Olson";
userProfile.city = "Mexico SD";
userProfile.state = "";
userProfile.country = "Mexico";
userProfile.organization = "Universidad Nacional Autonama de Mexico";
userProfile.email = "";
userProfile.photo = "mark_olson.jpg";

userProfile.researchInterests = [];
userProfile.researchInterests[0] = "Moringa";
userProfile.researchInterests[1] = "Protein";
userProfile.researchInterests[2] = "Trees shaped like broccoli";

userProfile.currentStudies = [];
userProfile.currentStudies[0] = "Effects of Moringa oleifera leaves on cattle’s daily milk production";

userProfile.pastStudies = [];
userProfile.pastStudies[0] = "A test of social marketing the dietary use of Moringa oleifera leaves among rual people in Orissa, India";


userProfileSet.userProfiles.push(userProfile);
    
var userProfile2 = {};
userProfile2.name = "Jed Fahey ";
userProfile2.city = "Baltimore";
userProfile2.state = "Maryland";
userProfile2.country = "USA";
userProfile2.organization = "Johns Hopkins";
userProfile2.email = "";
userProfile2.photo = "jed_fahey.jpg";
    
    
userProfileSet.userProfiles.push(userProfile2);
    
    
//console.log(JSON.stringify(userProfileSet));
return userProfileSet;
    
};