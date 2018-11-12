var me=this;
if(!me._layerGroupsMap){
    me._layerGroupsMap={
        "Salish Sea":[14, 15, 16, 17],
        "Gulf Islands":[11, 12, 13]
    };
    me._layerGroupEls={
    };
    
}

var getGroup=function(layer){
    var id=layer.getId();
    var keys=Object.keys(me._layerGroups);
    for(var i=0;i<keys.Length;i++){
        for(var j=0;j<keys.Length;j++){
            if(id+""===me._layerGroups[keys[i]][j]+""){
                return keys[i];
            }
        }
    }
    return false;
};


var addToGroup=function(group, layer, element){
    
    if(!me._layerGroupEls[group]){
        me._layerGroupEls[group]=new Element('li');
        element.parentNode.insertBefore(me._layerGroupEls[group], element);
    }
    
    
};

var group=getGroup(layer)

if(group){
    
    
    addToGroup(group, layer, element);
    return;
}


layer.addEvent('show',function(){
    
    layer.runOnceOnLoad(function(){
        
        application.fitBounds(layer.getBounds());
        
    });
    
});