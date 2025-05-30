import * as amqp from 'amqplib';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

class ConsumerService {
  private channel: any;
  private s3Client: S3Client;

  constructor() {
    // initialize s3 client
    this.s3Client = new S3Client({
      endpoint: 'http://localhost:4566',
      region: 'us-east-1',
      credentials: {
        accessKeyId: 'test',
        secretAccessKey: 'test'
      },
      forcePathStyle: true
    });
  }

  async start() {
    try {
      // connect to rabbitmq
      const connection = await amqp.connect('amqp://localhost:5672');
      this.channel = await connection.createChannel();

  
      await this.channel.assertQueue('order_queue', { durable: true });

      this.channel.consume('order_queue', async (msg: any) => {
        if (msg) {
          const order = JSON.parse(msg.content.toString());
          await this.processOrder(order);
          this.channel.ack(msg);
        }
      });

      console.log('Consumer started, waiting for orders...');
    } catch (error) {
      console.error('Consumer error:', error);
    }
  }

  private async processOrder(order: any) {
    try {
      // Create simple invoice content
      const invoice = this.createInvoice(order);

      // Save to S3
      await this.s3Client.send(new PutObjectCommand({
        Bucket: 'order-invoices',
        Key: `invoice-${order.id}.txt`,
        Body: invoice,
        ContentType: 'text/plain'
      }));

      console.log(`Created invoice for order ${order.id}`);
    } catch (error) {
      console.error('Error processing order:', error);
    }
  }

  private createInvoice(order: any): string {
    return `
ORDER INVOICE
============
Order ID: ${order.id}
Date: ${new Date().toISOString()}

Items:
${order.items.map((item: any) => 
  `- ${item.product.name}: ${item.quantity} x $${item.price}`
).join('\n')}

Total: $${order.total}
`;
  }
}

export default ConsumerService; 