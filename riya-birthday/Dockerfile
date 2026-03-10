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
# Important: ensure Next.js uses port 3002 inside the standalone server script
ENV PORT=3002
ENV HOSTNAME="0.0.0.0"

# Copy the public directory (standalone doesn't include it by default)
COPY --from=builder /app/public ./public

# Automatically leverage output traces to dramatically reduce image size
# Copy the built standalone application
COPY --from=builder /app/.next/standalone ./
# Copy static files separately (standalone doesn't include them to allow serving via CDN if needed)
COPY --from=builder /app/.next/static ./.next/static

# Copy your local custom directories & envs
COPY --from=builder /app/.env ./
COPY --from=builder /app/data ./data

EXPOSE 3002

# Start the standalone Node.js server instead of using "npm start"
CMD ["node", "server.js"]