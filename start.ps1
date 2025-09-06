# Minecraft指令生成器一键启动脚本
Write-Host "==================================" -ForegroundColor Green
Write-Host "  Minecraft指令生成器启动器" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green
Write-Host ""

# 检查Java环境
$javaCheck = Get-Command java -ErrorAction SilentlyContinue
if (-not $javaCheck) {
    Write-Host "❌ 错误：未检测到Java环境！" -ForegroundColor Red
    Write-Host "请先安装Java 8或更高版本" -ForegroundColor Yellow
    Read-Host "按Enter键退出"
    exit 1
}

Write-Host "✅ Java环境检测通过" -ForegroundColor Green

# 检查JAR文件
$jarPath = "target\command-generator-1.0.0.jar"
if (-not (Test-Path $jarPath)) {
    Write-Host "❌ 错误：JAR文件不存在！" -ForegroundColor Red
    Write-Host "请先运行：mvn clean package" -ForegroundColor Yellow
    Read-Host "按Enter键退出"
    exit 1
}

Write-Host "✅ JAR文件检测通过" -ForegroundColor Green

# 检查端口占用
function Test-Port($port) {
    $tcpConnection = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    return $tcpConnection -ne $null
}

$backendPort = 8080
$frontendPort = 8000

if (Test-Port $backendPort) {
    Write-Host "⚠️  端口$backendPort已被占用，后端可能已在运行" -ForegroundColor Yellow
} else {
    Write-Host "🚀 正在启动后端服务..." -ForegroundColor Cyan
    Start-Process "java" -ArgumentList "-jar", $jarPath, "--server.port=$backendPort" -WindowStyle Normal
}

if (Test-Port $frontendPort) {
    Write-Host "⚠️  端口$frontendPort已被占用，前端可能已在运行" -ForegroundColor Yellow
} else {
    Write-Host "🌐 正在启动前端服务..." -ForegroundColor Cyan
    Start-Process "powershell" -ArgumentList "-Command", "python -m http.server $frontendPort" -WorkingDirectory $PSScriptRoot -WindowStyle Normal
}

# 等待服务启动
Write-Host "⏳ 等待服务启动..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host ""
Write-Host "==================================" -ForegroundColor Green
Write-Host "   服务启动完成！" -ForegroundColor Green
Write-Host ""
Write-Host "   前端地址：http://localhost:$frontendPort" -ForegroundColor Cyan
Write-Host "   后端地址：http://localhost:$backendPort/minecraft-command" -ForegroundColor Cyan
Write-Host ""
Write-Host "   正在打开浏览器..." -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green

# 打开浏览器
Start-Process "http://localhost:$frontendPort"

Write-Host "浏览器已打开，祝您使用愉快！" -ForegroundColor Green
Read-Host "按Enter键关闭此窗口"