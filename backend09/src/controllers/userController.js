const users = [];


exports.getAllUsers = (req,res) => {
    res.json(users);
}
exports.getUserById = (req,res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    user? res.json(user) : res.status(400).send('Usuário não encontrado');
};


exports.createUser = (req,res) => {
    const newUser = {id: users.length + 1, name : req.body.name};
    users.push(newUser);
    res.status(201).json(newUser);
};

exports.updateUser = (req,res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if(!user) return res.status(404).send('Usuário não encontrado');
    user.name = req.body.name;
    res.json(user);
};


exports.deleteUser = (req,res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if(index === -1) res.status(404).send('Usuário não encontrado.');
    users.splice(index,1);
    res.status(204).send();
}
