require('dotenv').config();
const { urlencoded } = require('body-parser');
const express = require('express');
const rateLimit = require('express-rate-limit');
const db = require('./db/dbconnection')
const userRouter = require('./controller/User/userRouter');
const productRouter = require('./controller/Product/productRouter')
const app = express();
const port = process.env.LOCAL_HOST||3000;


const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute window
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many requests from this IP, please try again later',
  });
app.use(limiter);

app.get('/', (err, res) => {
    res.send(`<div style="text-align:center;padding-top:40px;">
    <h1>Hello world!</h1>
</div> `);
});
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(express.json({ limit: '50mb' }));
app.use('/user', userRouter);
app.use('/product', productRouter);



app.use('/api/v1/', userRouter);
app.use('/api/v1/', productRouter);

app.listen(port, (error, result) => {
    if (error) {
        console.log(`server is not connected`);
    }
    else {
        console.log(`server is connected on port:`,port);
    }
})
module.exports = app;
