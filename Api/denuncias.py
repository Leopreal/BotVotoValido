from flask import Flask, request, jsonify
from pymongo import MongoClient
import keys
from  funcoes.consultas_maps import salvar_uf_bairro_cidade

app = Flask(__name__)

# Conectar ao banco de dados
client = MongoClient(keys.STRING_CONNECTION)
db = client["denuncias"]

# Definir a rota para criar uma denúncia
@app.route("/denuncias", methods=["POST"])
def criar_denuncia():
    dados = request.get_json()
    foto = request.files.get("foto")
    foto_nome = foto.filename
    foto.save(foto_nome)
    denuncia = {
        "descrição": dados["descrição"],
        "categoria": dados["categoria"],
        "localização": dados["localização"],
        "foto": foto_nome
    }
    db.denuncias.insert_one(denuncia)
    return jsonify({"mensagem": "Denúncia criada com sucesso"})

# Definir a rota para ler todas as denúncias
@app.route("/denuncias", methods=["GET"])
def ler_denuncias():
    denuncias = list(db.denuncias.find())
    return jsonify(denuncias)

# Definir a rota para obter a localização
@app.route("/localizacao", methods=["POST"])
def get_localizacao():
    coordenadas = request.get_json()['coordenadas']
    localizacao = salvar_uf_bairro_cidade(coordenadas)
    return jsonify(localizacao)

if __name__ == "__main__":
    app.run(debug=True)