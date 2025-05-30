# Order Management System

A order management system built with Node.js, TypeScript, and PostgreSQL. This system handles product management, order processing, and includes features like authentication, cart management, and order tracking.

## Features

- User Authentication with JWT
- Product Management
- Shopping Cart Functionality
- Order Processing
- Real-time Order Status Updates
- Message Queue Integration (RabbitMQ)
- S3 Integration for Invoice Storage

## Tech Stack

- Node.js & TypeScript
- PostgreSQL with TypeORM
- RabbitMQ for Message Queue
- LocalStack (S3) for File Storage
- Docker for containerization

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the services:
   ```bash
   ./setup.sh
   ```
4. Run the application:
   ```bash
   npm start
   ```

## Environment Setup

The project uses Docker Compose to set up:
- RabbitMQ (ports: 5672, 15672)
- LocalStack S3 (port: 4566)

## Development

To start development:
1. Ensure Docker is running
2. Start the services using setup.sh
3. Run the application in development mode:
   ```bash
   npm run dev
   ``` 