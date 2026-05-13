import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    telefono: { type: String, required: true },
    codiceFiscale: { type: String, uppercase: true },
    canaleNotifica: {
        type: String,
        enum: ['mail', 'whatsapp'],
        default: 'mail'
    },
    isPremium: { type: Boolean, default: false },
    statoMonitoraggio: {
        type: String,
        enum: ['attivo', 'trovato', 'pausa'],
        default: 'attivo'
    }
}, { timestamps: true });
const User = mongoose.model('User', UserSchema);

export default User;