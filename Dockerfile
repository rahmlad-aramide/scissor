FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Vite inlines these at build time. In Dokploy, set them as Build Arguments
# (not runtime env vars) on the application.
ARG VITE_API_URL=https://api.scissor.rahmlad.com
ARG VITE_SHORT_BASE=https://s.rahmlad.com
ENV VITE_API_URL=$VITE_API_URL VITE_SHORT_BASE=$VITE_SHORT_BASE
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
