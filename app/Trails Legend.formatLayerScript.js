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
            element.addClass("not-"+map[j]);
        }
        // element.addClass("not-"+map.join('-'));
    }
    // element.addClass("not-any-"+keys.map(function(k){return k.toLowerCase().split(' ').join('-'); }).join('-'));
    return false;
};


var addToGroup=function(group, layer, element){
    
    var category=me._layerGroupEls[group];
    if(!category){
        category=new Element('li');
        me._layerGroupEls[group]=category
        element.parentNode.insertBefore(category, element);
        category.appendChild(Asset.image(element.firstChild.src,{style:element.firstChild.style}));
        category.appendChild(new Element('span',{"class":"label"}));
        category.appendChild(new Element('span',{"class":"indicator-switch"}));
    }else{
        
    }
    
    element.addClass("nested-1");
    element.addClass(group.toLowerCase().split(' ').join('-'));
    
    
    
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