# develop stage
FROM node:16.13.0 as develop-stage
WORKDIR ./app/source
COPY package*.json ./
RUN npm i -g @quasar/cli@latest
RUN npm i -g pm2@latest
COPY . .

# local-deps
FROM develop-stage as local-deps-stage
RUN ls
RUN rm -r -f .quasar
RUN rm -r -f dist
RUN rm -r -f node_moduless
RUN rm -f package-lock.json
RUN npm i

# build stage
FROM local-deps-stage as build-stage
RUN quasar build -m ssr

# prod stage
FROM build-stage as prod-stage
WORKDIR /app/source/dist/ssr
RUN mv * ../../../
WORKDIR /app
RUN rm -r -f source
RUN npm i
CMD ["pm2-runtime", "index.js"]

# dev stage
# FROM local-deps-stage as dev-stage
# RUN quasar dev -m ssr
