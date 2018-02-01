var frameRate = 60;
frameRate = 1000 / frameRate;

window.onload = function(){
	fixHeader();

	//Scroll to Link inside Site
	var links = document.getElementsByTagName("a");
	for(var i= 0; i<links.length-1;i++){
		var linkText = links[i].getAttribute("href");
		if(linkText.substring(0,1) == "#" && linkText != "#" && linkText != "#nav"){
			console.log(linkText);
			links[i].addEventListener("click", function(event){
				event.preventDefault();
				var elemntId = this.getAttribute("href");
				elemntId  = elemntId.substring(1,elemntId.length);
				var elemnt = document.getElementById(elemntId);
				scrolltoObj(elemnt);
			});
		}
	}

	// Team-Mitglied auswählen
	if(document.getElementsByClassName("team_img").length>0){
		var team = document.getElementsByClassName("team_img");
		for(var i=0; i<team.length; i++){
			team[i].addEventListener("mouseover", function(){ selectMember(this); });
		}
		selectMember(team[0]);
	}

	//Read more Funktion
	var more = document.getElementsByClassName("more");
	for(var i=0; i < more.length;i++){
		var readmore = document.createElement('a');
		readmore.innerHTML = "<i class='fa fa-caret-down' aria-hidden='true'></i>Mehr anzeigen";
		readmore.setAttribute("class", "readmore");
		readmore.setAttribute("style", "padding-bottom:15px; display:block");
		if(more[i].firstElementChild.tagName == "DIV"){
			readmore.setAttribute("style", "padding-left:30px;");
		}
		readmore.addEventListener("click", function(){
			if(this.previousElementSibling.style.display=="none"){
				this.previousElementSibling.style.display="block";
				this.innerHTML = "<i class='fa fa-caret-up' aria-hidden='true'></i>Weniger anzeigen";
			}else{
				this.previousElementSibling.style.display="none";
				this.innerHTML = "<i class='fa fa-caret-down' aria-hidden='true'></i>Mehr anzeigen";
			}
			this.more = !this.more;
		});
		more[i].parentNode.appendChild(readmore);
		more[i].style.display="none";
	}

	//Slideshow
	var slideshow = document.getElementsByClassName("slideshow");
	for(var i=0; i < slideshow.length; i++){
		createSlideshow(slideshow[i]);
	}
}

// Smooth Scrolling
function scrolltoObj(obj){
	var speed = 0.05;
	var counter = 0;
	counter ++;
	var from = window.pageYOffset;
	var to = obj.offsetTop + 20;
	var scroll = setInterval(function(){
		//control if someone manually scrolled
		if(parseInt(from) != window.pageYOffset){
			console.log(to +", "+ window.pageYOffset);
			clearInterval(scroll);
		}
		from = lerp(window.pageYOffset, to, speed);
		window.scrollTo(0, from);
		if(from > (to - 1) && from < (to + 1)){
			window.scrollTo(0, to);
			console.log(to +", "+ window.pageYOffset);
			clearInterval(scroll);
		}
	}, frameRate);
}

//Fixed Header
window.addEventListener("scroll", function(){
	fixHeader();
});

function fixHeader(){
	var hoehe = window.pageYOffset;
	var breite = window.innerWidth;
	var header = document.getElementById("header");
	var body = document.getElementsByTagName("body")[0];

	if(breite >= 1000){
		body.setAttribute("style", "margin-top: 250px;");
		if(hoehe < 180){
			header.setAttribute("style", "position:fixed; top:" + (-hoehe) + "px;");
		}else{
			header.setAttribute("style", "position:fixed; top:-180px;");
		}
	}else if(breite >= 500){
		body.setAttribute("style", "margin-top: 200px;");
		if(hoehe < 55){
			header.setAttribute("style", "position:fixed; top:" + (-hoehe) + "px;");
		}else{
			header.setAttribute("style", "position:fixed; top:-55px;");
		}
	}else{
		body.setAttribute("style", "margin-top: 155px;");
		if(hoehe < 55){
			header.setAttribute("style", "position:fixed; top:" + (-hoehe) + "px;");
		}else{
			header.setAttribute("style", "position:fixed; top:-55px;");
		}
	}
}

