const amqp = require('amqplib')
const AMQP_URI = 'amqp://guest:guest@localhost:5672'

const MQ = require('./mq')

const ConnectAMQP = async () => {
    const conn = await amqp.connect (AMQP_URI)
    // console.log(conn)

    return conn

    // const ch = await conn.createChannel()
    // console.log(ch)

    // ch.assertQueue(queue, { durable: true })
    // return ch
}

// const init = () => {
//     return amqp
//         .connect(AMQP_URI)
//         .then(conn => conn.createChannel())
//         .then(ch => {
//             this.ch = ch
//             ch.assertQueue('qName', {durable: true})
//             return ch.sendToQueue(q )

//             // return this.ch.assertQueue('test-queue', {durable: true})
//         })
//         .then(q => this.queue = ch.)
//         .catch(err => console.log(err.stack))
// }

const initRabbitMQ = () => {
    return amqp
        .connect(AMQP_URI)
            .then(ch => {
                return ch.createChannel()
            })
}


// const x = initRabbitMQ()

// x
//     .then(r => {
//         console.log(r)
//         let q = 'q1'
//         r.assertQueue(q, { durable: false})
//         r.sendToQueue(q, Buffer.from(JSON.stringify('test from x')))
//     })
//     .catch(e => {
//         console.log(e)
//     })

const msq = new MQ()

msq.initConnection()
    .then(() => {
        msq.send('test')
    })