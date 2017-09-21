//global variables for any function
var	now = new Date(), yr = now.getFullYear(), mth = now.getMonth();
	DOW = now.getDay(),	cDate = now.getDate();
	cc="&#9711;", zr="&#9450;", gl=9312;
	vers = "v0.1.1 <br> Created by RAL <br> chezralapps@gmail.com";	
//console.log("");
 
$(document).bind('mobileinit',function(){
    $.mobile.changePage.defaults.changeHash = false;
    $.mobile.hashListeningEnabled = false;
    $.mobile.pushStateEnabled = false;
	$.mobile.loader.prototype.options.text = "Please Wait";
	$.mobile.loader.prototype.options.textVisible = true;
});

//on page load, show start screen 
$(document).on('pagebeforeshow', '#Main_pg', function(){       
	$('#mFooter').hide();
	LoadStart();	
});

// This function defines the Start page
function LoadStart() {
			
	//var StData = '<h3>Welcome to the PRTA app!</h3> ';	
	//LoadFooter();	
	//$('#mContent').html(StData).trigger("create");
	$( ".ui-overlay-c" ).addClass( "SplashPic" );
	var closesplash = setTimeout(ShowNews, 3000);  
}
// This function defines the footer 
function LoadFooter() {
    var mFoot = '<div id="AdSpace"></div>';
        mFoot += '<div data-role="navbar" data-theme="c"><ul>';
        mFoot += '<li id="News"><a href="#" class="ui-btn-active2" data-icon="star">News</a></li>'; //remove '2' set back active
        mFoot += '<li id="Games"><a href="#" data-icon="clock">Games</a></li>';
        mFoot += '<li id="Calendar"><a href="#" data-icon="calendar">CALENDAR</a></li>';
        mFoot += '</ul></div></div>';
	
	$('#mFooter').html(mFoot).trigger("create");
	$('#mFooter').show();
}	

$(document).on('click', '#Home', function() {
	LoadStart();
 });  
$(document).on('click', '#News', function() {	
		ShowNews();		
 });
$(document).on('click', '#Games', function() {	
		ShowWeek();
		$( ".ui-overlay-c" ).removeClass( "bgpic" );
 });
$(document).on('click', '#Calendar', function() {	
		ShowCalendar();
		$( "#Day"+(fDay-cDate) ).addClass( "ui-btn-active" );
		$( ".ui-overlay-c" ).addClass( "bgpic" );
 });
$(document).on('click', '#Back', function() {	
		ShowScores();
});	
$(document).on('click', '.Day', function() {		//[id^="Day"]
		var str = this.className;
		var str2 = str.slice(0,13);
		var str3 = new Date(Number(str2));
		alert(str3.toDateString());
});	
$(document).on('click', '#Prev', function() {	
		mth--;	
		if(mth<0){mth=11,yr--};
		ShowCalendar();
});
$(document).on('click', '#Next', function() {	
		mth++;		
		if(mth==12){mth=0,yr++};
		ShowCalendar();
});
	
 $(document).on('submit', '#NmFrm', function(e) {		
	e.preventDefault();
	var login=prompt("Password required","");
	if (login!==null && login!=="") {
		if (login == "smscrew")  {
			
            var pName = NmBx.value;
		if (pName !== "") {	
			$.mobile.loading('show'); //show the page loader
			SMSready = false;
			
			pName = pName.charAt(0).toUpperCase() + pName.slice(1); //covert to Title	.toLowerCase()
			var plyrs = Number(sessionStorage["TotalPlayers"]);	
			var temp = {Name:pName, Wins:0, Loss:0};
			
			firebase.database().ref('NumPlayers').set({"TotalPlayers":plyrs+1});
			firebase.database().ref('Players/P'+(plyrs+1)).set(temp);
			
			NmBx.value="";
			PlayerNm = [];
			SMSready = false;
			GetPlayers();
			$.mobile.loading( "hide");		
			$("#NamesList").append("<li>"+pName+"</li>").listview('refresh');
		return false;		

		} //end check if blank
			
		} // end check password
	} // end check login	
 }); 
 $(document).on('submit', '#scoreFrm', function(e) {
	e.preventDefault();
	var NewLog = firebase.database().ref('Stats/').push();	// new log with auto-generated id
	NewLog.set({Date:CurDate});
	var WinTeam = this.TeamPick.value;	
	
	if(WinTeam=="B"){			
			myAr.reverse();		//reverse scoring order for team B
	}
	
	for (var q = 0; q < myAr.length; q++) {		//loop for both teams		
		var player = this[myAr[q]].value;
		var playerID = PlayerNm[player].ID;
		
		if(q<5) {
			PlayerNm[player].childData.Wins = PlayerNm[player].childData.Wins+1;
			NewLog.update({["W"+(q+1)] : playerID});
		}
		else {
			PlayerNm[player].childData.Loss = PlayerNm[player].childData.Loss+1;
			NewLog.update({["L"+(q-5+1)] :playerID});
		}
		firebase.database().ref('Players/'+(playerID)).set(PlayerNm[player].childData);
		
	}
	
	if(WinTeam=="B"){			
			myAr.reverse();		//reset the array
			//console.log(myAr);
	}
	alert("Congrats To Team-"+WinTeam+" !");	//notify of winning team
 });
 
 
