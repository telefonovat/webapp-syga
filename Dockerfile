# Stage 1 : build the application
FROM node:22 as build-stage
WORKDIR /app

# Install npm dependencies
COPY package*.json ./
RUN npm install

# Copy the source code
COPY . .

RUN npm install -g vite

EXPOSE 8080

CMD ["npm", "run", "dev"]
