#!/usr/bin/env zsh

# Development workflow script for CathayWebApp
# This script handles the complete development refresh cycle

echo "🔄 Starting CathayWebApp development refresh..."

# Step 1: Kill any processes running on port 5221
echo "🔥 Killing processes on port 5221..."
# Using zsh-compatible command
if lsof -ti:5221 >/dev/null 2>&1; then
    lsof -ti:5221 | xargs kill -9
    echo "Killed processes on port 5221"
else
    echo "No processes found on port 5221"
fi

# Step 2: Clear NuGet cache
echo "🧹 Clearing NuGet cache..."
dotnet nuget locals all --clear

# Step 3: Restore packages without cache
echo "📦 Restoring packages without cache..."
dotnet restore --no-cache

# Step 4: Run the application
echo "🚀 Starting the application..."
dotnet run --no-restore

echo "✅ Development workflow completed!"
