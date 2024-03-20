# Use uma imagem oficial do Node.js como base
FROM node:18

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie os arquivos package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante dos arquivos do projeto
COPY . .

RUN npm run build

# Execute o comando para iniciar o servidor Next.js
CMD ["npm", "run", "start"]
