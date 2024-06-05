const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;
const SECRET_KEY = 'your_jwt_secret';

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/filipino-names', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    middleName: String,
    generation: String,
    gender: String,
});

const User = mongoose.model('User', userSchema);
const Name = mongoose.model('Name', nameSchema);

app.post('/api/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, SECRET_KEY);
    res.json({ token });
});


app.post('api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, SECRET_KEY);
    res.json({ token });
});

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split('')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

app.post('./api/generate', authMiddleware, async (req, res) => {
    const { gender, generation, nameType, suffix } = req.body;
    
    const query = { gender: gender !== 'any' ? gender : { $exists: true } };

    if (generation) {
        query.generation = generation;
    }

    const names = await Name.find(query);
    const generatedNames = names.map(name => {
        let fullName = `${name.firstName} ${name.middleName ? name.middleName[0] + '. ' : ''}${name.lastName}`;
        if (suffix) fullName += 'Jr.';
        return fullName;
    });
    res.json(generatedNames);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});






// const mongoose = require('mongoose');
// const uri = "mongodb+srv://miguelvelasco:x849u2D9juvLKCko@filipino-names.1wzui05.mongodb.net/?retryWrites=true&w=majority&appName=filipino-names";

// const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

// async function run() {
//   try {
//     // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//     await mongoose.connect(uri, clientOptions);
//     await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await mongoose.disconnect();
//   }
// }
// run().catch(console.dir);
