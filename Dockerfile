# Enironment Installation and Install Depedencies
FROM node:20-alpine
WORKDIR /parallelix
COPY package*.json ./
RUN npm install -g nodemon && npm install
COPY . .
EXPOSE 80 443 8080 4443

# Start Application
CMD ["nodemon", "run"]