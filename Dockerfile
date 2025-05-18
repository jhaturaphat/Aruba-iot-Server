# Stage 1: Build stage
FROM node:18 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Build the application (สำหรับแอปที่ต้องมีขั้นตอน build เช่น Next.js, React)
# RUN npm run build

# Stage 2: Production stage
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app /app

# Expose the port the app runs on
EXPOSE 4000

# Command to run the application
CMD ["node", "src/server.js"]