// Import DB for the further use
const {mongoose, Schema} = require('../mongo');

// Make a model to store and find DATA
const itunesData = mongoose.model('itunesData', new Schema({}, { strict: false }));

// return back
module.exports = {
    /**
     *
     * @param data
     * @returns {Promise<InsertWriteOpResult<WithId<TSchema>>>}
     */
    async store(data) {
        const collectionData = new itunesData();
            return await collectionData.collection.insert(data);
    },

    /**
     * Clear db cluster
     *
     * @returns {Promise<{ok?: number; n?: number} & {deletedCount?: number}>}
     */
    async deleteAll() {
        return await itunesData.deleteMany();
    },

    /**
     * Get all the model data
     *
     * @returns {Promise<Array<Document>>}
     */
    async all() {
        return await itunesData.find();
    },

    /**
     * Find by name and limit
     *
     * @param name
     * @param limit
     * @returns {Promise<Array<Document>>}
     */
    async getByName(name, limit) {
        return await itunesData.find({ trackName: { $regex:  new RegExp(name, 'gi')} }).limit(limit||50);
    },

    /**
     *  Find by name and limit
     *  Sort A-Z|1-9
     *
     * @param name
     * @param limit
     * @returns {Promise<Array<Document>>}
     */
    async getByNameAlphabeticData(name, limit) {
        return await itunesData.find({ trackName: { $regex:  new RegExp(name, 'gi')} }).limit(50).sort( { "trackName": 1 });
    }
};