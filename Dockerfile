FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Build the TypeScript project
RUN npm run build

# Use a lightweight Node.js runtime for production
FROM node:22-alpine

WORKDIR /app

# Copy built files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

# Set environment variables
ENV NODE_ENV=production

# Expose the port your app runs on
EXPOSE 3001

# Run the application
CMD ["node", "dist/index.js"]