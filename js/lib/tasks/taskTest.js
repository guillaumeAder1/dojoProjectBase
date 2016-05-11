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

define(["dojo/Deferred", "dojo/topic"], function (Deferred, topic) {

	var doTask = function(){
	
		this.theTask = function(){
			console.log("Test task :: init")
			
			var def = new Deferred();
			
			setTimeout(function () {
                // send result using the deferred
			    def.resolve("Test task :: resolved");
                // or by using the topic
			    // topic.publish("Event::1", "topic emit");

			}, 3000);
			
			return def.promise;
		}
		
		
		this.execute = function(){
			return this.theTask()
		}
	}
	

    return doTask;
});