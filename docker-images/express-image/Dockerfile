FROM node:14.16.1

COPY src /opt/app
WORKDIR /opt/app

ENV PORT=8080
EXPOSE $PORT

RUN npm install
CMD ["node", "index.js"]