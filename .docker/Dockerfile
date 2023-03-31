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
RUN rm -r -f node_modules
RUN rm -f package-lock.json
RUN yarn

# build stage
FROM local-deps-stage as build-stage
ENV SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp4aXptbXppYXF2a2J5a2h0a216Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzg1MDMyOTYsImV4cCI6MTk5NDA3OTI5Nn0.YMxRdK1f88sPdIl8AqCCBOFrSWZld833hCEIfYMnwJg
ENV SUPABASE_URL=https://jxizmmziaqvkbykhtkmz.supabase.co
RUN quasar build -m ssr

# prod stage
FROM build-stage as prod-stage
WORKDIR /app/source/dist/ssr
RUN mv * ../../../
WORKDIR /app
RUN rm -r -f source
RUN yarn
CMD ["pm2-runtime", "index.js"]

# dev stage
# FROM local-deps-stage as dev-stage
# RUN quasar dev -m ssr
