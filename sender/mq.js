const amqp = require('amqplib')

module.exports = class MQ {
    constructor() {
        this.qName = 'my-queue'
        this.channel 
        this.AMQP_URI = process.env.AMQP_URI || 'amqp://guest:guest@localhost:5672'
    }

    async initConnection() {
        const conn = await amqp.connect(this.AMQP_URI)
        this.channel = await conn.createChannel()

        await this.channel.assertQueue(this.qName, { durable: false})
    }

    send(msg) {
        this.channel.sendToQueue(this.qName, Buffer.from(msg))
        console.log(`send message [x] ${msg}`)
    }

    async recieve() {
        await this.channel.consume(this.qName, (msg) => {
            let rs = msg.content.toString()
            console.log(`message recieve ${rs}`)
            this.channel.ack(msg)
        }, {
            noAck: false
        })
    }

    close() {
        this.channel.close()
        this.conn.close()
    }
}