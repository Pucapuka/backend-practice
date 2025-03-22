const getUser = (req, res) => {
    res.send('List of users');
};

const createUser = (req, res) => {
    res.send('Create a new user');
};

module.exports = {
    getUser,
    createUser
};