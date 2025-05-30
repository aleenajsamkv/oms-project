#!/bin/bash

echo "🚀 Starting services..."
docker-compose up -d

echo "⏳ Waiting for services to be ready..."
sleep 10  # Give services time to start

echo "📦 Creating S3 bucket..."
aws --endpoint-url=http://localhost:4566 s3 mb s3://order-invoices

echo "✨ Setup complete! Here's how to check everything:"
echo "- RabbitMQ UI: http://localhost:15672 (user: guest, pass: guest)"
echo "- LocalStack S3: http://localhost:4566"
echo ""
echo "To view logs:"
echo "docker-compose logs"
echo ""
echo "To stop services:"
echo "docker-compose down" 