FROM node

WORKDIR /usr/src/igma-challenge
COPY . . 
RUN npm i
RUN npm run build

CMD ["npm","run","start:docker"]