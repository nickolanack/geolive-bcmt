var me = legend;
if (!me._layerGroups) {
    me._layerGroups = new UILayerGroup(application, {
        "Salish Sea": [14, 15, 16, 17],
        "Gulf Islands": [11, 12, 13]
    }, {
         "showExpand":false,
         "zoomToExtents":true,
         "anchorTo":"right"
    });
    element.addClass("created-groups");
}

me._layerGroups.addLegendLayer(layer, element);


layer.addEvent('show', function() {

    layer.runOnceOnLoad(function() {

        application.fitBounds(layer.getBounds());

    });

});