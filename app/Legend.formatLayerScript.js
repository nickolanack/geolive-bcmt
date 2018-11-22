if (!window.UILayerGroup) {
    var UILayerGroup = new Class({

        initialize: function(groupMap, options) {

            var me = this;
            me.options = Object.append({
                "showExpand":true,
                "stackIcons":3 //shows the first layer icons stacked
                "zoomToExtents":false
            }, options);

            me._layerGroupsMap = groupMap;
            
            me._layerGroupEls = {};
            me._layerGroupChildren={};


        },
        addLegendLayer: function(layer, element) {

            var me = this;
            var group = me.getGroup(layer, element)

            if (group) {
                me.addToGroup(group, layer, element);
                return;
            }
        },
        getGroup: function(layer, element) {
            var me = this;
            var id = layer.getId();
            var keys = Object.keys(me._layerGroupsMap);
            var key = null;
            var map = null;

            for (var i = 0; i < keys.length; i++) {
                key = keys[i];
                map = me._layerGroupsMap[key];
                for (var j = 0; j < map.length; j++) {
                    if (id + "" == map[j] + "") {
                        return key;
                    }
                    //element.addClass("not-"+map[j]);
                }
                // element.addClass("not-"+map.join('-'));
            }
            // element.addClass("not-any-"+keys.map(function(k){return k.toLowerCase().split(' ').join('-'); }).join('-'));
            return false;
        },
        addToGroup: function(group, layer, element) {
            var me = this;
            var category = me._layerGroupEls[group];
            var groupKabob = group.toLowerCase().split(' ').join('-')
            if (!category) {
                category = new Element('li', {
                    "class": "layer"
                });

                if(me.options.showExpand){
                    category.addClass("expandable-parent");
                }

                me._layerGroupEls[group] = category;
                me._layerGroupChildren[group]=[];
                element.parentNode.insertBefore(category, element);
                category.appendChild(Asset.image(element.firstChild.src, {
                    styles: {

                        "width": "22px",
                        "height": "auto",
                        "padding-top": "1px",
                        "padding-bottom": "1px"

                    }
                }));
                category.appendChild(new Element('span', {
                    "class": "label",
                    html: group
                }));
                var indicator=category.appendChild(new Element('span', {
                    "class": "indicator-switch"
                }));


                category.addEvent('click', function(e) {


                    if(me.options.showExpand){

                        if(category.hasClass('expanded')){
                            category.removeClass('expanded');
                            me._layerGroupChildren[group].forEach(function(el){
                                el.removeClass('expanded');
                            });
                            return;
                        }


                        category.addClass('expanded');
                        me._layerGroupChildren[group].forEach(function(el){
                                el.addClass('expanded');
                        });

                        return;
                    }


                    var layers = me._layerGroupsMap[group].map(function(lid) {
                        return application.getLayerManager().getLayer(lid);
                    });
                    var value = false;
                    layers.forEach(function(l) {
                        if (l.isVisible()) {
                            value = true;
                        }
                    });
                    layers.forEach(function(l) {
                        if (value) {
                            l.hide();
                        } else {
                            l.show();
                        }
                    });

                    if (value) {
                        category.removeClass('active');
                    } else {
                        category.addClass('active');


                        if(me.options.zoomToExtents){

                            var north = -Infinity;
                            var south = Infinity;
                            var east = -Infinity;
                            var west = Infinity;

                            layers.forEach(function(i) {
                                i.runOnceOnLoad(function() {



                                    var b = i.getBounds();

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

                    }

                });

                new UIPopover(category, {
                    title: Localize(group, groupKabob),
                    description: "",
                    anchor: UIPopover.AnchorTo(['right'])
                });


            } else {

            }

            element.addClass("nested-1");
            element.addClass(groupKabob);

            if(me.options.showExpand){
                element.addClass("expandable-child");
            }



        }


    });
}


var me = this;
if (!me._layerGroups) {
    me._layerGroups = new UILayerGroup({
        "Campsites": [2, 3, 8]
    });
    element.addClass("created-groups");
}

me._layerGroups.addLegendLayer(layer, element);