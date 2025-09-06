@echo off
title Minecraft指令生成器 - 一键启动
color 0A

echo ==================================
echo   Minecraft指令生成器启动器
echo ==================================
echo.

:: 检查Java是否安装
java -version >nul 2>&1
if errorlevel 1 (
    echo 错误：未检测到Java环境！
    echo 请先安装Java 8或更高版本
    pause
    exit /b 1
)

echo 成功：Java环境检测通过

:: 检查JAR文件是否存在
if not exist "target\command-generator-1.0.0.jar" (
    echo 错误：JAR文件不存在！
    echo 请先运行：mvn clean package
    pause
    exit /b 1
)

echo 成功：JAR文件检测通过

:: 启动后端服务
echo 正在启动后端服务...
start "后端服务" java -jar target\command-generator-1.0.0.jar --server.port=8080

:: 等待后端启动
timeout /t 5 /nobreak >nul

:: 启动前端服务
echo 正在启动前端服务...
cd /d "%CD%"
start "前端服务" python -m http.server 8000

:: 等待服务完全启动
timeout /t 3 /nobreak >nul

echo.
echo ==================================
echo   服务启动完成！
echo.
echo   前端地址：http://localhost:8000
echo   后端地址：http://localhost:8080/minecraft-command
echo.
echo   正在打开浏览器...
echo ==================================

:: 自动打开浏览器
start http://localhost:8000

echo 浏览器已打开，祝您使用愉快！
echo 按任意键关闭此窗口...
pause >nul