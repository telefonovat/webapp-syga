FROM node:20-alpine AS builder

ARG GITHUB_TOKEN
# Enable pnpm via Corepack
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# For downloading private package
RUN echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" > .npmrc \
    && echo "@telefonovat:registry=https://npm.pkg.github.com" >> .npmrc

RUN pnpm install

COPY . .

# CMD ["pnpm", "dev:start"]
CMD ["pnpm", "build"]


