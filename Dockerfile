# syntax=docker/dockerfile:1
FROM nginx:stable-alpine

COPY ./dist /usr/share/nginx/html
EXPOSE 80
