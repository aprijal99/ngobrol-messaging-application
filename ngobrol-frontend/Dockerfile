FROM node:16.14.2-alpine as base
WORKDIR base
COPY package.json package-lock.json ./
RUN npm ci

FROM node:16.14.2-alpine as build
WORKDIR build
COPY --from=base base/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:16.14.2-alpine
WORKDIR app
COPY --from=build build/public ./public
COPY --from=build app/.next/standalone ./
COPY --from=build app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
