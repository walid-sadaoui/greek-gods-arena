FROM node:16.18.0 as build

LABEL version="0.0.1"
LABEL description="Greek Gods Arena Frontend"
LABEL maintainer = ["sadaouiwalid@gmail.com"]

WORKDIR /app

COPY ./client .
RUN ls -l
RUN npm ci
RUN npm run build

FROM node:16.18.0

LABEL version="0.0.1"
LABEL description="Greek Gods Arena Frontend"
LABEL maintainer = ["sadaouiwalid@gmail.com"]

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN npm ci --omit=dev
COPY --from=build /app/dist .
RUN ls -l

EXPOSE 3000

CMD ["npm", "run", "vite"]