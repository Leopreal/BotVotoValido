import conexao_mongo

def buscar_estados_com_denuncias():
    client = conexao_mongo.get_mongo_client()
    database = conexao_mongo.get_database(client)
    uf_collection = conexao_mongo.get_collection(database, "uf")
    pipeline = [
        {
            "$group": {
                "_id": "$localizacao.uf"
            }
        },
        {
            "$project": {
                "_id": 0,
                "uf": "$_id"
            }
        }
    ]
    resultado = list(uf_collection.aggregate(pipeline))
    return [estado['uf'] for estado in resultado if estado['uf'] is not None]

def buscar_cidades_por_estado(estado):
    client = conexao_mongo.get_mongo_client()
    database = conexao_mongo.get_database(client)
    uf_collection = conexao_mongo.get_collection(database, "uf")
    pipeline = [
        {
            "$match": {
                "localizacao.uf": estado
            }
        },
        {
            "$group": {
                "_id": "$localizacao.city"
            }
        },
        {
            "$project": {
                "_id": 0,
                "cidade": "$_id"
            }
        }
    ]
    resultado = list(uf_collection.aggregate(pipeline))
    return [cidade['cidade'] for cidade in resultado]

def buscar_denuncias_por_cidade(cidade):
    client = conexao_mongo.get_mongo_client()
    database = conexao_mongo.get_database(client)
    uf_collection = conexao_mongo.get_collection(database, "uf")
    pipeline = [
        {
            "$match": {
                "localizacao.city": cidade,
                "localizacao.rua": {"$exists": True}
            }
        },
        {
            "$project": {
                "_id": 0,
                "categoria": "$categoria",
                "sub_categoria": "$sub_categoria",
                "localizacao": "$localizacao"
            }
        }
    ]
    resultado = list(uf_collection.aggregate(pipeline))
    return resultado

def buscar_atualizacoes(estado):
    pipeline = [
        {
            "$match": {
                "localizacao.uf": estado
            }
        },
        {
            "$project": {
                "_id": 0,
                "descricao": "$descricao",
                "localizacao": "$localizacao"
            }
        }
    ]
    resultado = list(conexao_mongo.uf_collection.aggregate(pipeline))
    return resultado

def buscar_cidades():
    client = conexao_mongo.get_mongo_client()
    database = conexao_mongo.get_database(client)
    uf_collection = conexao_mongo.get_collection(database, "uf")
    pipeline = [
        {
            "$group": {
                "_id": "$localizacao.city",
                "count": {"$sum": 1}
            }
        },
        {
            "$sort": {
                "count": -1
            }
        }
    ]
    resultado = list(uf_collection.aggregate(pipeline))
    return [cidade['_id'] for cidade in resultado]

def buscar_local(uf=False):
    client = conexao_mongo.get_mongo_client()
    database = conexao_mongo.get_database(client)
    uf_collection = conexao_mongo.get_collection(database, "uf")
    pipeline = [
        {
            "$group": {
                "_id": "$localizacao.uf" if uf else "$localizacao.city",
                "count": {"$sum": 1}
            }
        },
        {
            "$sort": {
                "count": -1
            }
        }
    ]
    resultado = list(uf_collection.aggregate(pipeline))
    return [uf['_id'] for uf in resultado]  # Retorna uma lista de strings