const amqp = require('amqplib/callback_api');

// Step 1: Create Connection
amqp.connect('amqp://localhost', (connError, connection) => {
    if (connError) {
        throw connError;
    }
    // Step 2: Create Channel
    connection.createChannel((channelError, channel) => {
        if (channelError) {
            throw channelError;
        }
        // Step 3: Assert Queue
        const QUEUE = 'furqon'
        channel.assertQueue(QUEUE);
        // Step 4: Receive Messages
        console.log(` [*] Waiting for messages in %s. To exit press CTRL+C", queue`);
        channel.consume(QUEUE, (msg) => {
            console.log(`Message received: ${msg.content.toString()}`)
        }, {
            noAck: true
        })
    })
})