// Team-Mitglied auswählen
function selectMember(x){
	// Bilder ein- und ausblenden
	var team = document.getElementsByClassName("team_img");
	for(var i=0; i < team.length; i++){
		team[i].style.opacity = "0.2";
	}
	x.style.opacity = "1";

	// Texte aus- und einblenden
	var teamText = document.getElementsByClassName("team_member");
	for(var i = 0; i<teamText.length; i++){
		teamText[i].style.display="none";
	}
	document.getElementById(x.name).style.display="block";
}

// Slideshow
function createSlideshow(slideshow){
	var actual =0;
	var slides = slideshow.getElementsByClassName("slide");
	for(var i=0; i<slides.length; i++){
		slides[i].style.display= "none" ;
	}
	slides[actual].style.display="block";

	var left_button = document.createElement('div');
	left_button.setAttribute("class", "slidebutton-left");
	left_button.setAttribute("style", "left:0px;");
	var left_arrow = document.createElement('i');
	left_arrow.setAttribute("class", "fa fa-chevron-left");
	left_arrow.setAttribute("style", "text-align:left;");
	left_button.appendChild(left_arrow);

	var right_button = document.createElement('div');
	right_button.setAttribute("class", "slidebutton-right");
	right_button.setAttribute("style", "right:0px;");
	var right_arrow = document.createElement('i');
	right_arrow.setAttribute("class", "fa fa-chevron-right");
	right_arrow.setAttribute("style", "text-align:right;");
	right_button.appendChild(right_arrow);

	var num = document.createElement('div');
	num.setAttribute("class", "slideNum");
	num.setAttribute("style", "color:#fff;");
	num.innerHTML=(actual+1) +" von " + slides.length;
	slides[0].parentNode.appendChild(num);

	//Automatische Slideshow
	var slideTime = 6 * 1000;
	var autoSlide = setInterval(function(){
		actual = changeSlide(slides,actual,num,1);
	}, slideTime);

	left_button.addEventListener("mousedown", function(){
		clearInterval(autoSlide);
		actual = changeSlide(slides,actual,num,-1);
		autoSlide = setInterval(function(){
			actual = changeSlide(slides,actual,num,1);
		}, slideTime);
	});

	right_button.addEventListener("mousedown", function(){
		clearInterval(autoSlide);
		actual = changeSlide(slides,actual,num,1);
		autoSlide = setInterval(function(){
			actual = changeSlide(slides,actual,num,1);
		}, slideTime);
	});

	slides[0].parentNode.insertBefore(left_button, slides[0]);
	slides[0].parentNode.insertBefore(right_button, slides[0]);
}

function changeSlide(slides,actual,num,change){
	slides[actual].style.display ="none";
	actual += change;
	if(actual < 0){
		actual = slides.length-1;
	}else if(actual > slides.length-1){
		actual = 0;
	}
	if (change>0){
		fade(slides[actual],5,0.2,0,1);
	}else{
		fade(slides[actual],-5,0.2,0,1);
	}
	num.innerHTML=(actual+1) +" von " + slides.length;
	return actual;
}

function fade(obj, start_pos, start_op, target_pos, target_op){
	clearInterval(fader);
	obj.style.display="block";
	//obj.parentElement.style.height = obj.offsetHeight +"px";
	//obj.style.position="absolute";
	obj.style.marginLeft = start_pos + "%";
	obj.style.opacity = start_op;
	var fader = setInterval(function(){
		var pos = parseFloat(obj.style.marginLeft);
		var op = parseFloat(obj.style.opacity);
		pos = lerp(pos,target_pos ,0.1);
		op = lerp(op,target_op, 0.1);
		obj.style.marginLeft = pos + "%";
		obj.style.opacity = op;
		if(pos > target_pos - 0.5 && pos < target_pos + 0.5 && op > target_op - 0.01 && op < target_op + 0.01){
			obj.style.marginLeft = target_pos + "%";
			obj.style.opacity = target_op;
			clearInterval(fader);
		}
	}, frameRate);
}

function lerp(a,b,t){
	a += (b - a) * t;
	return a;
}
