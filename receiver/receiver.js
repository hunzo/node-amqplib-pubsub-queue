const amqp = require("amqplib/callback_api")

function show(msg) {
    console.log(msg)
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
            channel.assertQueue(QUEUE)
            // channel.ackAll(QUEUE1)

            channel.consume(QUEUE, (msg) => {
                // console.log(`message receive json: ${JSON.stringify(msg)}`)
                console.log(`message receive: ${msg.content.toString()}`)
                show(msg.fields)
                // console.log(typeof msg)
                channel.ack(msg)
            })
        })
    }
)