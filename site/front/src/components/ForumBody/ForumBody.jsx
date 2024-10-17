import React, { useState, useEffect } from 'react';
import { Card, CardImage, CardTitle, CardContent, Button, ExpandedContent, CardContainer } from './style';

const ForumBody = () => {
    const [cardsData, setCardsData] = useState([]); // Estado para armazenar os dados das mensagens
    const [expandedCardId, setExpandedCardId] = useState(null);
  
    useEffect(() => {
      const fetchMessages = async () => {
        try {
          const response = await fetch('http://localhost:3333/api/messages');
          if (!response.ok) {
            throw new Error('Erro ao buscar mensagens');
          }
          const data = await response.json();
          // Mapear os dados da API para o formato dos cards
          const formattedData = data.map((message) => ({
            id: message._id, // Usar o _id retornado pela API como ID do card
            title: `Reclamação de ${message.location}`, // Título baseado na localização
            content: `Categoria: ${message.category}, Subcategoria: ${message.subcategory}`, // Conteúdo breve
            expandedContent: `Foto: ${message.photo}`, // Conteúdo expandido (pode ser alterado conforme necessário)
            imageUrl: message.photo, // Supondo que a foto seja uma URL
          }));
          setCardsData(formattedData);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchMessages();
    }, []);

  const handleToggleExpand = (id) => {
    if (expandedCardId === id) {
      setExpandedCardId(null); 
    } else {
      setExpandedCardId(id); 
    }
  };

  return (
    <CardContainer>
      {cardsData.map((card) => (
        <Card key={card.id}>
          <CardImage src={card.imageUrl} alt={`Imagem da ${card.title}`} />
          <CardTitle>{card.title}</CardTitle>
          <CardContent>{card.content}</CardContent>
          <Button onClick={() => handleToggleExpand(card.id)}>Ler mais</Button>
          {expandedCardId === card.id && (
            <ExpandedContent>{card.expandedContent}</ExpandedContent>
          )}
        </Card>
      ))}
    </CardContainer>
  );
};

export default ForumBody;