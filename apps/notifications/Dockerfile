FROM node:alpine as builder

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

FROM builder as development

CMD ["yarn", "start:dev", "notifications"]

FROM builder as prod_builder

RUN yarn build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY --from=prod_builder /usr/src/app/dist ./dist

CMD ["node", "dist/apps/notifications/main"]




