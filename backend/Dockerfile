FROM node:18
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

COPY prisma ./prisma/

RUN npm install

COPY . .

#RUN npx prisma generate

RUN npm run build

EXPOSE 3000

ENV NODE_ENV production

#CMD [ "node", "dist/index.js" ]
CMD [  "npm", "run", "start:migrate:prod" ]

