FROM node:16-alpine as base

WORKDIR /src
COPY package*.json /src/
EXPOSE 9000
RUN npm i
COPY . /src


FROM base as production
ENV NODE_ENV=production

CMD ["node", "./index.js"]