import pymongo
import telebot
import conexao_mongo
import funcoes.buscas
import funcoes.consultas_maps
import funcoes.tratamentos
import keys
from telebot import types
from datetime import datetime
from problemas import dic_problemas, topicos, estados
from flask import Flask, request

api_key = keys.Token_Maps
bot = telebot.TeleBot(keys.CHAVE_API)  # Criação/conexão com a chave API
client = pymongo.MongoClient(keys.STRING_CONNECTION)

user_data = {}  # Armazena chat_id do usuário


app = Flask(__name__)

@bot.message_handler(commands=['start'])
def send_welcome(message):
    chat_id = message.chat.id
    user_data[chat_id] = {'chat_id': chat_id}
    print('dic inteiro:', user_data, '\ndic do user:', user_data[chat_id])

    markup = types.ReplyKeyboardMarkup(one_time_keyboard=True)
    btn_no_local = types.KeyboardButton('Relatar um novo problema.')
    btn_solved = types.KeyboardButton('Encontrei um problema que foi resolvido!')
    btn_resumo = types.KeyboardButton('Consultar atualizações da minha cidade.')
    markup.row(btn_no_local)
    markup.row(btn_solved, btn_resumo)
    bot.send_message(chat_id, funcoes.tratamentos.texto_padrao(boas_vindas=True), reply_markup=markup)

@bot.message_handler(func=lambda message: message.text == 'Relatar um novo problema.')
def relatar_novo_problema(message):
    chat_id = message.chat.id
    user_data[chat_id] = {'time': datetime.now()}
    conexao_mongo.adicionar_dados(user_data[chat_id])
    print(user_data)
    bot.send_message(chat_id, 'Envie uma foto do problema que você encontrou\nLembre-se, apenas UMA FOTO')


@bot.message_handler(func=lambda message: message.text == 'Consultar atualizações da minha cidade.')
def consulta_uf(message):
    chat_id = message.chat.id
    user_data[chat_id] = {'consulta': True}
    print(user_data)

    # Busca os estados diretamente como uma lista
    uf_distinct = funcoes.buscas.buscar_estados_com_denuncias()

    markup = types.InlineKeyboardMarkup()
    
    # Itera sobre a lista de estados
    for uf in uf_distinct:  # Acessa a lista diretamente
        uf_button = types.InlineKeyboardButton(uf, callback_data=uf)
        markup.row(uf_button)
    
    bot.send_message(chat_id, 'Selecione o estado que deseja consultar', reply_markup=markup)

@bot.message_handler(func=lambda message: message.text == 'Encontrei um problema que foi resolvido!')
def problema_resolvido(message):
    bot.send_message(message.chat.id, 'Que ótimo!👍\nEstamos desenvolvendo essa funcionalidade. Avisaremos assim que possível😁🤝!')

@bot.message_handler(content_types=['photo', 'video', 'doc', 'audio', 'location'])
def salvar_types(message):
    chat_id = message.chat.id
    
    if message.content_type == 'photo':
        imagem = funcoes.tratamentos.salvar_imagem(message)
        user_data[chat_id]['imagem'] = imagem
        conexao_mongo.atualizar(user_data[chat_id].get('_id'), user_data[chat_id])
        print(user_data)

        markup = types.InlineKeyboardMarkup()
        sim_button = types.InlineKeyboardButton('Sim', callback_data='sim_no_local')
        nao_button = types.InlineKeyboardButton('Não', callback_data='nao_no_local')
        markup.row(sim_button, nao_button)
        bot.send_message(chat_id, "Você está no local do problema?", reply_markup=markup)

    if message.content_type == 'location':
        coordenadas = [message.location.latitude, message.location.longitude]
        user_data[chat_id]['state_location'] = 'gps'
        try:
            user_data[chat_id]['localizacao'] = funcoes.consultas_maps.salvar_uf_bairro_cidade(coordenadas)
            conexao_mongo.atualizar(user_data[chat_id].get('_id'), user_data[chat_id])
        except UnboundLocalError:
            bot.send_message(chat_id, "Ops, por favor, clique aqui em /start \nvamos tentar de novo, não achei o local.\n:( ")
        
        markup = types.InlineKeyboardMarkup()
        for topic in dic_problemas:
            btn_categoria = types.InlineKeyboardButton(topic, callback_data=topic)
            markup.row(btn_categoria)
        bot.send_message(chat_id, "Selecione abaixo uma categoria para o problema encontrado:", reply_markup=markup)

@bot.callback_query_handler(func=lambda call: call.data in ('nao_no_local', 'sim_no_local'))
def receber_localizacao(call):
    chat_id = call.message.chat.id
    if call.data == 'nao_no_local':
        user_data[chat_id]['state_location'] = 'manual'
        user_data[chat_id]['try_location'] = 1
        bot.send_message(chat_id, "Então escreva pra mim o local do problema\n\nInsira o estado, cidade, bairro e rua...\n\n")
        bot.send_message(chat_id, "Você também pode inserir o nome de um local, como: 'Escola x', 'praça da cidade', 'UPA da cidade'...")

    elif call.data == 'sim_no_local':
        markup = types.ReplyKeyboardMarkup(one_time_keyboard=True)
        itembtn = types.KeyboardButton('compartilhar Localização 📍', request_location=True)
        markup.add(itembtn)
        bot.send_message(chat_id, "Por favor, compartilhe sua localização atual, clicando no botão abaixo: ⬇️", reply_markup=markup)

