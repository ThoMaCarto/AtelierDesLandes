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
var attribMARGINOV = '<small>Prototype créé par <a href="https://cv.archives-ouvertes.fr/thomas-maillard">T. Maillard</a><br/>Informations fournies par <a href="https://www.passages.cnrs.fr/membres/nom/camille-mesnard/">C. Mesnard</a></small>'



//map.setView([44.35622,-0.76433], 9);
//fond de carte
// création d'une couche "osmfr"
//OSM FR utilise les données OSM avec une charte graphique développé pour le territoire français 
var osmfr = L.tileLayer('http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png',
{
	attribution: '<b>Fond de carte</b> © <a href="http://osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="http://openstreetmap.fr">OSM France</a><br>',
	opacity: 0.7,
	minZoom: 9,
	maxZoom: 18,
	
}).addTo(map);


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
//chargement des points du geojson et définition du style
function displayLayersInit()
{
	
//Création des marquers agglomérats d'icones: iconclustersInit
	var iconclustersInit = L.markerClusterGroup(
	{
		maxClusterRadius: 30,
		singleMarkerMode: false,
		zoomToBoundsOnClick: true,
		spiderfyOnMaxZoom: true,
		clusterPane: '635',
		iconCreateFunction: function(cluster)
		{
			var markers = cluster.getAllChildMarkers();
			var n = markers.length;
			var e = n * 6;
			
			return L.divIcon(
			{
				html: '<p style="line-height:'+e+'px;margin:auto;">'+markers.length+'</p>',
				className: 'mycluster',
				iconSize: L.point(e, e)
			});
		},
	});
	
	
var geoLayer = L.geoJson(projetsEtudiantChecked,{
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
			marker.bindPopup('<b>'+feature.properties.nom+'</b><br/><b>Coordonnées :</b> '+feature.geometry.coordinates+'<br/><p><b>Thèmatique : </b><span style="color:'+getMarkerColor(feature.properties.thema)+';">'+feature.properties.thema+'</span></p><small>Projet © '+feature.properties.etudiants+'</small><br/><a href="https://creativecommons.org/licenses/by-nc-sa/2.0/fr/"><img src="https://mirrors.creativecommons.org/presskit/buttons/88x31/png/by-nc-sa.eu.png" alt="Licence CC By-NC-SA 2.0"  title="Licence Creativ Commons - Attribution - Pas d’Utilisation Commerciale - Partage dans les Mêmes Conditions 2.0 France"  style="width:15%;"><br/></a><p>'+feature.properties.descr+'</p>'
			
			+'<div id="slider">'
			+'<figure>'
				+'<img src="doc/img/'+feature.properties.ID+'_0.jpg" alt="" width="300">'
				+'<img src="doc/img/'+feature.properties.ID+'_1.jpg" alt="" width="300">'
				+'<img src="doc/img/'+feature.properties.ID+'_2.jpg" alt="" width="300">'
				+'<img src="doc/img/'+feature.properties.ID+'_3.jpg" alt="" width="300">'
				+'<img src="doc/img/'+feature.properties.ID+'_4.jpg" alt="" width="300">'
			+'</figure>'
			+'</div>');
			return marker;
	}
}
);
iconclustersInit.addLayer(geoLayer);

iconclustersInit.addTo(map);
///paramètrage de la vue dela carte
/*var centerMaptest = [geoLayer.getBounds().getCenter().lat,geoLayer.getBounds().getCenter().lng];

//Si il n'y a aucun point alors on applique le centre des Landes, si il y a des point alors on utilise le centre de gravité de ceux-ci.
//si le centerMap = auto est auto alros centre de gravité de la couche territoires, sinon utilisation de la valeur de centermap
function setMapCenter (centerMap){
	if (centerMap === "auto"){return centerMaptest;}else{return centerMap;}
}*/
map.setView(centerMap, 9);
};







///gestion des filtres	
//création d'un tableaux contenant les valeurs uniques des tags ressources
var TagsRessources1 = [];
var initSelectTagsR=[];
for (var i = 0; i < projetsEtudiant.features.length; i++){
			initSelectTagsR.push(projetsEtudiant.features[i].properties.tags_ressources)
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


//Création du panneau de commande des tags ressources
var div1 = document.getElementById('tagsRessources');
var TagsRCheckBox = '';

for (var i = 0; i < TagsRessources2.length; i++)
{
	TagsRCheckBox += '<input class="input" id="' + TagsRessources2[i] + '" type="checkbox" value="' + TagsRessources2[i] + '" onclick="updateProjectsLayers2()" checked/>' + TagsRessources2[i] + '<br>';
}
div1.innerHTML = '<h4>Ressources mobilisées</h4><input id="all" class="input" type="checkbox" onclick="toggle(this);updateProjectsLayers2()" checked/><b>Tout sélectionner</b><br>' 
+ TagsRCheckBox+'<br>';

// gestion de la checkbox "all": tout sélectionner ou déselectionner en fonction du statut checked ou non
function toggle(source)
{
	var checkboxes = document.querySelectorAll('input[type="checkbox"]');
	for (var i = 0; i < checkboxes.length; i++)
	{
		if (checkboxes[i] != source) checkboxes[i].checked = source.checked;
	}
}


// fonction de mise à jours de la liste des filtre
function updateCheckboxStates()
{
	checkboxStates.Type.splice(0, checkboxStates.Type.length);
	
	var checkboxes = document.querySelectorAll('#tagsRessources>.input');
	for (var i = 0; i < checkboxes.length; i++)
	{
		var check = [checkboxes[i].value];
		if (checkboxes[i].checked)
		{
			checkboxStates.Type.push(checkboxes[i].value)
		};
	};
};
//mise à jour de la liste à chaque click dans la liste à cocher




/// Création de la couche de travaux étudiants en fonction des acteurs cochés
////création d'un géojson temporaire contenant seulement les objets correspondant aux ressources sélectionnés dans les checkboxes
var projetsEtudiantChecked = {
	"type": "FeatureCollection",
	"features": []
};
updateProjectsLayer();


//mise à jour du geoJSON temporaire 
function updateProjectsLayer()
{
	projetsEtudiantChecked.features.splice(0, projetsEtudiantChecked.features.length);
	updateCheckboxStates();
	for (var i = 0; i < projetsEtudiant.features.length; i++)
	{
		if (projetsEtudiant.features[i].properties.tags_ressources.some(x => checkboxStates.Type.some(y => y === x)) === true)
		{
			projetsEtudiantChecked.features.push(projetsEtudiant.features[i]);
		}
	};
	return projetsEtudiantChecked;
};
// affichage de la couche des projetsEtudiant au chargement de la page
displayLayersInit();

/*4. Mise à jour de la carte à chaque fois que l'on coche ou décoche un acteur*/

//création d'une couche affichant le geojson temporaire
function updateProjectsLayers2()
{
	var projetsEtudiantChecked = {
		"type": "FeatureCollection",
		"features": []
	};
	updateProjectsLayer();
	map.eachLayer(function(layer)
	{
		map.removeLayer(layer)
	});
	displayLayersInit();
	//réaffichage du fond de carte
	map.addLayer(osmfr);
	displaycheckboxStates();

	
	
};











///fin

				


