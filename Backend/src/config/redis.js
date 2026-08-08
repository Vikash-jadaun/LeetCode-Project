
const {createClient}=require('redis');

// const redisClient = createClient({
//     username: 'default',
//     password: process.env.REDIS_PASS,
//     socket: {
//         host: 'admiring-recent-gorgeous-48080.db.redis.io',
//         port: 19944
//     }
// });

const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'passenger-space-rose-84938.db.redis.io',
        port: 18799
    }
});

module.exports=redisClient;