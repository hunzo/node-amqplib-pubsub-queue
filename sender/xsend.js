const amqp = require('amqplib')

AMQP_URI = process.env.AMQP_URI || 'amqp://guest:guest@localhost:5672'

amqp.connect(AMQP_URI).then((conn) => {
    return conn.createChannel().then((ch) => {
        let q = 'my-queue'
        let msg = `my message @ ${Date.now()}`
        
        let ok = ch.assertQueue(q, { durable: false})
        
        return ok.then((_qok) => {
            ch.sendToQueue(q, Buffer.from(msg))
            console.log(`Send Message: ${msg} to QUEUES`)
            return ch.close()

        })
    }).finally(() => conn.close())

}).catch(console.warn)