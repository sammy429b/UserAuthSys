import { Redis } from "ioredis";
import dotenv from "dotenv";

dotenv.config();

const redisHost: string = process.env.REDIS_HOST || 'localhost';
const redisPort: number = parseInt(process.env.REDIS_PORT || '6379', 10);

// Validate configuration
if (!process.env.REDIS_HOST) {
    console.warn('REDIS_HOST is not set. Using default: localhost');
}
if (!process.env.REDIS_PORT) {
    console.warn('REDIS_PORT is not set. Using default: 6379');
}

const redis = new Redis({
    host: redisHost || '127.0.0.1',
    port: redisPort,
    password: process.env.REDIS_PASSWORD || 'your_strong_password',
    db: 0,
  });

redis.on('connect', ()=>{
    console.log(`redis running on port ${redisPort}`)
})

// Error handling
redis.on('error', (err) => {
    console.error('Redis connection error:', err);
});

export default redis;
