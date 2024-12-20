FROM node:22.11.0 as build

LABEL version="0.0.1"
LABEL description="Greek Gods Arena API"
LABEL maintainer = ["sadaouiwalid@gmail.com"]

WORKDIR /app

COPY ./api .
RUN ls -l
RUN npm ci
RUN npm run build

FROM node:22.11.0

LABEL version="0.0.1"
LABEL description="Greek Gods Arena API"
LABEL maintainer = ["sadaouiwalid@gmail.com"]

ENV NODE_ENV=production

WORKDIR /app

COPY ./api/package.json package.json
COPY ./api/package-lock.json package-lock.json
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
RUN ls -l

EXPOSE 3000

CMD ["node", "dist/server.js"]