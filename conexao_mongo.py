import datetime
from bson import ObjectId
import pymongo



# conexao_mongo.py
from keys import STRING_CONNECTION


def get_mongo_client():
    return pymongo.MongoClient(STRING_CONNECTION)

def get_database(client):
    return client["unioes_federativas"]

def get_collection(database, name):
    return database[name]

def get_uf_collection():
    client = get_mongo_client()
    database = get_database(client)
    return get_collection(database, "uf")

def adicionar_dados(x):
    uf_collection = get_uf_collection()
    x['_id'] = ObjectId()  # Gera um novo _id para cada documento
    x['created_at'] = datetime.datetime.now()
    x['time'] = datetime.datetime.now()  # Adiciona o time ao mesmo documento
    uf_collection.insert_one(x)
    

def remover_itens_incompletos():
    client = get_mongo_client()
    database = get_database(client)
    itens_incompleto_collection = get_collection(database, "itens_incompletos")
    itens_incompleto_collection.delete_many({})

def atualizar(object_id, documento):
    client = get_mongo_client()
    database = get_database(client)
    itens_incompleto_collection = get_collection(database, "itens_incompletos")
    itens_incompleto_collection.update_one({"_id": object_id}, {"$set": documento})