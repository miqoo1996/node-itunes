const {mongoose, Schema} = require('../mongo');

const itunesData = mongoose.model('itunesData', new Schema({}, { strict: false }));

module.exports = {
    async store(data) {
        const collectionData = new itunesData(data);
        return await collectionData.save();
    },

    async deleteAll() {
        return await itunesData.deleteMany();
    },

    async all() {
        return await itunesData.find();
    },

    async getByName(name, limit) {
        return await itunesData.find({ trackName: { $regex: name } }).limit(limit||50);
    },

    async getByNameAlphabeticData(name, limit) {
        return await itunesData.find({ trackName: { $regex: name } } ).limit(limit||50).sort( { "trackName": 1 });
    }
};