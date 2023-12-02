FROM node:18.19-bullseye-slim as builder

ENV NODE_ENV build

WORKDIR /home/node

COPY . /home/node

RUN npm install \
    && npm run build \
    && npm prune --production

# ---

FROM node:18.19-bullseye-slim

ENV NODE_ENV production

USER node
WORKDIR /home/node

COPY --from=builder /home/node/package*.json /home/node/
COPY --from=builder /home/node/node_modules/ /home/node/node_modules/
COPY --from=builder /home/node/dist/ /home/node/dist/

CMD ["node", "dist/main.js"]

