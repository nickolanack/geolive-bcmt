var circleColor={
    'layer-1':'rgb(51, 98, 205)',
    'layer-2':'rgb(81, 117, 48)',
    'layer-3':'rgb(220, 183, 99)',
    'layer-4':'rgb(204, 117, 225)',
    'layer-6':'rgb(247,247,247)',
    'layer-7':'rgb(110, 15, 14)',
    'layer-8':'rgb(175, 192, 158)',
    'layer-9':'rgb(2, 139, 195)',
    'layer-20':'rgb(29, 35, 94)'
}



if (window.Cluster) {
	Cluster.Symbol = ClusterSymbol;
// 	ClusterSymbol.IconScale = function(sum) {
// 		return 20 + (5 * Math.log(sum) / Math.log(2));
// 	};
	ClusterSymbol.IconStyle = function(name, sum) {

		var color="rgb(0, 160, 80)";
		var strokeColor='rgb(255,255,255)';
		var strokeWeight=2.5;
		
        var cluster=this.cluster_;
        var className="default-cluster-labels";
        if(cluster&&cluster.markers_&&cluster.markers_.length){
            var type=('layer-'+cluster.markers_[0]._layerid);
            className=className+" "+type;
            if(circleColor[type]){
                color=circleColor[type]
            }
        }
    	   
        var chars=Math.floor(Math.log(sum)/Math.log(10));

		//expect to be bound to ClusterSymbol object
		if (name == "hover") {

			return {
				path: google.maps.SymbolPath.CIRCLE,
				fillColor: color,
				fillOpacity: 1.0,
				strokeWeight: strokeWeight,
				strokeColor: strokeColor,
				labelOrigin:new google.maps.Point(3+(3*chars),5),
				labelClass:className
			};


		} else {


			return {
				path: google.maps.SymbolPath.CIRCLE,
				fillColor: color,
				fillOpacity: 0.9,
				strokeWeight: strokeWeight,
				strokeColor: strokeColor,
				labelOrigin:new google.maps.Point(3+(3*chars),5),
				labelClass:className
			};

		}

	};
} else {
	setTimeout(start, 100);
}