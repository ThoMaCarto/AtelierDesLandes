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

map.setView([45.24724,-0.62619], 11);
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



// Ajouter ajout des tile layers	
// création d'une couche "bwLayer" un fond de carte en grisaille
var bwLayer = L.tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
{
	attribution: '<b>Fond de carte</b> © <a href="http://osm.org/copyright">OpenStreetMap</a><br>' + attribMARGINOV,
	opacity: 0.8,
	maxZoom: 19,
	
});

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
var urlNorthArray = '<img src="doc/aceG8oMc4.png" style="width:30px;">'
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


///Charger les données CSV



$.get('doc/db_img_blayais.csv', function(csvContents) {
    var geoLayer = L.geoCsv(csvContents, {
		firstLineTitles: true, 
		fieldSeparator: ';',
		titles: ['name','Filename','Date','Auteur','User comment','cat','lat', 'lng'],
		pointToLayer: function (feature,latlng){
function getMarkerColor(d){
	{
	switch (d)
	{
		case "VRD":
			return "#6F603D";
		case "hydro":
			return "#4EA9A0";
		case "loisir":
			return "#FF931C";
		case "patrimoine":
			return "#413C3C";
		case "excentre":
			return "#E82759";
		case "habitat":
			return " #FFFCFA";
		case "edf":
			return " #FFD133";
		case "agri":
			return " #778E60";
		case "reserve":
			return " #969514 ";
		case "citoyenneté":
			return " #EACFB8 ";	
			
		default:
			return "grey";
	}
}
}
			var marker = L.circleMarker(latlng,{radius:8,fillColor:getMarkerColor(feature.properties.cat),fillOpacity:0.9,color:'black',weight:1,});
			marker.bindPopup('<b>'+feature.properties.name+'</b><br/><b>Coordonnées :</b> '+feature.geometry.coordinates+'<br/><img src="'+feature.properties.filename+'" alt="test" width="300"><br/><small>photographie © '+feature.properties.auteur+'</small><br/><p>'+feature.properties.user_comment+'</p>');
			return marker;
		}
		/*onEachFeature:function (feature,layer){
			layer.bindPopup('<b>'+feature.properties.name+'</b><br/><b>Coordonnées :</b> '+feature.geometry.coordinates+'<br/><img src="'+feature.properties.filename+'" alt="test" width="300"><br/><small>photographie © '+feature.properties.auteur+'</small><br/><p>'+feature.properties.user_comment+'</p>');
			
		}*/
		
		
		});
		
		
		var iconclustersInit = L.markerClusterGroup(
	{
		maxClusterRadius: 5,
		singleMarkerMode: false,
		zoomToBoundsOnClick: true,
		spiderfyOnMaxZoom: true,
		clusterPane: '630',
		iconCreateFunction: function(cluster)
		{
			var markers = cluster.getAllChildMarkers();
			var n = markers.length;
			var e = n * 3;
			var f = e;
			return L.divIcon(
			{
				html: '<p style="line-height:'+f+'px;margin:auto;">'+markers.length+'</p>',
				className: 'mycluster',
				iconSize: L.point(e, e)
			});
		},
	});
	iconclustersInit.addLayer(geoLayer);
    map.addLayer(iconclustersInit);
	/*console.log (geoLayer);*/
	

  });
 function getMarkerColor(d){
	{
	switch (d)
	{
		case "VRD":
			return "#6F603D";
		case "hydro":
			return "#4EA9A0";
		case "loisir":
			return "#FF931C";
		case "patrimoine":
			return "#413C3C";
		case "excentre":
			return "#E82759";
		case "habitat":
			return " #FFFCFA";
		case "edf":
			return " #FFD133";
		case "agri":
			return " #778E60";
		case "reserve":
			return " #969514 ";
		case "citoyenneté":
			return " #EACFB8 ";	
			
		default:
			return "grey";
	}
}
}

///Création de la légende sur la droite
var labelLegend = ["Habitat","Voirie","Hydrographie","Equipements publics","Patrimoine","Morphologie des villages","Infrastructures EDF","Agriculture","Réserves Naturelles",];
var infoLegend = ["L'implantation de la centrale s'est accompagnée du développement d'un parc immobilier important pour les salariés de la centrale sous la forme de lotissement en périphérie des bourgs.",
"La construction de la centrale nucléaire du Blayais a profondément bouleversé les réseaux de circulation par la création de voies adaptées aux véhicules lourds de chantiers. Cela a des conséquences sur la morphologie des agglomérations alentours et leurs connexions aux axes de circulation.",
"Implanté dans un marais, l'installation de la centrale et l'évolution des activités alentour ont modifié le fonctionnement hydrologique de cette zone humide.",
"La rétrocession des terrains utilisés par EDF pour loger les ouvriers de la construction de la centrale aux communes et les retombées fiscales de la centrale, ont fourni des ressources foncières et financières aux communes avoisinantes souvent réinvesties sous la forme d'équipements culturels, de loisir et commerciaux.Ceux-ci peuvent être perçus comme un élément important de la qualité de vie des habitants, mais apparaissent parfois surdimensionnés au regard de la population. Certains sont aujourd'hui abandonnés.",
"Quelques lieux gardent des traces des anciennes activités.",
"La modification des réseaux de circulation a profondément bouleversé la morphologie de certains villages en isolant l'ancien centre et en créant de nouvelles centralités le long des axes de circulations majeures.",
"L'ensemble des infrastructures de production et de distribution de l'électricité a profondément modifié le paysage.",
"L'emprise foncière d'EDF dans les marais à modifier la morphologie des espaces cultivés (remembrement), ainsi que les modes de culture avec une réapparition d'openfields, là où persistait un paysage de bocage antérieurement.",
"Les gravières fournissant les matériaux de construction de la centrale ont été en partie transformées en réserves ornithologiques.",];
var catLegend =["habitat","VRD","hydro","loisir","patrimoine","excentre","edf","agri","reserve",];

var divLegend = document.getElementById('panneau');

var legend = '<hr/>';
for (var i = 0; i < labelLegend.length; i++){
	legend += '<div class="divicone" style="background-color:'+getMarkerColor(catLegend[i])+';"></div><span>'+labelLegend[i]+'</span><details><p>'+infoLegend[i]+'</p></details><hr/>'
};

divLegend.innerHTML = legend;


/////	
	// Ajout Control.Layers Leaflet
var baseMaps = {
	"Standard":osmfr,
	"grisaille":bwLayer,
    "Aquarelle": watercolor,
	"Noir et blanc": stamenToner,
};

var overlayMaps ={
	//"points":geoLayer,
	//"aggrégats":iconclustersInit,
};

 L.control.layers(baseMaps, overlayMaps).addTo(map);
 ///////
