/*global pulse, app, jQuery, require, document, esri, esriuk, Handlebars, console, $, mynearest, window, alert, unescape, define */

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

define(["dojo/Deferred", "dojo/topic", "esri/tasks/QueryTask", "esri/tasks/support/Query", "./taskTest"], function (Deferred, topic, QueryTask, Query, task) {

    layer :null

    var queryTask = function (layerData) {

        this.layer = layerData

        this.theTask = function () {
            // always need to return a deferred
            var def = new Deferred()

            console.log("Query task :: init", this.layer)
            
            var url = this.layer.parsedUrl.path;

            var queryTask = new QueryTask({
                url: url
            });
            var query = new Query();
            query.returnGeometry = true;
            query.outFields = ["*"];
            query.where = "District = 'Kildare'";  // Return all cities with a population greater than 1 million

            // When resolved, returns features and graphics that satisfy the query.
            queryTask.execute(query).then(function (results) {
                console.log(results.features);
                def.resolve();
            });

            // When resolved, returns a count of the features that satisfy the query.
            queryTask.executeForCount(query).then(function (results) {
                console.log(results);
            });

            return def.promise;



            ////  ******************************* //
            ////  **  Example simple deferred  ** //
            ////  ******************************* //

            //var def = new Deferred();
            //setTimeout(function () {
            //    myTask = new task()
            //    myTask.execute().then(function (res) {
            //        console.log("Query task :: resolved")
            //        def.resolve(res)
            //    });
            //}, 3000);
            //return def.promise;

            ////  ******************************* //
            ////  **  Example simple deferred  ** //
            ////  ******************************* //
        }


        this.execute = function () {
            return this.theTask()
        }
    }


    return queryTask;
});