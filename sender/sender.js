const amqp = require('amqplib')
const ex = require('express')

AMQP_URI = 'amqp://guest:guest@rabbitmq:5672'

app = ex()

const send_msg = (data) => {
    amqp.connect(AMQP_URI)
        .then((conn) => {
            return conn
                .createChannel()
                .then((ch) => {
                    let QUEUE = process.env.QUEUE

                    let ok = ch.assertQueue(QUEUE, { durable: false })

                    return ok.then((_qok) => {
                        ch.sendToQueue(QEUE, Buffer.from(data))
                        console.log(`Send Message: ${data} to QUEUES`)
                        return ch.close()
                    })
                })
                .finally(() => conn.close())
        })
        .catch(console.warn)
}
app.get('/send/:data', (req, res) => {
    let data = req.params.data
    send_msg(data)
    res.json({
        message: `Send data ${data}`,
    })
})

app.listen(process.env.PORT || 3000)
