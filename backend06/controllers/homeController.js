const getHome = (req, res) => {
    const data = fs.readFileSync('./public/homepage.html');
    res.send(data);
};


module.exports = getHome;