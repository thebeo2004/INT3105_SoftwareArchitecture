import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});

const producer = kafka.producer();

const runProducer = async () => {
    await producer.connect();

    await producer.send({
        topic: 'test-topic',
        messages: [{
            value: "Hello Kafka from Node.js!"
        }]
    });

    console.log('Message sent successfully');

    await producer.disconnect();
}

runProducer().catch(console.error);