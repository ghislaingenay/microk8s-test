FROM node:20-alpine AS base

FROM base AS builder

RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*json tsconfig.json src ./
RUN npm i -g pnpm
RUN pnpm i && \
    pnpm run build && \
    pnpm prune --production

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono

COPY --from=builder --chown=hono:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=hono:nodejs /app/build /app/build

USER hono
EXPOSE 8000

CMD ["node", "/app/build/index.js"]