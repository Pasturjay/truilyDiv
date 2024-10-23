const mongoose = require('mongoose');
const User = require('../models/User'); // Adjust the path as needed

mongoose.connect('mongodb://localhost:27017/yourdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const cleanUp = async () => {
    try {
        // Remove entries with null email
        await User.deleteMany({ email: null });
        console.log('Cleanup completed');
    } catch (error) {
        console.error('Error during cleanup:', error);
    } finally {
        mongoose.disconnect();
    }
};

cleanUp();
