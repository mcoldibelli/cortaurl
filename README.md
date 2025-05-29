# Encurtador de URL — Frontend

Frontend React do projeto de encurtamento de URLs, permitindo criar, visualizar e gerenciar URLs curtas. Integração total com backend serverless (AWS Lambda, DynamoDB e autenticação Firebase).

## ✨ Funcionalidades

- Encurtar qualquer URL (sem autenticação)
- Login (Firebase Auth)
- Listar URLs criadas pelo usuário logado
- Copiar URLs encurtadas com 1 clique
- Deletar URLs criadas
- Visualizar estatísticas das URLs (em desenvolvimento)
- Interface responsiva e moderna (React + Vite + Tailwind)

## 🚀 Como rodar o projeto localmente

1. **Clone o repositório:**
   ```sh
   git clone https://github.com/mcoldibelli/cortaurl.git
   cd cortaurl
2. **Instale as dependências**
   ``` 
    npm install
3. **Configure as variáveis de ambiente:**
   ```
   cp .env.example .env
  Edite o arquivo ``.env`` com os dados do seu backend e Firebase

4. Rode o servidor de desenvolvimento:
   ```
    npm run dev
5. Acesse:
    ```
    http://localhost:5173


## Stack tecnológica:
- React
- Vite
- Tailwind CSS
- Firebase Auth

## 🔗 Integração com o Backend
O backend (API REST) está documentado e disponível no repositório [cortaurl-backend]("https://github.com/mcoldibelli/cortaurl-backend").

É necessário configurar o endpoint correto na variável VITE_API_BASE do .env.

O login/autenticação utiliza Firebase. Crie um projeto no Firebase Console e configure o Google Auth.