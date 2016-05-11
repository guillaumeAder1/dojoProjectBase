/*global define, console*/

/*
 | Copyright 2015 ESRI (UK) Limited
 |
 | Licensed under the Apache License, Version 2.0 (the "License");
 | you may not use this file except in compliance with the License.
 | You may obtain a copy of the License at
 |
 |    http://www.apache.org/licenses/LICENSE-2.0
 |
 | Unless required by applicable law or agreed to in writing, software
 | distributed under the License is distributed on an "AS IS" BASIS,
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 | See the License for the specific language governing permissions and
 | limitations under the License.
 */

define([
    "dojo/text!./accordion.html",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/on",
    "../../../lib/tasks/queryTask",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
],
function (
    template,
    declare,
    lang,
    on,
    task,
    _WidgetBase,
    _TemplatedMixin,
    _WidgetsInTemplateMixin
    ) {

    return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
        // description:
        //    Find the nearest features around a point

        templateString: template,
        baseClass: 'esri-accordion-widget',
        widgetsInTemplate: true,
        webmap: null,
        layer:null,

        // Properties to be sent into constructor
        constructor: function (options, srcRefNode) {

            // enter defaults value here
            this.options = {
                webmapId: "",              
            };
            // mix in settings and defaults
            var defaults = lang.mixin({}, this.options, options);
            // Set properties
            this.set("webmapId", defaults.webmapId);
            // Set properties
            this.webmap = defaults.webmapId;
            this.layer = defaults.layer;
            // widget node
            this.domNode = srcRefNode;         

        },

        buildRendering: function () {
            this.inherited(arguments);
        },

        postCreate: function () { 
            this.inherited(arguments);

            on(this.btnTask, "click", lang.hitch(this, function (e) {

                console.log("click event :: accordion button template START")


                var t = new task(this.layer);

                t.execute().then(function(res){
                    console.log("click event :: accordion button template COMPLETE => ", res)
                });

            }));
          
        },

        // start widget. called by user
        startup: function () {
          

        },
        
       
        destroy: function () {
            // call the superclass method of the same name.
            this.inherited(arguments);
        },
    });
});