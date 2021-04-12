// 1. paramètres généraux et habillage
///Paramètre généraux de la carte
var map = L.map('map',
{
	maxZoom: 18,
	minZoom: 9,
	maxBounds: [
		[40, -6],
		[55, 9]
	],
});

//attribution
var attribMARGINOV = '<b>Données</b> © <a href="http://www.marginov.cnrs.fr/?page_id=214">MARGINOV</a>'



map.setView([44.35622,-0.76433], 9);
//fond de carte
// création d'une couche "osmfr"
//OSM FR utilise les données OSM avec une charte graphique développé pour le territoire français 
var osmfr = L.tileLayer('http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
{
	attribution: '<b>Fond de carte</b> © <a href="http://osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="http://openstreetmap.fr">OSM France</a><br>',
	opacity: 0.7,
	minZoom: 9,
	maxZoom: 18,
	
});


/*///paramètrage de la vue dela carte
var centerMaptest = [coucheTerritoires.getBounds().getCenter().lat,coucheTerritoires.getBounds().getCenter().lng];
//si le centerMap = auto est auto alros centre de gravité de la couche territoires, sinon utilisation de la valeur de centermap
function setMapCenter (centerMap){
	if (centerMap === "auto"){return centerMaptest;}else{return centerMap;}
}
map.setView(setMapCenter (centerMap), zoomMap);*/

//création des différents niveaux d'affichage des couches: les panes
map.createPane('205');
map.getPane('205').style.zIndex = 205;
map.createPane('600');
map.getPane('600').style.zIndex = 600;
map.createPane('610');
map.getPane('610').style.zIndex = 610;
map.createPane('615');
map.getPane('615').style.zIndex = 615;
map.createPane('620');
map.getPane('620').style.zIndex = 620;
map.createPane('630');
map.getPane('630').style.zIndex = 630;
map.createPane('635');
map.getPane('635').style.zIndex = 635;



// Ajouter ajout des tile layers	
// création d'une couche "bwLayer" un fond de carte en grisaille
var bwLayer = L.tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
{
	attribution: '<b>Fond de carte</b> © <a href="http://osm.org/copyright">OpenStreetMap</a><br>' + attribMARGINOV,
	opacity: 0.8,
	maxZoom: 19,
	
}).addTo(map);

var watercolor = L.tileLayer('http://c.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',{
	attribution:'<b>Fond de carte</b> © <a href="http://osm.org/copyright">OpenStreetMap</a><br><a href="http://maps.stamen.com/#watercolor/">Stamen</a>',
	opacity: 0.8,
	maxZoom: 19,
	
	});
	


var maplabels = L.tileLayer('http://a.tile.stamen.com/toner-labels/{z}/{x}/{y}.png',{
	attribution:'<b>Fond de carte</b> © <a href="http://osm.org/copyright">OpenStreetMap</a><br><a href="http://maps.stamen.com/#watercolor/">Stamen</a>',
	opacity: 0.8,
	maxZoom: 19,
	pane:'205',
	});
	
var stamenToner = L.tileLayer('http://a.tile.stamen.com/toner/{z}/{x}/{y}.png',{
	attribution:'<b>Fond de carte</b> © <a href="http://osm.org/copyright">OpenStreetMap</a><br><a href="http://maps.stamen.com/#toner/">Stamen</a>',
	opacity: 0.8,
	maxZoom: 19,
	pane:'205',
	});







//échelle
L.control.scale(
{
	imperial: false,
	maxWidth: 200,
	updateWhenIdle: false
}).addTo(map);

//flèche du nord
var urlNorthArray = '<img src="style/aceG8oMc4.png" style="width:30px;">'
var north = L.control(
{
	position: "topleft"
});
north.onAdd = function(map)
{
	var div = L.DomUtil.create("div", );
	div.innerHTML = urlNorthArray;
	return div;
}
north.addTo(map);

/// Affichage de la couche test_geojson

var geoLayer = L.geoJson(projetsEtudiant).addTo(map);

