# Stage 1
FROM  192.168.100.240:8082/nginx/nginxnodfe/node:14.15.4 as build
WORKDIR /app
 COPY . .
 RUN npm install
 RUN npm run build --force
# Stage 2
FROM 192.168.100.240:8082/nginx/nginx:alpine
COPY src/docker/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/samava-front /usr/share/nginx/html
#COPY --from=build ./nginx.conf /etc/nginx/

