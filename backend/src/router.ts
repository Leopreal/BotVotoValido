import { Router, Request, Response } from "express";
import Message from "../model/Message";

const router = Router();

export default router.get("/teste", (req: Request, res: Response) => {
  res.status(200).send("api funcionando");
});

router.post("/messages", async (req: Request, res: Response) => {
  try {
    console.log("Dados recebidos:", req.body); // Adicione esta linha
    const { location, category, subcategory, photo } = req.body;

    const newMessage = new Message({
      location,
      category,
      subcategory,
      photo,
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: "Erro ao salvar a mensagem", error });
  }
});

router.get("/messages", async (req: Request, res: Response) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar as mensagens", error });
  }
});
