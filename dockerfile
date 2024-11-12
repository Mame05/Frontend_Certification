FROM node:20.9.0

WORKDIR /app
COPY . .
RUN npm install -g @angular/cli@~17.3.0
RUN npm install --force

EXPOSE 4200

CMD npm run start