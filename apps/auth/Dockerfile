FROM node:alpine as builder

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN yarn install

COPY apps/auth ./apps/auth
COPY libs ./libs

RUN cd apps/auth && yarn install

FROM builder as development

CMD ["yarn", "start:dev", "auth"]

FROM builder as prod_builder

RUN yarn build auth

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY --from=prod_builder /usr/src/app/node_modules ./node_modules

COPY --from=prod_builder /usr/src/app/dist ./dist

CMD ["node", "dist/apps/auth/main"]




