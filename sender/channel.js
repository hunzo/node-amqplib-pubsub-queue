const amqp = require('amqplib/callback_api')
const AMQP_URI = process.env.AMQP_URI || 'amqp://guest:guest@rabbitmq:5672'

const createQueueChannel = (queue, cb) => {
    amqp.connect(AMQP_URI, onceConnected())

    const onceConnected = (err, conn) => {
        if (err) {
            cb(err)
        } else {
            console.log('AMQP Connected...')
            conn.createChannel(onceChannelCreated)
        }
    }

    const onceChannelCreated = (err, channel) => {
        if (err) {
            cb(err)
        } else {
            console.log('Channel Created...')
            channel.assertQueue(queue, { durable: true}, onceQueueCreated)
        }
    }

    const onceQueueCreated = (err) => {
        if (err) {
            cb(err)
        } else {
            console.log('Queue Created...')
            cb(null, channel, conn)
        }
    }
}

module.exports = createQueueChannel



