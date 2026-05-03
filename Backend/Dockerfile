# ---------- BUILD STAGE ----------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# ---------- PRODUCTION STAGE ----------
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

# Copy TS compiled files
COPY --from=build /app/dist ./dist

# FIX: copy Sequelize JS files
COPY --from=build /app/src/models ./dist/models
COPY --from=build /app/src/config ./dist/config

RUN apk add --no-cache wget

RUN mkdir -p /app/dist/logs

RUN addgroup app && adduser -S -G app app
USER app

EXPOSE 5000

CMD ["node", "dist/server.js"]