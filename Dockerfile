# syntax=docker.io/docker/dockerfile:1

FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Enable corepack for Yarn 3.x support
RUN corepack enable

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Create .yarnrc.yml to force node_modules mode instead of PnP
RUN echo 'nodeLinker: node-modules' > .yarnrc.yml

# Use Yarn to install dependencies
RUN yarn install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Enable corepack in this stage too
RUN corepack enable

# Copy from deps stage
COPY --from=deps /app/node_modules/ ./node_modules/
COPY --from=deps /app/package.json ./
COPY --from=deps /app/yarn.lock ./
COPY --from=deps /app/.yarnrc.yml ./

# Copy source files
COPY . .

# Build the application
RUN yarn build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]