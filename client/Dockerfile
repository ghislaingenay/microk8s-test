FROM node:20.11.1-alpine3.19 AS build
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm

ARG VITE_BACK_END
ARG VITE_ACCESS_TOKEN
ENV VITE_BACK_END=$VITE_BACK_END
ENV VITE_ACCESS_TOKEN=$VITE_ACCESS_TOKEN
RUN pnpm i
COPY . ./ 
RUN pnpm run build

EXPOSE 3000

ENV NODE_ENV=production
ENV MODE=production

# docker run -p 8080:80 <image> to run the 

FROM nginx:1.25.4-alpine3.18 

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /var/www/html

EXPOSE 3000

ENTRYPOINT ["nginx","-g","daemon off;"]