FROM node:12

COPY dist /dist
COPY package.json .
COPY docker/app.js .

# EXPOSE 80

RUN npm install --production

ENTRYPOINT ["node", "app.js"]
