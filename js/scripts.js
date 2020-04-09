 
var ourFilms=["Yojimbo","In+A+Lonely+Place","John+Carpenters+The+Thing","Casablanca","Double+Indemnity","Dersu","Bringing+Up+Baby","Twelve+Angry+Men","The+Seventh+Seal",
"The+Apartment","2001","Winchester+73","High+Noon","Harold+And+Maud","The+Third+Man","Coming+Home","Tokyo+Story",
"Otto+e+mezzo","Il+Bidone",
"Modern+Times","Some+Like+It+Hot","Sweet+Smell+Of+Success","Ace+In+THe+Hole","Face+In+The+Crowd","Roma","Sunset+Boulevard","Toni+Erdmann","The+Man+Who+Shot+Liberty+Valance","The+Big+Sleep","Bicycle+Thieves","The+Battle+Of+Algiers", "This+Gun+For+Hire","On+The+Waterfront","Roman+Holiday","Dog+Day+Afternoon","Pickup+On+South+Street","The+Entertainer","Rififi","Il+vangelo+secondo+Matteo","The+Searchers","The+Spy+Who+Came+In+From+The+Cold","Murder,+My+Sweet","Ascenseur+Pour+l'échafaud","Night+Of+The+Hunter","Kind+Hearts+And+Coronets","Rome,+Open+City","La+Règle+Du+Jeu","It+Happened+One+Night","Mr.+Smith+Goes+To+Washington","Out+Of+The+Past","The+Bad+Sleep+Well","Ikiru",
"Who's+Afraid+Of+Virginia+Woolf?","A+Streetcar+Named+Desire","Ugetsu","Throne+Of+Blood","Wild+Strawberries","African+Queen","Butch+Cassidy+And+The+Sundance+Kid","Harakiri","High+And+Low","La+Strada","Shampoo","The+Circus","Nosferatu","I+Vitelloni","Pickpocket","Zatoichi","Stagecoach","Midnight+Cowboy","The+White+Sheik","The+Shop+Around+The+Corner","Being+There","The+Lives+Of+Others","True+Grit","His+Girl+Friday","City+Lights","Sherlock+Jr." ]
console.log(ourFilms.length)
var exceptions=["Seven+Samurai","The+Killing","Out+Of+The+Past","OldBoy","Ran","Late Spring"]
var BASE_URL = "http://image.tmdb.org/t/p/w185/";
var API_KEY = "0930f20caa92e0dae95dba06f26b55e4";
var QUERY="https://api.themoviedb.org/3/search/movie?api_key=fa77b5a712636b454eab3f3147d80d09&query="
// var MOVIE_POP = "http://api.themoviedb.org/3/movie/popular?api_key=fa77b5a712636b454eab3f3147d80d09";
var MOVIE_TOP = "http://api.themoviedb.org/3/movie/top_rated?api_key=fa77b5a712636b454eab3f3147d80d09";
var TEST_PIC = BASE_URL + "/IfB9hy4JH1eH6HEfIgIGORXi5h.jpg";
var MOVIE_TRAILERa = "http://api.themoviedb.org/3/movie/";
var MOVIE_TRAILERb = "/videos?api_key=fa77b5a712636b454eab3f3147d80d09";
var MOVIE_TRAILERr = "/reviews?api_key=fa77b5a712636b454eab3f3147d80d09";
var YOU_TUBE = "https://www.youtube.com/watch?v=";
var MOVIE_POPa = "https://api.themoviedb.org/3/discover/movie?api_key=fa77b5a712636b454eab3f3147d80d09"
var YEARa="&sort_by=revenue.desc&primary_release_date.gte="
var YEARb="-01-01&primary_release_date.lte="
var YEARc="-12-31";
var year="2019";
// URL: /discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc
res=[];


replies=[];
//http://image.tmdb.org/t/p/w185/IfB9hy4JH1eH6HEfIgIGORXi5h.jpg

$(document).ready(function() {
console.log("readY")
ourFilms.forEach(function(film){
    replies.length=0;
$.getJSON(QUERY+film)
.done(update)
.fail(handleErr);
  
})});

function update(response) {

res=response.results;

//http://api.themoviedb.org/3/movie/263115?api_key=###&apprend_to_response=videos
var picIds=[];

if(!res[0].poster_path){res[0].poster_path=res[1].poster_path}
replies.push([res[0].id,res[0].overview,res[0].backdrop_path,res[0].poster_path,res[0].title]);


 
var r = new Array();var mods= new Array(), j = -1;
for (var key=0, size=replies.length; key<size; key++){
    
 r[++j] ='<div data-toggle="modal" data-target="#myModal'+key+'"><img src=';
 r[++j] =BASE_URL+replies[key][3];
r[++j] =" class=\"posters\" id="
r[++j] ='\"'+replies[key][2]+'\">';
 

 
 
  
 r[++j] = '</div>';
 mods.push('<div id="myModal'+key+'" class="modal fade" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title"><p>'+replies[key][4]+'</p></h4></div><div class="modal-body"><p>'+replies[key][1]+'</p></div><div class="modal-footer"><button type="button" class="btn btn-default" id='+replies[key][0]+'>Trailer</button></div></div></div></div>')

 
// displayResultCell(BASE_URL+replies[0][3]) ;
	
 
}

$('#theList').html(r.join(''));
$('#theModals').html(mods.join(''));
$('#theList').addClass("animated fadeIn");
for (var key=0, size=replies.length; key<size; key++){
picIds.push(document.getElementById(replies[key][0]) );
$( picIds[key] ).click(function(){
$.getJSON(MOVIE_TRAILERa+event.target.id+MOVIE_TRAILERb)
.done(updateTrailer)
.fail(handleErr);
});




;}



//displayResult(BASE_URL+replies[0][2]) ;
}



function handleErr(jqxhr, textStatus, err) {
console.log("Request Failed: " + textStatus + ", " + err);
}
function displayResult(poster_path)
{

$("#topFilm").attr("src",poster_path);
}function displayResultCell(path)
{   
var firstRow=document.getElementById("theList").rows[0];
var x=firstRow.insertCell(-1);
x.innerHTML="New cell";

var img = document.createElement('img');
img.src = path;
x.appendChild(img);
}

function setYear() {
 $('#theList').removeClass("animated fadeIn");
  
 var year= document.getElementById("filmYear").value;

 $.getJSON(MOVIE_POPa+YEARa+year+YEARb+year+YEARc)
.done(update)
.fail(handleErr); 
 return false;
  
}
function updateTrailer(response) {
resTrailer=response.results;
 
location.href = YOU_TUBE+resTrailer[0].key;

}

function popUp(response) {
     
    alert(response)
     
    
    }

function stripPlus(film){
    spaced=""
    for(var i=0;i<film.length;i++){
        if(film.charAt(i)=="+"){
            spaced+=" ";
        }
        else spaced+=film.charAt(i)
    }
    returnspaced
}