/*/// Création des points sur la carte

$.get('doc/test_2_csv.csv', function(csvContents) {
    var geoLayer = L.geoCsv(csvContents, {
		firstLineTitles: true, 
		fieldSeparator: ';',
		titles: ['ID','thema','pb','sujet','nom','lieu','lng','lat','descr','tags_enjeux','tags_ressources','strategie','acteurs','etudiants','date'],
		pointToLayer: function (feature,latlng){
			


///Paramètre de style des points
function getMarkerColor(d){
	{
	switch (d)
	{
		case "Identification de potentiels":
			return "#669900";
		case "Expérimentations théoriques avec les ressources":
			return "#e27100";	
			
		default:
			return "grey";
	}
}
}
			var marker = L.circleMarker(latlng,{radius:8,fillColor:getMarkerColor(feature.properties.thema),fillOpacity:0.9,color:'black',weight:1,});
			marker.bindPopup('<b>'+feature.properties.nom+'</b><br/><b>Coordonnées :</b> '+feature.geometry.coordinates+'<br/><img src="'+feature.properties.filename+'" alt="test" width="300"><br/><small>Projet © '+feature.properties.etudiants+'</small><br/><p>'+feature.properties.descr+'</p>');
			return marker;

///gestion des filtres	
//création d'un tableaux contenant les valeurs uniques des tags ressources
var TagsRessources1 = [];
var initSelectTagsR=[];
for (var i = 0; i < geoLayer.features.length; i++){
			initSelectTagsR.push(geoLayer.features[i].properties.tags_ressources)
	}
for (var j=0;j<initSelectTagsR.length;j++){
	for(var e=0;e<initSelectTagsR[j].length;e++){
		var iterator = initSelectTagsR[j].values();
		for (let elements of iterator) { 
			TagsRessources1.push(elements);
		} 
	}
}
function removeDuplicates(d)
{
	let unique = {};
	d.forEach(function(i)
	{
		if (!unique[i])
		{
			unique[i] = true;
		}
	});
	return Object.keys(unique);
}	
var TagsRessources2 = removeDuplicates(TagsRessources1);
TagsRessources2.sort();

//Création de la liste remplie à l'ouverture de la page
var checkboxStates = {
	Type: TagsRessources2,
};
console.log(TagsRessources2);

//Création du panneau de commande des types d'acteurs
var div1 = document.getElementById('rechercherapide');
var TagsRCheckBox = '';

for (var i = 0; i < TagsRessources2.length; i++)
{
	TagsRCheckBox += '<input class="input" id="' + TagsRessources2[i] + '" type="checkbox" value="' + TagsRessources2[i] + '" onclick="updategeoLayer()" checked/>' + TagsRessources2[i] + '<br>';
}
div1.innerHTML = '<h4>Ressources mobilisées</h4><input id="all" class="input" type="checkbox" onclick="toggle(this);updategeoLayer()" checked/><b>Tout sélectionner</b><br>' 
+ TagsRCheckBox+'<br>';

///fin
}
				
});
		
	//création d'une couche affichant le geojson temporaire
/*function updategeoLayer()
{
	var initiativesChecked = {
		"type": "FeatureCollection",
		"features": []
	};
	updateInitiativesChecked();
	map.eachLayer(function(layer)
	{
		map.removeLayer(layer)
	});
	displayLayersInit();
	//Affichage du control Info en fonction des couches sélectionnées
	function displayInfo()
	{
		if (map.hasLayer(coucheTerritoires))
		{
			info.addTo(this);
		}
		else
		{
			info.remove(this);
		}
	};
	map.on('overlayadd', displayInfo);
	map.on('overlayremove', displayInfo);
	map.addLayer(designFond (typeFond)); //paramètré dans le fichier HTML
	displayTerritories(afficherTerritoires)//paramètré dans le fichier HTML
	dispalyLieuxcles(afficherLieuxcles)//paramètré dans le fichier HTML
	displayInitiatives(afficherInitiatives)//paramètré dans le fichier HTML
	
};	*/
	
	/*map.addLayer(geoLayer);
	console.log (geoLayer.Object[1].features.properties.tags_ressources);
	




  });*/

////Paramétrage des filtres
