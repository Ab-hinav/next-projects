# ---- Build Stage ----
FROM node:20-alpine AS builder

# Update OS packages to patch any high vulnerabilities in the base image
RUN apk update && apk upgrade

WORKDIR /app

# Install ALL dependencies (including devDependencies required for the Next.js build)
COPY package*.json ./
RUN npm install

# Copy source code and build the app
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM node:20-alpine AS runner

# Update OS packages to patch vulnerabilities in the final image
RUN apk update && apk upgrade

WORKDIR /app

ENV NODE_ENV=production

# Copy essential artifacts from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Copy runtime configuration and environment variables
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/.env ./
COPY --from=builder /app/data ./data
EXPOSE 3002

CMD ["npm", "start"]