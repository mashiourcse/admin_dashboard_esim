FROM node:18-alpine 
# RUN apk update && apk upgrade --no-cache

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
RUN ["chmod", "+x", "entrypoint.sh"]
ENTRYPOINT [ "sh","entrypoint.sh" ]
