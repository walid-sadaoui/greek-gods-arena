FROM node:16.18.0

LABEL version="0.0.1"
LABEL description="Greek Gods Arena API"
LABEL maintainer = ["sadaouiwalid@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN ls
RUN npm install --production
COPY . .

EXPOSE 5000

CMD ["node", "backend.js"]