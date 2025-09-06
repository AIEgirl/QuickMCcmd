# Minecraft指令生成器

一个完整的我的世界指令生成器系统，包含前端界面和后端API，帮助玩家快速生成Minecraft游戏指令。

虽然这是使用了某协议，但是你只要保证你不用与商业用途即可，你可以选择对于你大改后的版本进行埋藏。

## 功能特点

### 前端功能
- **直观的用户界面**：简洁美观的界面设计，易于使用
- **幻彩动态背景**：全页面渐变动画背景，提升视觉体验
- **响应式设计**：适配不同设备屏幕尺寸
- **实时指令预览**：输入参数后立即生成指令代码

### 后端功能
- **可扩展性**：通过JSON配置文件添加新的指令支持，无需修改源代码
- **RESTful API**：提供标准的REST API接口
- **参数验证**：自动验证指令参数的格式和必需性
- **错误处理**：完善的错误处理和提示机制

## 技术栈

### 前端技术
- HTML5, CSS3, JavaScript
- Font Awesome 图标库
- 原生CSS动画和过渡效果

### 后端技术
- Java 11+
- Spring Boot 2.7.0
- Maven 3.6+
- Jackson (JSON处理)
- JSON Schema Validator

## 项目结构

```
MinecraftCommand/
├── src/
│   └── main/
│       ├── java/                         # 后端Java代码
│       │   └── com/minecraft/command/
│       │       ├── Application.java      # 主应用程序类
│       │       ├── controller/           # REST控制器
│       │       ├── model/                # 数据模型
│       │       ├── service/              # 业务逻辑服务
│       │       └── config/              # 配置类
│       └── resources/                    # 后端资源文件
│           ├── commands/                 # 指令配置文件(JSON)
│           ├── application.properties    # 应用程序配置
│           └── game-data.json            # 游戏数据文件
├── home.html                             # 首页
├── index.html                            # 指令生成页面
├── script.js                             # JavaScript逻辑
├── styles.css                            # 样式文件
├── pom.xml                               # Maven配置文件
└── README.md                             # 项目说明文件
```

## API接口

### 获取所有指令
```
GET /minecraft-command/api/commands
```

### 获取特定指令详情
```
GET /minecraft-command/api/commands/{name}
```

### 生成指令
```
POST /minecraft-command/api/commands/{name}/generate
```

请求体示例：
```json
{
  "player": "Steve",
  "item": "diamond_sword",
  "count": "1",
  "data": "0"
}
```

## 支持的指令

### 前端页面
1. **首页 (home.html)** - 展示项目介绍和特色功能
2. **指令生成页面 (index.html)** - 提供各类Minecraft指令的生成界面

### 后端API支持的指令
1. **give** - 给予物品
2. **summon** - 召唤实体
3. **effect** - 给予/清除状态效果
4. **enchant** - 附魔物品
5. **gamerule** - 设置游戏规则
6. **weather** - 设置天气
7. **time** - 设置时间

## 扩展新的指令支持

1. 在 `src/main/resources/commands/` 目录下创建新的JSON配置文件
2. 配置文件格式如下：

```json
{
  "name": "指令名称",
  "description": "指令描述",
  "template": "指令模板，使用{{参数名}}作为占位符",
  "parameters": {
    "参数名": {
      "name": "参数名",
      "description": "参数描述",
      "type": "参数类型",
      "required": true/false,
      "defaultValue": "默认值",
      "pattern": "正则表达式验证模式"
    }
  }
}
```

3. 重启应用程序即可支持新指令

## 安装与运行

### 环境要求

- Java 8 或更高版本
- Maven 3.6 或更高版本
- 现代浏览器（Chrome, Firefox, Edge等）

### 安装步骤

1. 克隆项目到本地：
   ```
   git clone <项目地址>
   ```

2. 进入项目目录：
   ```
   cd MinecraftCommand
   ```

3. 使用Maven构建项目：
   ```
   mvn clean install
   ```

4. 运行应用程序：
   ```
   mvn spring-boot:run
   ```

   或者运行生成的JAR文件：
   ```
   java -jar target/command-generator-1.0.0.jar
   ```

### 快速启动

项目提供了几种快速启动方式：

1. **start.bat** - Windows批处理文件启动
2. **start.ps1** - PowerShell脚本启动
3. **start-fixed.bat** - 固定端口启动

## 使用说明

1. 打开浏览器访问 `http://localhost:8000`
2. 点击"开始生成"按钮进入指令生成页面
3. 选择需要生成的指令类型
4. 填写相应的参数
5. 点击"生成指令"按钮
6. 复制生成的指令并在Minecraft中使用

## 前端特性详解

### 幻彩动态背景
项目采用CSS3动画技术实现全页面幻彩动态背景效果，为用户提供沉浸式视觉体验。

### 响应式设计
前端页面采用响应式设计，能够适配桌面端和移动端设备，确保在不同屏幕尺寸下都有良好的显示效果。

### 直观的用户界面
通过清晰的页面布局和直观的操作流程，用户可以轻松选择指令类型并填写相关参数。

### 实时指令预览
用户在填写参数时，系统会实时生成对应的Minecraft指令代码，方便用户预览和确认。

## 使用示例

### 1. 给予物品 (give)
```bash
curl -X POST http://localhost:8080/minecraft-command/api/commands/give/generate \
  -H "Content-Type: application/json" \
  -d '{"player": "Steve", "item": "diamond_sword", "count": "1"}'
```

响应：
```json
{
  "success": true,
  "data": "/give Steve diamond_sword 1 0"
}
```

### 2. 召唤实体 (summon)
```bash
curl -X POST http://localhost:8080/minecraft-command/api/commands/summon/generate \
  -H "Content-Type: application/json" \
  -d '{"entity": "minecraft:creeper", "pos": "~ ~ ~"}'
```

响应：
```json
{
  "success": true,
  "data": "/summon minecraft:creeper ~ ~ ~"
}
```

### 3. 给予状态效果 (effect)
```bash
curl -X POST http://localhost:8080/minecraft-command/api/commands/effect/generate \
  -H "Content-Type: application/json" \
  -d '{"player": "@a", "effect": "minecraft:speed", "seconds": "30", "amplifier": "2"}'
```

响应：
```json
{
  "success": true,
  "data": "/effect @a minecraft:speed 30 2"
}
```

## 许可证

本项目采用MIT许可证，详情请见 [LICENSE](LICENSE) 文件。

## 贡献者

本项目由以下人员开发和维护：

- 前端开发 AIEgirl
- 后端开发 AIEgirl
- JSON指令配置 AIEgirl

如需贡献代码，请提交Pull Request或联系项目维护者。
（后续有可能不再进行任何功能更新 只是对指令库的补全 或者不使用后端？）