FROM node:lts-slim
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm serve

ARG VITE_BACK_END
ARG VITE_ACCESS_TOKEN
ENV VITE_BACK_END=$VITE_BACK_END
ENV VITE_ACCESS_TOKEN=$VITE_ACCESS_TOKEN
RUN pnpm i
COPY . ./ 
RUN pnpm run build

EXPOSE 3000

ENV NODE_ENV=production

CMD [ "serve", "-s", "/usr/src/app/build" ]
# docker run -p 8080:80 <image> to run the container