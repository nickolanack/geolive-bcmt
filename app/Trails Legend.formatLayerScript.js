layer.addEvent('show',function(){
    
    layer.runOnceOnLoad(function(){
        
        application.fitBounds(layer.getBounds());
        
    });
    
});