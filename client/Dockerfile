FROM node:lts-slim
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm serve
RUN pnpm i
COPY . ./ 
RUN pnpm run build

EXPOSE 3000

CMD [ "serve", "-s", "/usr/src/app/build" ]
# docker run -p 8080:80 <image> to run the container