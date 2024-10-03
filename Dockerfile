FROM node:alpine

ARG db
ARG jwt
ARG p

ENV MONGO_DB=${db}
ENV JWT_SECRET=${jwt}
ENV PORT=${p}

WORKDIR ./rest_api_ts

COPY package*.json .
RUN npm install
COPY . .

RUN npm run build
RUN rm -rf ./src

EXPOSE ${PORT}

CMD [ "npm", "run", "start:prod" ]