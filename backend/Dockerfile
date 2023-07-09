# Base image
FROM node:16-alpine3.16 AS development

# Create app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile --production && yarn cache clean

# Use the node user from the image (instead of the root user)
USER node


FROM node:16-alpine3.16 AS build

WORKDIR /usr/src/app


# In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

# generate prisma client
RUN npx prisma generate
# Run the build command which creates the production bundle
RUN yarn build

# Set NODE_ENV environment variable
ENV NODE_ENV production

USER node


FROM node:16-alpine3.16 AS production

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
CMD [ "yarn", "start:prod" ]