// const eventProxy = require('events-proxy');
//
//
// eventProxy.init().then(() => {
//     console.log('send notify');
//
//     const notifyData = {
//         title: 'Lesik sosi!',
//         message: 'Lesik sosi!',
//     };
//     eventProxy.publish('notifyEvent', {
//         provider: {
//             id: 'telegram',
//             data: {
//                 uid: 42451962,
//             },
//         },
//         notifyData,
//     });
//
//     eventProxy.publish('notifyEvent', {
//         provider: {
//             id: 'slack',
//             data: {
//                 url: 'https://hooks.slack.com/services/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',
//             },
//         },
//         notifyData,
//     });
//
//     eventProxy.publish('notifyEvent', {
//         provider: {
//             id: 'twilio',
//             data: {
//                 phone: '+380968608469'
//             },
//         },
//         notifyData,
//     });
// });


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const mongoConnection = require('./mongoose.connection');

const eventProxy = require('events-proxy');

eventProxy.init().then(() => {
    console.log('eventProxy ready');
});

mongoConnection(() => {
    console.log('mongo ready');
});


const ApiRouter = require('./server/api');

const errorMiddleWare = require('./errors/errors.middleware');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', ApiRouter);

app.use(errorMiddleWare());

app.listen(config.port, () => {
    console.log(`App successfully started at :${config.port}`);
});

