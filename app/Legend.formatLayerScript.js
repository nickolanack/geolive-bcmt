<?php IncludeJS('{modules}/LayerLegend/js/UILayerGroup.js'); ?>

var me = this;
if (!me._layerGroups) {
    me._layerGroups = new UILayerGroup(application, {
        "Campsites": [2, 3, 8]
    }).addEvent('addGroup',function(group, groupEl){
        ([
            "https://www.bcmarinetrails.org/components/com_geolive/users_files/user_files_62/Uploads/tJf_Z34_jL9_[G]_[ImAgE].png?thumb=>22x>22",
            "https://www.bcmarinetrails.org/components/com_geolive/users_files/user_files_62/Uploads/E6W_OuT_Yn7_[ImAgE]_[G].png?thumb=>22x>22"          
        ]).forEach(function(img, i){
            
            groupEl.appendChild(Asset.image(img, {
                    
                    styles: {
                        "position":"absolute",
                        "width": "22px",
                        "height": "auto",
                        "padding-top": "1px",
                        "padding-bottom": "1px",
                            "left":5*(i+1),
                            "z-index": -(i+1)

                    }
                }));
            
        });
        
    })
    element.addClass("created-groups");
}

me._layerGroups.addLegendLayer(layer, element);