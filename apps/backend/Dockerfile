ARG IMAGE=node:16-alpine3.16

# Base image
FROM ${IMAGE} AS development

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Use the node user from the image (instead of the root user)
USER node


FROM ${IMAGE} AS build

WORKDIR /usr/src/app

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

# Set NODE_ENV environment variable
ENV NODE_ENV production

# generate prisma client
RUN npx prisma generate
# Run the build command which creates the production bundle
RUN npm run build


USER node


FROM ${IMAGE} AS production

WORKDIR /usr/src/app

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=build /usr/src/app/package.json ./
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/prisma ./prisma
# COPY --chown=node:node --from=build /usr/src/app/healthcheck.js ./healthcheck.js

EXPOSE 5000
ENV NODE_ENV production
ENV PORT 5000

# Start the server using the production build
CMD [ "npm", "run", "start:prod" ]