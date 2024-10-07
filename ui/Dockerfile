FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

ENV NODE_ENV=production
# NEXT_PUBLIC_API_ADDR is passed as build arg
ENV NEXT_PUBLIC_API_ADDR=${NEXT_PUBLIC_API_ADDR}
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN mkdir .next

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
