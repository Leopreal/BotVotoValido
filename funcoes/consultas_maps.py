import requests
from keys import Token_Maps  # Importando Token_Maps

def salvar_uf_bairro_cidade(coordenadas):  # list
    user_data = {}
    url = f"https://us1.locationiq.com/v1/reverse.php?key={Token_Maps}&lat={coordenadas[0]}&lon={coordenadas[1]}&format=json"
    
    response = requests.get(url)
    if response.status_code != 200:
        return "Erro ao se conectar com o serviço de localização."
    
    data = response.json()
    print(data)  # Debug
    try:
        if data and 'address' in data:
            user_data['lat_long'] = coordenadas
            user_data['uf'] = data['address'].get('state', 'N/A')
            user_data['city'] = data['address'].get('city', data['address'].get('town', data['address'].get('village', 'N/A')))
            user_data['rua'] = data['address'].get('road', 'N/A')  # Captura o nome da rua
            return user_data
        else:
            return "Não consegui localizar o endereço enviado, verifique e tente novamente."
    except KeyError as e:
        return f"Erro ao acessar os dados de localização: {e}"

