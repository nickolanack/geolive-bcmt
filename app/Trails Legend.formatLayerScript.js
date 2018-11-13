var me=this;
if(!me._layerGroupsMap){
    me._layerGroupsMap={
        "Salish Sea":[14, 15, 16, 17],
        "Gulf Islands":[11, 12, 13]
    };
    me._layerGroupEls={
    };
    
    element.addClass("created-groups");
}

var getGroup=function(layer, element){
    var id=layer.getId();
    var keys=Object.keys(me._layerGroupsMap);
    var key=null;
    var map=null;
  
    for(var i=0;i<keys.length;i++){
        key=keys[i];
        map=me._layerGroupsMap[key];
        for(var j=0;j<map.length;j++){
            if(id+""==map[j]+""){
                return key;
            }
            //element.addClass("not-"+map[j]);
        }
        // element.addClass("not-"+map.join('-'));
    }
    // element.addClass("not-any-"+keys.map(function(k){return k.toLowerCase().split(' ').join('-'); }).join('-'));
    return false;
};


var addToGroup=function(group, layer, element){
    
    var category=me._layerGroupEls[group];
    var groupKabob=group.toLowerCase().split(' ').join('-')
    if(!category){
        category=new Element('li',{"class":"layer"});
        me._layerGroupEls[group]=category
        element.parentNode.insertBefore(category, element);
        category.appendChild(Asset.image(element.firstChild.src,{styles:{
            
                "width": "22px",
                "height": "auto",
                "padding-top": "1px",
                "padding-bottom": "1px"
            
        }}));
        category.appendChild(new Element('span',{"class":"label", html:group}));
        category.appendChild(new Element('span',{"class":"indicator-switch"}));
        
        
        category.addEvent('click',function(){
            
            var layers=me._layerGroupsMap[group].map(function(lid){return application.getLayerManager().getLayer(lid);});
            var value=false;
            layers.forEach(function(l){
                if(l.isVisible()){
                    value=true;
                }
            });
            layers.forEach(function(l){
                if(value){
                    l.hide();
                }else{
                    l.show();
                }
            });
            
            if(value){
                category.removeClass('active');
            }else{
                category.addClass('active');
                
                var north = -Infinity;
                var south = Infinity;
                var east = -Infinity;
                var west = Infinity;

                layers.forEach(function(i) {
                    i.runOnceOnLoad(function(){
                        
                   
                    
                        var b=i.getBounds();
    
                        north = Math.max(north, b.north);
                        east = Math.max(east, b.east);
                        south = Math.min(south, b.south);
                        west = Math.min(west, b.west);
                
                        application.fitBounds({
                            "north": north,
                            "south": south,
                            "east": east,
                            "west": west
                        });
                    })
            
                });
                
                
                
            }
            
        });
        
        new UIPopover(category, {
                title: Localize(group, groupKabob),
                description:"",
                anchor: UIPopover.AnchorTo(['right'])
            });
        
        
    }else{
        
    }
    
    element.addClass("nested-1");
    element.addClass(groupKabob);
    
    
    
};

var group=getGroup(layer, element)

if(group){
    
    
    addToGroup(group, layer, element);
    return;
}


layer.addEvent('show',function(){
    
    layer.runOnceOnLoad(function(){
        
        application.fitBounds(layer.getBounds());
        
    });
    
});