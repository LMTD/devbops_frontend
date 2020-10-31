# FROM node:lts-alpine as build-stage
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build     

# # production stage
# FROM nginx:stable-alpine as production-stage
# COPY --from=build-stage /app/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]


FROM debian:latest

RUN apt-get update && apt-get install -y apache2 \
    install curl \
    curl -sL https://deb.nodesource.com/setup_10.x | -E bash - \
    apt-get install -y nodejs

COPY ./* /var/www/devbops_frontend/
RUN npm install /var/www/devbops_frontend

COPY ./devbops.com.conf /etc/apache2/sites-available/devbops.com.conf

RUN a2ensite devbops.com.conf
RUN a2enmod rewrite

RUN systemctl restart apache2

EXPOSE 80
WORKDIR /var/www/devbops_event_microservice

