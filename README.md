
---

# Minecraft Command Generator

A complete Minecraft command generation system with frontend UI and backend API, helping players quickly generate in-game Minecraft commands.

Although this project uses a certain protocol, you may use it freely as long as **not for commercial purposes**. You may also choose to embed your heavily modified version.

---

## ✨ Features

### Frontend Features
- **Intuitive UI**: Clean, modern interface for ease of use  
- **Dynamic Gradient Background**: Full-page animated gradient for immersive visual experience  
- **Responsive Design**: Adapts to all screen sizes (desktop & mobile)  
- **Live Command Preview**: Generates command code instantly as you type

### Backend Features
- **Extensible**: Add new commands via JSON config files — no code changes required  
- **RESTful API**: Standard REST endpoints for integration  
- **Parameter Validation**: Auto-validates format and required fields  
- **Error Handling**: Comprehensive error messages and handling

---

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)  
- Font Awesome Icons  
- Native CSS Animations & Transitions

### Backend
- Java 11+  
- Spring Boot 2.7.0  
- Maven 3.6+  
- Jackson (JSON processing)  
- JSON Schema Validator

---

## 📁 Project Structure

```
MinecraftCommand/
├── src/
│   └── main/
│       ├── java/                         # Backend Java code
│       │   └── com/minecraft/command/
│       │       ├── Application.java      # Main app class
│       │       ├── controller/           # REST controllers
│       │       ├── model/                # Data models
│       │       ├── service/              # Business logic
│       │       └── config/               # Configuration classes
│       └── resources/                    # Backend resources
│           ├── commands/                 # Command configs (JSON)
│           ├── application.properties    # App config
│           └── game-data.json            # Game data
├── home.html                             # Homepage
├── index.html                            # Command generator page
├── script.js                             # JS logic
├── styles.css                            # Stylesheet
├── pom.xml                               # Maven config
└── README.md                             # This file
```

---

## 🌐 API Endpoints

### Get All Commands
```
GET /minecraft-command/api/commands
```

### Get Specific Command
```
GET /minecraft-command/api/commands/{name}
```

### Generate Command
```
POST /minecraft-command/api/commands/{name}/generate
```

**Sample Request Body:**
```json
{
  "player": "Steve",
  "item": "diamond_sword",
  "count": "1",
  "data": "0"
}
```

---

## ✅ Supported Commands

### Frontend Pages
1. **home.html** — Project intro & features  
2. **index.html** — Interactive command generator

### Backend API Commands
1. `give` — Give items  
2. `summon` — Summon entities  
3. `effect` — Apply/remove status effects  
4. `enchant` — Enchant items  
5. `gamerule` — Set game rules  
6. `weather` — Set weather  
7. `time` — Set time

---

## ➕ Add New Commands

1. Create a new JSON config file under `src/main/resources/commands/`  
2. Use this format:

```json
{
  "name": "command_name",
  "description": "Command description",
  "template": "Command template with {{param}} placeholders",
  "parameters": {
    "param_name": {
      "name": "param_name",
      "description": "Parameter description",
      "type": "string/number/etc",
      "required": true/false,
      "defaultValue": "default_value",
      "pattern": "regex_validation_pattern"
    }
  }
}
```

3. Restart the app — new command is auto-loaded!

---

## ⚙️ Installation & Run

### Requirements
- Java 8+
- Maven 3.6+
- Modern browser (Chrome, Firefox, Edge, etc.)

### Setup Steps

1. Clone the repo:
   ```bash
   git clone <repo-url>
   ```

2. Enter project directory:
   ```bash
   cd MinecraftCommand
   ```

3. Build with Maven:
   ```bash
   mvn clean install
   ```

4. Run the app:
   ```bash
   mvn spring-boot:run
   ```
   OR
   ```bash
   java -jar target/command-generator-1.0.0.jar
   ```

### Quick Start Scripts
- `start.bat` — Windows batch launcher  
- `start.ps1` — PowerShell launcher  
- `start-fixed.bat` — Fixed-port launcher

---

## 🖥️ Usage Guide

1. Open browser → `http://localhost:8000`  
2. Click “Start Generating” to enter command page  
3. Select command type  
4. Fill in parameters  
5. Click “Generate Command”  
6. Copy & paste into Minecraft!

---

## 💡 Frontend Highlights

### Dynamic Gradient Background  
Built with CSS3 animations for a mesmerizing, immersive experience.

### Responsive Design  
Perfectly adapts to desktops, tablets, and phones.

### Intuitive UI  
Clear layout and smooth workflow for effortless command building.

### Live Preview  
See your Minecraft command update in real-time as you type.

---

## 🧪 Usage Examples

### 1. Give Item
```bash
curl -X POST http://localhost:8080/minecraft-command/api/commands/give/generate \
  -H "Content-Type: application/json" \
  -d '{"player": "Steve", "item": "diamond_sword", "count": "1"}'
```
→ Response: `"/give Steve diamond_sword 1 0"`

### 2. Summon Entity
```bash
curl -X POST http://localhost:8080/minecraft-command/api/commands/summon/generate \
  -H "Content-Type: application/json" \
  -d '{"entity": "minecraft:creeper", "pos": "~ ~ ~"}'
```
→ Response: `"/summon minecraft:creeper ~ ~ ~"`

### 3. Apply Effect
```bash
curl -X POST http://localhost:8080/minecraft-command/api/commands/effect/generate \
  -H "Content-Type: application/json" \
  -d '{"player": "@a", "effect": "minecraft:speed", "seconds": "30", "amplifier": "2"}'
```
→ Response: `"/effect @a minecraft:speed 30 2"`

---

## 📜 License

MIT License — See [LICENSE](LICENSE) for details.

---

## 👥 Contributors

Developed & maintained by:

- **Frontend**: AIEgirl  
- **Backend**: AIEgirl  
- **JSON Command Configs**: AIEgirl  

> 💬 Future updates may focus only on expanding the command library — or potentially removing backend dependency.

