@echo off
title Minecraft Command Generator - Quick Start
color 0A

echo ================================
echo   Minecraft Command Generator
echo ================================
echo.

:: Check Java
java -version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Java not found!
    echo Please install Java 8 or higher
    pause
    exit /b 1
)

echo [OK] Java found

:: Check JAR file
if not exist "target\command-generator-1.0.0.jar" (
    echo ERROR: JAR file not found!
    echo Please run: mvn clean package
    pause
    exit /b 1
)

echo [OK] JAR file found

:: Start backend
echo Starting backend server...
start "Backend Server" java -jar target\command-generator-1.0.0.jar --server.port=8080

:: Wait for backend
timeout /t 5 /nobreak >nul

:: Start frontend
echo Starting frontend server...
cd /d "%CD%"
start "Frontend Server" python -m http.server 8000

:: Wait for services
timeout /t 3 /nobreak >nul

echo.
echo ================================
echo   Services started successfully!
echo.
echo   Frontend: http://localhost:8000
echo   Backend:  http://localhost:8080/minecraft-command
echo.
echo   Opening browser...
echo ================================

:: Open browser
start http://localhost:8000

echo Browser opened! Enjoy!
echo Press any key to close...
pause >nul