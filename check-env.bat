@echo off
title Environment Check Tool
color 0B

echo ================================
echo   Environment Check for Minecraft Command Generator
echo ================================
echo.

:: Check Java
echo 1. Checking Java environment...
java -version >nul 2>&1
if errorlevel 1 (
    echo    [FAIL] Java not installed or not in PATH
    echo    Please download from: https://www.oracle.com/java/technologies/downloads/
) else (
    echo    [OK] Java installed
    java -version 2>&1 | findstr "version"
)

echo.

:: Check Maven
echo 2. Checking Maven environment...
mvn -version >nul 2>&1
if errorlevel 1 (
    echo    [WARN] Maven not installed (optional for building)
    echo    Download from: https://maven.apache.org/download.cgi
) else (
    echo    [OK] Maven installed
    mvn -version 2>&1 | findstr "Apache Maven"
)

echo.

:: Check Python
echo 3. Checking Python environment...
python --version >nul 2>&1
if errorlevel 1 (
    echo    [FAIL] Python not installed
    echo    Download from: https://www.python.org/downloads/
) else (
    echo    [OK] Python installed
    python --version
)

echo.

:: Check required files
echo 4. Checking required files...
if exist "target\command-generator-1.0.0.jar" (
    echo    [OK] JAR file exists
) else (
    echo    [FAIL] JAR file not found
    echo    Please run: mvn clean package
)

echo.

:: Check ports
echo 5. Checking port availability...
netstat -ano | findstr ":8080" >nul
if errorlevel 1 (
    echo    [OK] Port 8080 available
) else (
    echo    [WARN] Port 8080 in use
    echo    Modify port in start.bat or close the program using it
)

netstat -ano | findstr ":8000" >nul
if errorlevel 1 (
    echo    [OK] Port 8000 available
) else (
    echo    [WARN] Port 8000 in use
    echo    Modify port in start.bat or close the program using it
)

echo.
echo ================================
echo Environment check completed!
echo.
echo If all checks pass, you can run start.bat directly
echo Fix any [FAIL] marked items first
echo ================================
pause