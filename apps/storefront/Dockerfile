# Install dependencies only when needed
# FROM docker.io/node:18-alpine3.18 as deps
# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
# WORKDIR /usr/src/app
# COPY package*.json ./
# RUN npm ci --omit=dev && npm cache clean --force

# Production image, copy all the files and run next
FROM docker.io/node:18-alpine3.18 as runner
RUN apk add --no-cache dumb-init
ENV NODE_ENV production
ENV PORT 3000
ENV HOST 0.0.0.0
ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /usr/src/app

# COPY --from=deps /usr/src/app/node_modules ./node_modules

# Copy built application files
# Temporary "solution" until fix: https://github.com/vercel/next.js/issues/50072, https://github.com/vercel/next.js/issues/56823
COPY ./next.config.js ./next.config.js
COPY ./public ./public
COPY ./.next/standalone/ ./
COPY ./.next/static ./dist/apps/storefront/.next/static

# Run the application under "node" user by default
RUN chown -R node:node .
USER node
EXPOSE 3000

CMD ["dumb-init", "node", "./apps/storefront/server.js"]
