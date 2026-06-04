import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import connectDB from './config/db.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
const app = express();

const PORT = process.env.PORT || 5000;
connectDB();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json());
app.use(cookieParser());
app.post('/api/register', async (req, res) => {
    const { nome, email, password, telefono, codiceFiscale, canaleNotifiche } = req.body;
    const nomeFinale = name || nome;
    try {
        let userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ msg: 'Utente già esistente' });
        const user = new User({ nome: nomeFinale, email, password, telefono, codiceFiscale, canaleNotifiche });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        res.json({ msg: 'Registrazione completata', userId: user.id });

    } catch (err) {
        res.status(500).send('Errore del server');
    }
});
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Credenziali non valide' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Credenziali non valide' });
        res.json({
            id: user.id,
            name: user.nome,
            email: user.email,
            msg: 'Login completato'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Errore del server');
    }
});
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ msg: 'Utente non trovato' });
        res.json(user);
    }
    catch (err) {
        res.status(500).send('Errore del server');
    }
})

app.listen(PORT, () => console.log(`Server su porto ${PORT}`));
