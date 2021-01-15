FROM node:12

COPY dist /dist
COPY package.json .
COPY app.js .

# EXPOSE 80

RUN npm install --only=production

ENTRYPOINT ["node", "app.js"]
