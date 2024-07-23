FROM nexus.inno.tech:19120/nginx:1.22.1-alpine

COPY ./nginx/ /etc/nginx/
COPY ./dist/ /var/local/dnp-client-ui/

EXPOSE 80
EXPOSE 8080
