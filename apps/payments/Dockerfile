FROM node:alpine as builder

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN yarn install

COPY apps/payments ./apps/payments
COPY libs ./libs

RUN cd apps/payments && yarn install

FROM builder as development

CMD ["yarn", "start:dev", "payments"]

FROM builder as prod_builder

RUN yarn build payments

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production

COPY --from=prod_builder /usr/src/app/dist ./dist

CMD ["node", "dist/apps/payments/main"]




