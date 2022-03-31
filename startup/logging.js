const winston = require('winston');
require('express-async-errors');
require('winston-mongodb');

module.exports = function(){
    process.on('uncaughtException', (ex) => {
        winston.error(ex.message, {metadata: ex});
        process.exit(1);
    });
    
    process.on('unhandledRejection', (ex) => {
        winston.error(ex.message, {metadata: ex});
        process.exit(1);
    });
    
    winston.add(new winston.transports.File({ filename:'logfile.log'}));
    winston.add(new winston.transports.Console());
    winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/Vidly', level: 'error', options: { useNewUrlParser: true, useUnifiedTopology: true}}));
    //winston.format.metadata();
    //throw new Error('Something failed during startup.');



    //Diese zwei Zeilen waren nicht als Kommentare gedacht, aber es wird immer ein Fehler geworfen...

    //const p = Promise.reject(new Error('Something failed miserably'));
    //p.then(() => console.log('Done'));
}