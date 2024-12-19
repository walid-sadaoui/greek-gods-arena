import http from 'http';
import mongoose from 'mongoose';
import config from './config';
import Debug from 'debug';
import app from './index';
import { seedData } from './seed';

const debug = Debug('greek-gods-arena-api:server');
const PORT: number = parseInt(config.port);
const connectDatabase = async () => {
  if (config.databaseUrl) {
    await mongoose.connect(config.databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    const db = mongoose.connection;
    await seedData();
    db.on('error', console.error.bind(console, 'Connection Error'));
    db.once('open', () => {
      console.log('Connected to MongoDb');
    });
  } else {
    console.log(`Mongoose : Database url not specified`);
    debug(`Mongoose : Database url not specified`);
  }
  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    debug(`Listening on port ${PORT}`);
  });
};

connectDatabase();
