FROM node:8.10-alpine as builder
ARG app_env
ENV APP_ENV $app_env

RUN apk add --update yarn

WORKDIR /app/mkapp
ADD . /app/mkapp
RUN yarn install
RUN yarn build

FROM nginx:alpine
COPY --from=builder /app/mkapp/build /var/www/mkapp
COPY nginx.conf /etc/nginx/nginx.conf
COPY nginx-default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
