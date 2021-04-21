const amqp = require("amqplib/callback_api")
const ex = require("express")

AMQP_URI = "amqp://guest:guest@rabbitmq:5672"

app = ex()

const send_msg = (data) => {
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
                data: data,
                type: "string",
                timeStamp: Date.now(),
            }
            channel.assertQueue(QUEUE, {
                durable: false
            })

            channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(msg)))

            console.log(`Queue name: ${QUEUE}, message: ${JSON.stringify(msg)}`)
        })
    })
}
app.get("/send/:data", (req, res) => {
    let data = req.params.data
    send_msg(data)
    res.json({
        message: `Send data ${data}`,
    })
})

app.listen(process.env.PORT || 3000)
