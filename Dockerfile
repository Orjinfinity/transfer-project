FROM node:18-alpine as build
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev > /dev/null 2>&1

ARG NODE_ENV=production
ARG NEXT_PUBLIC_CMS_BASE_URL
ARG PORT=3000

ENV NODE_ENV=${NODE_ENV}
ENV NEXT_PUBLIC_CMS_BASE_URL=${NEXT_PUBLIC_CMS_BASE_URL}
ENV PORT=${PORT}

WORKDIR /opt/app
COPY ./package.json ./yarn.lock ./
ENV PATH /opt/app/node_modules/.bin:$PATH
RUN yarn config set network-timeout 600000 -g && yarn install --production
COPY . .
RUN yarn build

FROM node:18-alpine
RUN apk add --no-cache vips-dev

ARG NODE_ENV=production
ARG NEXT_PUBLIC_CMS_BASE_URL
ARG PORT=3000

ENV NODE_ENV=${NODE_ENV}
ENV NEXT_PUBLIC_CMS_BASE_URL=${NEXT_PUBLIC_CMS_BASE_URL}
ENV PORT=${PORT}

WORKDIR /opt/app
COPY --from=build /opt/app/node_modules ./node_modules
COPY --from=build /opt/app/. .
EXPOSE ${PORT}
CMD ["yarn", "start"]
