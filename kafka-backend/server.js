var connection = new require('./kafka/connection');

//topics file
var RegisterTopic = require('./services/loginTopics.js');
var addTocart=require('./services/addTocart.js');
var getCart=require('./services/getCart');
var addProductTopic=require('./services/addProductTopic.js');
var addToFav=require('./services/addToFav');
var addToOrders=require('./services/addToOrders.js')
// var inboxTopics = require('./services/inboxTopics.js');
// var courseTopics = require('./services/courseTopics.js');
// var profileTopics = require('./services/profileTopics.js');
// var fileTopics = require('./services/fileTopics');
// var assignmentTopics = require('./services/assignmentTopics');
// var announcementTopics = require('./services/announcementTopics');
// var quizTopics = require('./services/quizTopics');

// Set up Database connection
var config = require('./config/settings');
var mongoose = require('mongoose');
var connStr = 'mongodb+srv://admin:admin@cluster0.s2eap.mongodb.net/Etsy?retryWrites=true&w=majority'
//var connStr = config.connection_string;
console.log(connStr);
mongoose.connect(connStr, { useNewUrlParser: true, maxPoolSize: 10, }, function (err) {
    if (err) throw err;
    else {
        console.log('Successfully connected to MongoDB');
    }
});

console.log('Kafka server is running ');

function handleTopicRequest(topic_name, fname) {
    console.log("topic_name:", topic_name)
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    consumer.on('error', function (err) {
        console.log("Kafka Error: Consumer - " + err);
    });
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
});
}

    
    // Add your TOPICs here
    //first argument is topic name
    //second argument is a function that will handle this topic request

    handleTopicRequest("addTocart",addTocart);
    handleTopicRequest("getCart",getCart);
    handleTopicRequest("addProductTopic",addProductTopic);
    handleTopicRequest("RegisterTopic", RegisterTopic);
    handleTopicRequest("addToFav", addToFav);
    handleTopicRequest("addToOrders", addToOrders);
