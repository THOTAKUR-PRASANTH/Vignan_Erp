const mongoose = require('mongoose');
const env = require('dotenv');
env.config();

let count = 0;

const options = {
    maxPoolSize: 200,
	maxIdleTimeMS:1000,  //1 Seconds
	socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    useNewUrlParser: true,
};


const connectWithRetry = async () => {
    console.log('MongoDB connection with retry')
    try{
        const con = await mongoose.connect(process.env.MONGO_DB_URL, options);
        console.log(`MongoDB connected : ${process.env.MONGO_DB_URL}`);
    }catch(err){
        console.log(err);
        console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', ++count);
    }
};

connectWithRetry();

exports.mongoose = mongoose;
