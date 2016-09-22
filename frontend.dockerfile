FROM lukaasp/alpine-nginx

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

RUN mkdir /var/www/frontend

ADD ./dist /var/www/frontend

CMD ["nginx", "-g", "daemon off;"]
