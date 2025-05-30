import * as amqp from 'amqplib';

class QueueService {
  private channel: any;

  async connect() {
    try {
      // Connect to RabbitMQ
      const connection = await amqp.connect('amqp://localhost:5672');
      this.channel = await connection.createChannel();

      // Create a queue for orders
      await this.channel.assertQueue('order_queue', { durable: true });
      console.log('Connected to RabbitMQ');
    } catch (error) {
      console.error('Error connecting to RabbitMQ:', error);
    }
  }

  async sendOrderMessage(order: any) {
    try {
      // Send order to queue
      this.channel.sendToQueue(
        'order_queue',
        Buffer.from(JSON.stringify(order)),
        { persistent: true }
      );
      console.log('Order sent to queue:', order.id);
    } catch (error) {
      console.error('Error sending order to queue:', error);
    }
  }
}

export default QueueService; 