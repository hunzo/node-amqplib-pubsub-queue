let Channel = require('./channel')

let queue = 'test-queue'

let body_encode = (msg) => {
    return Buffer.from(JSON.stringify(msg))
}

Channel(queue, (err, channel, conn) => {
    if (err) {
        console.log(err.statck)
    } else {
        console.log('Channel and Queues Created ...')
        let message = {
            info: "test message"
        }

        channel.sentToQueue(queue, body_encode(message), {
            persistent: true
        })

        setImmediate(() => {
            channel.close()
            conn.close()
        })
    }



})