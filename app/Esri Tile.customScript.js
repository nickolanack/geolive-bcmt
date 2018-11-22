map.getBaseMap().mapTypes.set('EsriWorldMap', new google.maps.ImageMapType({
  name: "Esri World",
  getTileUrl: function(coord, zoom) {
    console.log(coord);
    var url = 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
      .replace('{x}', coord.x)
      .replace('{y}', coord.y)
      .replace('{z}', zoom);
    return url;
  },
  tileSize: new google.maps.Size(256, 256),
  minZoom: 1,
  maxZoom: 20
}));


var last;

tile.addEvent('click',function(){
    
    
    if(map.getBaseMap().getMapTypeId()=='EsriWorldMap'){
         map.getBaseMap().setMapTypeId(last);
    }else{
        last=map.getBaseMap().getMapTypeId();
         map.getBaseMap().setMapTypeId('EsriWorldMap');
    }
   
    
    
    
    
});