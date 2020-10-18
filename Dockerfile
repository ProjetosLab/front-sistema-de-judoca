FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY /dist/sistema-de-judocas /usr/share/nginx/html