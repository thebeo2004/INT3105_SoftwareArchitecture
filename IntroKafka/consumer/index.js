import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092']
});

// The Group ID (test-group) ensures that multiple consumers can work together to share the load
const consumer = kafka.consumer({
    groupId: 'test-group'
});

const runConsumer = async () => {
    await consumer.connect();

    // The consumer listens to the test-topic and logs each message received
    await consumer.subscribe({
        topic: 'test-topic',
        fromBeginning: true
    });

    // Start consuming messages
    await consumer.run({
        eachMessage: async({ topic, partition, message}) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value.toString(), // Convert buffer to string
            });
        }
    })
}

runConsumer().catch(console.error);