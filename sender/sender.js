const amqp = require('amqplib/callback_api')
const express = require('express')

AMQP_URI = 'amqp://guest:guest@rabbitmq:5672'

app = express()

const send_msg = () => {
    amqp.connect(AMQP_URI, (connEror, connection) => {
        if (connEror) {
            throw connEror
        }

        connection.createChannel((channelError, channel) => {
            if (channelError) {
                throw channelError
            }

            const QUEUE = process.env.QUEUE_NAME
            msg = {
                data: 'json',
                type: 'string',
                timeStamp: Date.now(),
            }
            channel.assertQueue(QUEUE)

            channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(msg)))

            console.log(`Queue name: ${QUEUE}, message: {msg}`)
        })
    })
}
app.get('/send', (req, res) => {
    send_msg()
    res.json({
        message: 'etst',
    })
})

app.listen(process.env.PORT || 3000)