@bot.callback_query_handler(func=lambda call: call.data in ('nao_mapa', 'sim_mapa'))
def verificar_local_no_mapa(call):
    chat_id = call.message.chat.id
    if call.data == 'sim_mapa':
        del user_data[chat_id]['try_location']
        markup = types.InlineKeyboardMarkup()
        for topic in dic_problemas:
            btn_categoria = types.InlineKeyboardButton(topic, callback_data=topic)
            markup.row(btn_categoria)
        bot.send_message(chat_id, "Selecione abaixo a categoria do problema encontrado", reply_markup=markup)

    if call.data == 'nao_mapa':
        del user_data[chat_id]['localizacao']
        bot.send_message(chat_id, "Entendi. Vamos tentar de novo, dessa vez, coloque mais detalhes, como bairro, cidade, nome da rua, ou até mesmo um nº residencial próximo.")

@bot.message_handler(func=lambda message: True)
def salvar_local_categoria(message):
    chat_id = message.chat.id
    if "categoria" in user_data[chat_id] and "sub_categoria" in user_data[chat_id] and "localizacao" in user_data[chat_id]:
        categoria = user_data[chat_id]["categoria"]
        sub_categoria = user_data[chat_id]["sub_categoria"]
        localizacao = user_data[chat_id]["localizacao"]
        rua = localizacao["rua"]
        cidade = localizacao["city"]
        dados = {
            "categoria": categoria,
            "sub_categoria": sub_categoria,
            "localizacao": {
                "rua": rua,
                "city": cidade
            }
        }
        conexao_mongo.adicionar_dados(dados)
        user_data[chat_id] = {}  # Limpar o dicionário user_data

    # Enviar mapa para confirmar localização
    if user_data[chat_id].get('try_location'):
        lat_long = funcoes.consultas_maps.salvar_latlong_endereco(message.text)
        bot.send_location(chat_id, lat_long[0], lat_long[1])
        user_data[chat_id]['localizacao'] = funcoes.consultas_maps.salvar_uf_bairro_cidade(lat_long)

        markup = types.InlineKeyboardMarkup()
        sim_button = types.InlineKeyboardButton('Sim', callback_data='sim_mapa')
        nao_button = types.InlineKeyboardButton('Não', callback_data='nao_mapa')
        markup.row(sim_button, nao_button)
        bot.send_message(chat_id, "É aqui que o problema se encontra? Você pode tocar no mapa e dar zoom, para ter mais precisão na verificação", reply_markup=markup)

    # Verificar a seleção de categorias/adicionar no banco de dados
    if 'categoria' in user_data[chat_id]:
        user_data[chat_id]['sub_categoria'] = message.text
        user_data[chat_id]['state_atual'] = {'corrigido': False, 'analise': False, 'nao_corrigido': True}
        conexao_mongo.atualizar(user_data[chat_id].get('_id'), user_data[chat_id])
        bot.send_message(chat_id, f"Pronto, já adicionamos o problema de {message.text} ao nosso sistema. 🤝🥳\n{funcoes.tratamentos.texto_padrao(agradecimento=True)}")
        conexao_mongo.adicionar_dados(user_data[chat_id])
        del user_data[chat_id]['_id']

    elif user_data[chat_id].get('consulta'):
        problemas_encontrados = funcoes.buscas.buscar_atualizacoes(message.text)
        bot.send_message(chat_id, problemas_encontrados)

# Buscar categorias de problemas
@bot.callback_query_handler(func=lambda call: call.data in topicos)
def topic_selected(call):
    # Buscar por categoria para exibir atualização
    chat_id = call.message.chat.id
    selected_topic = call.data
    user_data[chat_id]['categoria'] = selected_topic
    markup = types.ReplyKeyboardMarkup(resize_keyboard=True, one_time_keyboard=True)
    for subtopic in dic_problemas[selected_topic]:
        markup.add(types.KeyboardButton(subtopic))
    bot.send_message(call.message.chat.id, f"Você escolheu: {selected_topic}.\nQual subcategoria?", reply_markup=markup)

# Novo código para seleção de estado e cidades
@bot.callback_query_handler(func=lambda call: call.data in funcoes.buscas.buscar_estados_com_denuncias())
def handle_state_selection(call):
    chat_id = call.message.chat.id
    selected_state = call.data
    user_data[chat_id]['estado'] = selected_state

    # Busca as cidades correspondentes ao estado selecionado
    cidades = funcoes.buscas.buscar_cidades_por_estado(selected_state)
    
    markup = types.InlineKeyboardMarkup()
    for cidade in cidades:
        cidade_button = types.InlineKeyboardButton(cidade, callback_data=cidade)
        markup.add(cidade_button)

    bot.send_message(chat_id, f"Selecione a cidade em {selected_state}:", reply_markup=markup)

@bot.callback_query_handler(func=lambda call: call.data in funcoes.buscas.buscar_cidades_por_estado(user_data[call.message.chat.id]['estado']))
def handle_city_selection(call):
    chat_id = call.message.chat.id
    selected_city = call.data
    user_data[chat_id]['cidade'] = selected_city

    # Busca as denúncias correspondentes à cidade selecionada
    denuncias = funcoes.buscas.buscar_denuncias_por_cidade(selected_city)
    
    if denuncias:
        mensagem = "Esses são os problemas registrados da cidade:\n\n"
        for denuncia in denuncias:
            categoria = denuncia['categoria']
            sub_categoria = denuncia['sub_categoria']
            localizacao = denuncia['localizacao']

            rua = localizacao['rua']
            if rua.startswith('Rua '):
                mensagem += f"{rua}\n"
            else:
                mensagem += f"Rua {rua}\n"
            mensagem += f"{categoria } ({ sub_categoria})\n\n"
        bot.send_message(chat_id, mensagem)
    else:
        bot.send_message(chat_id, "Nenhum problema encontrado em " + selected_city + ".")



if __name__ == '__main__':
    bot.delete_webhook()
    bot.polling()