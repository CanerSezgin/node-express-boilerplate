FROM node:14.16.0-alpine3.10

# default NODE_ENV: Production
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# default PORT: 3000
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY package*.json ./

USER node

RUN npm install --no-optional && npm cache clean --force

COPY --chown=node:node . .

EXPOSE 3000