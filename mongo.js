const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.ecipv.mongodb.net/test?retryWrites=true&w=majority`, {
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.ecipv.mongodb.net/test`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = {mongoose, Schema};