FROM node:15.7.0-alpine3.10
RUN apk add --no-cache bash

# Create dir inside container 
WORKDIR /app

#loading dependencies
COPY ["package.json", "package-lock.json*", "tsconfig.json", "./"]

#Install dependencies
RUN npm install


#Copy sources
COPY . .

#Gets executed for the build
RUN npm run build

#Gets executed when starting the container
CMD ["npm", "start"]