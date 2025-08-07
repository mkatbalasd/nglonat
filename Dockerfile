FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY admin-app/dist /usr/share/nginx/html
