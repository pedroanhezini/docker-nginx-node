FROM node:14-alpine

WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE $PORT

CMD ["npm", "start"]