// This function loads the Names page
function ShowNews() {
		//data-priority="2" data-role="table" data-mode="columntoggle" &#9675;
		var NewsData = '<ul data-role="listview" data-inset="true">';
			NewsData += '<li data-role="list-divider">Friday, October 8, 2010 <span class="ui-li-count">2</span></li>';
			NewsData += '<li><a href="index.html"><h2>Stephen Weber</h2>';
			NewsData += '<p><strong>Invited to a meeting at Filament Group in Boston, MA</strong></p>';
			NewsData += '<p>A meeting with the jQuery team.</p>';
			NewsData += '<p class="ui-li-aside"><strong>6:24</strong>PM</p></a></li>';
			
			NewsData += '<li><a href="index.html"><h2>jQuery Team</h2>';
			NewsData += '<p><strong>Boston Conference Planning</strong></p>';
			NewsData += ' <p>We need to start gathering a list of sponsors and speakers.</p>';
			NewsData += '<p class="ui-li-aside"><strong>9:18</strong>AM</p></a></li>';
			
			NewsData += '<li data-role="list-divider">Thursday, October 7, 2010 <span class="ui-li-count">1</span></li>';
			NewsData += '<li><a href="index.html"><h2>Avery Walker</h2>';			
 			NewsData += '';
			NewsData += '<p><strong>Re: Dinner Tonight</strong></p>';
			NewsData += '<p>Plan on meeting at Highland Kitchen at 8:00 tonight.</p>';
			NewsData += '<p class="ui-li-aside"><strong>4:48</strong>PM</p></a></li></ul>';  	
   

	       $('#mContent').html(NewsData).trigger("create");		   
		   LoadFooter();	
		   $( ".ui-overlay-c" ).removeClass( "SplashPic" );	//remove background pic
}
function ShowWeek() {
		var WkData = '<table class="ui-body-d ui-shadow table-stripe ui-responsive">';
			WkData += '<thead><tr class="ui-bar-d"><th>Date</th><th>Home</th><th>vs</th><th>Away</th><th>Location</th>';
			WkData += '<tbody>';
			WkData += '<tr><td class="Dates">Sep-10</td><td><a href="#">CC</a> <span class="goals">'+cc+'</span></td> <td>vs</td>';
			WkData += '<td><a href="#">SMN</a> <span class="goals">'+cc+'</span></td><td>Weymouth</td></tr>';
			WkData += '<tr><td class="Dates">Sep-11</td><td><a href="#">CC</a> <span class="goals">'+cc+'</span></td> <td>vs</td>';
			WkData += '<td><a href="#">SMN</a> <span class="goals">'+cc+'</span></td><td>Weymouth</td></tr>';
			WkData += '<tr><td class="Dates" >Sep-12</td><td><a href="#">CC</a> <span class="goals">'+cc+'</span></td> <td>vs</td>';
			WkData += '<td><a href="#">SMN</a> <span class="goals">'+cc+'</span></td><td>Weymouth</td></tr>';
			WkData += '<tr><td class="Dates">Sep-13</td><td><a href="#">CC</a> <span class="goals">'+cc+'</span></td> <td>vs</td>';
			WkData += '<td><a href="#">SMN</a> <span class="goals">'+cc+'</span></td><td>Weymouth</td></tr>';
			WkData += '<tr><td class="Dates">Sep-14</td><td><a href="#">CC</a> <span class="goals">'+cc+'</span></td> <td>vs</td>';
			WkData += '<td><a href="#">SMN</a> <span class="goals">'+cc+'</span></td><td>Weymouth</td></tr>';

			WkData += '<tr><td class="Dates">Sep-10</td><td><a href="#">CC</a> <span class="goals">'+cc+'</span></td> <td>vs</td>';
			WkData += '<td><a href="#">SMN</a> <span class="goals">'+cc+'</span></td><td>Weymouth</td></tr>';
			WkData += '<tr><td class="Dates">Sep-11</td><td><a href="#">CC</a> <span class="goals">'+cc+'</span></td> <td>vs</td>';
			WkData += '<td><a href="#">SMN</a> <span class="goals">'+cc+'</span></td><td>Weymouth</td></tr>';
			WkData += '<tr><td class="Dates" >Sep-12</td><td><a href="#">CC</a> <span class="goals">'+cc+'</span></td> <td>vs</td>';
			WkData += '<td><a href="#">SMN</a> <span class="goals">'+cc+'</span></td><td>Weymouth</td></tr>';
			WkData += '<tr><td class="Dates">Sep-13</td><td><a href="#">CC</a> <span class="goals">'+cc+'</span></td> <td>vs</td>';
			WkData += '<td><a href="#">SMN</a> <span class="goals">'+cc+'</span></td><td>Weymouth</td></tr>';
			WkData += '<tr><td class="Dates">Sep-14</td><td><a href="#">CC</a> <span class="goals">'+cc+'</span></td> <td>vs</td>';
			WkData += '<td><a href="#">SMN</a> <span class="goals">'+cc+'</span></td><td>Weymouth</td></tr>';

			WkData += '<tr><td class="Dates">Sep-10</td><td><a href="#">CC</a> <span class="goals">'+cc+'</span></td> <td>vs</td>';
			WkData += '<td><a href="#">SMN</a> <span class="goals">'+cc+'</span></td><td>Weymouth</td></tr>';
			WkData += '<tr><td class="Dates">Sep-11</td><td><a href="#">CC</a> <span class="goals">'+cc+'</span></td> <td>vs</td>';
			WkData += '<td><a href="#">SMN</a> <span class="goals">'+cc+'</span></td><td>Weymouth</td></tr>';
			WkData += '<tr><td class="Dates" >Sep-12</td><td><a href="#">CC</a> <span class="goals">'+cc+'</span></td> <td>vs</td>';
			WkData += '<td><a href="#">SMN</a> <span class="goals">'+cc+'</span></td><td>Weymouth</td></tr>';
			WkData += '<tr><td class="Dates">Sep-13</td><td><a href="#">CC</a> <span class="goals">'+cc+'</span></td> <td>vs</td>';
			WkData += '<td><a href="#">SMN</a> <span class="goals">'+cc+'</span></td><td>Weymouth</td></tr>';
			WkData += '<tr><td class="Dates">Sep-14</td><td><a href="#">CC</a> <span class="goals">'+cc+'</span></td> <td>vs</td>';
			WkData += '<td><a href="#">SMN</a> <span class="goals">'+cc+'</span></td><td>Weymouth</td></tr>';

			WkData += '<tr><td class="Dates">Sep-10</td><td><a href="#">CC</a> <span class="goals">'+cc+'</span></td> <td>vs</td>';
			WkData += '<td><a href="#">SMN</a> <span class="goals">'+cc+'</span></td><td>Weymouth</td></tr>';
			WkData += '<tr><td class="Dates">Sep-11</td><td><a href="#">CC</a> <span class="goals">'+cc+'</span></td> <td>vs</td>';
			WkData += '<td><a href="#">SMN</a> <span class="goals">'+cc+'</span></td><td>Weymouth</td></tr>';
			WkData += '<tr><td class="Dates" >Sep-12</td><td><a href="#">CC</a> <span class="goals">'+cc+'</span></td> <td>vs</td>';
			WkData += '<td><a href="#">SMN</a> <span class="goals">'+cc+'</span></td><td>Weymouth</td></tr>';
			WkData += '<tr><td class="Dates">Sep-13</td><td><a href="#">CC</a> <span class="goals">'+cc+'</span></td> <td>vs</td>';
			WkData += '<td><a href="#">SMN</a> <span class="goals">'+cc+'</span></td><td>Weymouth</td></tr>';
			WkData += '<tr><td class="Dates">Sep-14</td><td><a href="#">CC</a> <span class="goals">'+cc+'</span></td> <td>vs</td>';
			WkData += '<td><a href="#">SMN</a> <span class="goals">'+cc+'</span></td><td>Weymouth</td></tr>';			
			WkData += '</tbody> </table>';
			
	       $('#mContent').html(WkData).trigger("create");		
}
// This function loads the Calendar page
function ShowCalendar() {
	var firstDay = new Date(yr, mth, 1), DOWFD = firstDay.getDay();
		lastDay = new Date(yr, mth + 1, 0);
		BeginMth = firstDay.setDate(firstDay.getDate()-DOWFD-1);
		p = new Date(BeginMth);
		fDay = p.getDate();
		Months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
		cMTH = Months[mth];
	
	var CalData = '<div data-role="navbar"><ul>';
		CalData += '<li class="myEnds"><a id="Prev" data-theme="c" href="#"> < </a></li>';
		CalData += '<li class="mthHD"><a id="CalMth" data-theme="d" href="#">'+cMTH+' '+yr+'</a></li>';
		CalData += '<li class="myEnds"><a id="Next" data-theme="c" href="#"> > </a></li></ul></div>';
		
		CalData += '<div data-role="navbar" data-grid="b"><ul>';
		CalData += '<li class="mytab"><a data-theme="b" href="#">Su</a></li>';
		CalData += '<li class="mytab"><a data-theme="b" href="#">Mo</a></li>';
		CalData += '<li class="mytab"><a data-theme="b" href="#">Tu</a></li>';
		CalData += '<li class="mytab"><a data-theme="b" href="#">We</a></li>';
		CalData += '<li class="mytab"><a data-theme="b" href="#">Th</a></li>';
		CalData += '<li class="mytab"><a data-theme="b" href="#">Fr</a></li>';
		CalData += '<li class="mytab"><a data-theme="b" href="#">Sa</a></li></ul></div>';
		
		CalData += '<div data-role="navbar" data-grid="b">';
		g = new Date(BeginMth);
		
	for(var w=0; w<=5; w++){			//loop for each week
		CalData += '<ul class="NavbarCal">';
		for(var d=0; d<=6; d++){		//loop for each day				
			//get the date of 1st date of week				
			var z = g.setDate(g.getDate()+1);
			tDAY = g.getDate();
			CalData += '<li class="mytab"><a class="'+z+' Day" href="#">'+tDAY+'</a></li>';	//id="Day'+(d+(w*7))+'" 
		}
		CalData += '</ul>';
	}	
		CalData += '</div>';	//end navbar
	
	$('#mContent').html(CalData).trigger("create");	
}


