FROM node:lts-alpine
# Create dir inside container 
WORKDIR /app

#loading dependencies
COPY package*.json ./

#Install dependencies
RUN npm install

#Copy sources
COPY . .

#build

RUN npm run build


#Gets executed when starting the container
CMD ["npm", "run", "serve"]
