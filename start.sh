#!/bin/bash
set -e

echo "🚀 Starting Notes App..."

# Verify Node and npm
if ! command -v node &> /dev/null; then
  echo "❌ Node.js is not installed"
  exit 1
fi

if ! command -v npm &> /dev/null; then
  echo "❌ npm is not installed"
  exit 1
fi

# Backend
echo "📦 Installing backend dependencies..."
cd backend
npm install

echo "🟢 Starting backend..."
npm run start:dev &
BACKEND_PID=$!

# Frontend
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

echo "🟢 Starting frontend..."
npm run dev &
FRONTEND_PID=$!

# Wait a bit for them to start up
sleep 2

echo ""
echo "✅ App running!"
echo "   Backend:  http://localhost:3000"
echo "   Frontend: http://localhost:5173"
echo ""
echo "🛑 Press Ctrl+C to stop both servers."

# Ctrl+C handling
cleanup() {
  echo ""
  echo "🧹 Stopping servers..."
  kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
  exit
}

trap cleanup SIGINT

wait