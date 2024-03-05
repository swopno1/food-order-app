FROM node:18-alpine
WORKDIR /src
COPY . .
RUN yarn install --omit=dev
RUN yarn build
CMD ["npm", "start"]
