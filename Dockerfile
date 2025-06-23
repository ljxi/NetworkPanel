# syntax=docker/dockerfile:1

# 第一阶段：构建阶段
FROM node:18-alpine AS build-stage

RUN npm install -g pnpm

WORKDIR /app

COPY . .

RUN pnpm install

RUN pnpm run build

# 第二阶段：生产阶段
FROM nginx:stable-alpine AS production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
