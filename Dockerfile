FROM node:20-alpine

WORKDIR /app

# Cache de dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código (também é montado via volume no compose)
COPY . .

EXPOSE 5173

# --host 0.0.0.0 é essencial: sem isso o Vite só escuta em localhost
# dentro do container e a porta mapeada não responde
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]