FROM node:12

COPY dist /dist
COPY package.json .
COPY app.js .

EXPOSE 4200

RUN npm install --only=production
CMD ["node", "app.js"]
