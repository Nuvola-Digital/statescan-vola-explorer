FROM node:22-alpine

WORKDIR /app

COPY . .
RUN corepack enable && \
    echo 'nodeLinker: node-modules' >> .yarnrc.yml && \
    yarn install

# Set production mode to reduce file watchers
ENV NODE_ENV=production

# Note: PACKAGE_NAME and EXECUTION_COMMAND come from runtime secrets
CMD sh -c "cd /app/packages/${PACKAGE_NAME} && yarn install && ${EXECUTION_COMMAND}"

