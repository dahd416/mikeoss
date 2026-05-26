FROM node:20-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    libreoffice-core libreoffice-writer fontconfig fonts-liberation \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .
RUN npm run build

EXPOSE 3001

CMD ["node", "dist/index.js"]
