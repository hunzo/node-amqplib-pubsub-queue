const amqp = require("amqplib/callback_api")

function showHostname(msg) {
    console.log(`Host name: ${process.env.HOSTNAME}`)
}

AMQP_URI = 'amqp://guest:guest@rabbitmq:5672'

amqp.connect(
    AMQP_URI,
    (connError, connection) => {
        if (connError) {
            throw connError
        }

        connection.createChannel((channelError, channel) => {
            if (channelError) {
                throw channelError
            }

            const QUEUE = process.env.QUEUE_NAME
            channel.assertQueue(QUEUE, {
                durable: false
            })
            // channel.ackAll(QUEUE1)
            channel.prefetch(1)
            channel.consume(QUEUE, (msg) => {
                // console.log(`message receive json: ${JSON.stringify(msg)}`)
                console.log(`message receive: ${msg.content.toString()}`)
                showHostname(msg.fields)
                // console.log(typeof msg)
                channel.ack(msg)
            }, {
                noAck: false
            })
        })
    }
)