
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