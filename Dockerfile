FROM nginx:stable-alpine

# 复制构建好的 dist 目录到 nginx html 目录
COPY dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
