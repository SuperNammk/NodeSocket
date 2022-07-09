FROM node:lts-alpine
COPY . .
RUN npm ci

EXPOSE 4000
CMD ["node", "index.js"]