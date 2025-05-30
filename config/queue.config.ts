export const RABBITMQ_CONFIG = {
  url: 'amqp://localhost:5672',
  exchangeName: 'order_exchange',
  queueName: 'order_queue',
  routingKey: 'order.created'
};

export const S3_CONFIG = {
  endpoint: 'http://localhost:4566',
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'test',
    secretAccessKey: 'test'
  },
  bucketName: 'order-invoices',
  forcePathStyle: true
}; 