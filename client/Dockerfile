FROM node:16.18.0 as build

LABEL version="0.0.1"
LABEL description="Greek Gods Arena Frontend"
LABEL maintainer = ["sadaouiwalid@gmail.com"]

WORKDIR /app

COPY ./client .
RUN ls -l
RUN npm ci
RUN npm run build

FROM nginx:1.23.2 as run

LABEL version="0.0.1"
LABEL description="Greek Gods Arena Frontend"
LABEL maintainer = ["sadaouiwalid@gmail.com"]

ENV NODE_ENV=production
RUN echo VITE_API_URL=https://gga-api.walidsadaoui.com >> /app/.env

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
COPY --from=build /app/dist /usr/share/nginx/html
RUN ls -l

EXPOSE 80