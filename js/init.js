/*
*/
define([
    "dojo/ready",
    "dojo/_base/declare",
	"esri/WebMap",
	"esri/views/MapView",
    "dojo/topic",
    "dojo/dom",
    "dojo/on",
    "dojo/promise/all",
    "dojo/Deferred",
    "dojo/_base/lang",
	"./lib/tasks/taskTest",
	"./lib/widgets/accordion/accordion"
    ], function (
        ready,
		declare,
		WebMap,
		MapView,
        topic,
        dom,
        on,
        all,
        Deferred,
        lang,
		task,
        Accordion
        ) {
        return declare(null, {

        config: {},
        map: null,
        mapView: null,
       

        // init all the components (widgets/ listeners/ topics...)
		init:function(){
			
		    this.createmap().then(lang.hitch(this, function (layers) {
		        for (item in layers) {
		            if (layers[item].title == "Garda_Stations") {
		                this.createAccordion(layers[item]);
		            }
		        }		        
		    }));
		   
			
		},		
		createmap: function () {

		    var def = new Deferred();

            // get webmap item
			map = new WebMap({
				portalItem: { 
					//id: "e691172598f04ea8881cd2a4adaa45ba"
					id: "1908e913663e4efdab789e3f60c58cd0"
				}
			});
			
            // load the map
		    map.load()
               .then(function () {
                   // load the basemap to get its layers created
                   return map.basemap.load();
               })
               .then(function () {
                   // grab all the layers and load them
                   var allLayers = map.allLayers;
                   var promises = allLayers.map(function (layer) {
                       return layer.load();
                   });
                   return all(promises.toArray());
               })
               .then(function (layers) {
                   // each layer load promise resolves with the layer
                   console.log("all " + layers.length + " layers loaded");

                   def.resolve(layers)
               })
               .otherwise(function (error) {
                   console.error(error);

                   def.reject(error)
               });

            this.map = map

            // assign map to the MapView
		    this.mapView = new MapView({
		        map: map,
		        container: "map"
		    });

		    return def.promise;
		},

		createAccordion: function (layer) {
		    var acc = new Accordion({ webmapId: "oktavio", layer: layer }, dom.byId("accordion"));
		    acc.startup();

		},
    });
});
