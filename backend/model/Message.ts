import mongoose from 'mongoose';

// Definir a estrutura dos dados
const messageSchema = new mongoose.Schema({
  location: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  photo: { type: String, required: true },
}, {
  timestamps: true  
});


const Message = mongoose.model('Message', messageSchema);

export default Message;
