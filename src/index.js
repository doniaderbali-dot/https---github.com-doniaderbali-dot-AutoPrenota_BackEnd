import 'dotenv/config';
import express from 'express';

import connectDB from './config/db.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
const app = express();

const PORT = process.env.PORT || 3000;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.post('/api/register', async (req, res) => {
    const { nome, email, password, telefono, codiceFiscale, canaleNotifiche } = req.body;
    try {
        let userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ msg: 'Utente già esistente' });
        const user = new User({ nome, email, password, telefono, codiceFiscale, canaleNotifiche });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.json({ msg: 'Registrazione completata', userId: user.id });

    } catch (err) {
        res.status(500).send('Errore del server');
    }
});
app.get('api/users', async (req, res) => {
    try {
        const users = await Users.findById(req.params.id).select('-password');
        if (!users) return res.status(404).json({ msg: 'utwenti non trovati' });
        res.json(users);

    }
    catch (err) {
        res.status(500).send('Errore del server');
    }
})

app.listen(PORT, () => console.log(`Server su porto ${PORT}`));
