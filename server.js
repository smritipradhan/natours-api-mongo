const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

const DB = process.env.DATABASE;

dotenv.config({ path: './config.env' });
console.log(DB);
mongoose
  .connect(
    'mongodb+srv://smritipradhan:smriti@cluster0.zeoz99e.mongodb.net/natours-test?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    }
  )
  .then(con => {
    console.log('Hey');
  });
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
