import express from 'express';
import connectToDB from './db/index.js';
const app = express();
await connectToDB();
app.get('/', (req, res) => {
    res.send('hi');
});

connectToDB()
.then((res) => {
    app.listen(process.env.PORT || 9090, () => {
        console.log('App is running', process.env.PORT);
    })
})
.catch((error) => {
    console.log('ERROR:', error);
})

// app.listen('9000', () => {
//     console.log('port is running')
// })



// ;(async () => {
//     try {
//        await mongoose.connect(`${process.env.MONGODB_URI1}/chaicode`);
//         app.on('db', (error) => {
//             console.error("ERROR:", error);
//             throw error;
//         })

//         app.listen(process.env.PORT, () => {
//             console.log('app is running:' , process.env.PORT);
//         })
//     } catch (error) {
//         console.error("ERROR:", error);
//         throw error;
//     }
// })()