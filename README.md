# 我的世界指令生成器后端系统

一个基于Java和Spring Boot的可扩展我的世界指令生成器后端系统。

## 功能特点

1. **可扩展性**：通过JSON配置文件添加新的指令支持，无需修改源代码
2. **RESTful API**：提供标准的REST API接口
3. **参数验证**：自动验证指令参数的格式和必需性
4. **错误处理**：完善的错误处理和提示机制

## 技术栈

- Java 11+
- Spring Boot 2.7.0
- Maven 3.6+
- Jackson (JSON处理)
- JSON Schema Validator

## 项目结构

```
src/
├── main/
│   ├── java/
│   │   └── com/minecraft/command/
│   │       ├── Application.java          # 主应用程序类
│   │       ├── controller/               # REST控制器
│   │       ├── model/                    # 数据模型
│   │       ├── service/                  # 业务逻辑服务
│   │       └── config/                   # 配置类
│   └── resources/
│       ├── commands/                     # 指令配置文件(JSON)
│       ├── application.properties        # 应用程序配置
└── test/                                 # 测试代码
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

## 构建和运行

### 构建项目
```bash
mvn clean package
```

### 运行应用程序
```bash
mvn spring-boot:run
```

或者

```bash
java -jar target/command-generator-1.0.0.jar
```

## 使用示例

### 生成/give指令
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

## 许可证

MIT License