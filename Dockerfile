#docker build -t rashod-ui:v0.2.0 .
#docker tag rashod-ui:v0.2.0 uvolodia/pets-projects:rashod-ui_v0.2.0
#docker push uvolodia/pets-projects:rashod-ui_v0.2.0
FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npm run build

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
COPY nginx.conf /etc/nginx/nginx.conf
