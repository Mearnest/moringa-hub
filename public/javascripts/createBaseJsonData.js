makeInitialHeaderJson();
//makeUserProfile();

function makeInitialHeaderJson() {

var initialContent = {};

initialContent.header = "Moringa Hub";
initialContent.subHeader = "This is the main body</h4>";
initialContent.bigNotice = "Add stuff on document ready.";

console.log(JSON.stringify(initialContent));

}


function makeUserProfile() {

var userProfile = {};
userProfile.name = "Mark Olson";
userProfile.city = "Mexico SD";
userProfile.state = "";
userProfile.country = "Mexico";
userProfile.organization = "Universidad Nacional Autonama de Mexico";
userProfile.email = "";

userProfile.researchInterests = [];
userProfile.researchInterests[0] = "Moringa";
userProfile.researchInterests[1] = "Protein";
userProfile.researchInterests[2] = "Trees shaped like broccoli";

userProfile.currentStudies = [];
userProfile.currentStudies[0] = "Effects of Moringa oleifera leaves on cattle’s daily milk production";

userProfile.pastStudies = [];
userProfile.pastStudies[0] = "A test of social marketing the dietary use of Moringa oleifera leaves among rual people in Orissa, India";

console.log(JSON.stringify(userProfile));

/*
{"name":"Mark Olson","city":"Mexico SD","state":"","country":"Mexico","organization":"Universidad Nacional Autonama de Mexico","email":"","researchInterests":["Moringa","Protein","Trees shaped like broccoli"],"currentStudies":["Effects of Moringa oleifera leaves on cattle’s daily milk production"],"pastStudies":["A test of social marketing the dietary use of Moringa oleifera leaves among rual people in Orissa, India"]}
*/
    
}