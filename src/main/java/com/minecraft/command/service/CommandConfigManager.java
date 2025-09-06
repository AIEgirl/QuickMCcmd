package com.minecraft.command.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.minecraft.command.model.Command;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

@Service
public class CommandConfigManager {
    
    private final Map<String, Command> commandMap = new HashMap<>();
    
    @PostConstruct
    public void loadCommands() {
        // 自动加载commands目录下的所有JSON文件
        loadAllCommandFiles();
    }
    
    private void loadAllCommandFiles() {
        try {
            // 获取commands目录下的所有JSON文件
            java.io.File commandsDir = new java.io.File("src/main/resources/commands");
            if (commandsDir.exists() && commandsDir.isDirectory()) {
                // 开发环境：从文件系统加载
                java.io.File[] jsonFiles = commandsDir.listFiles((dir, name) -> name.endsWith(".json"));
                if (jsonFiles != null) {
                    for (java.io.File file : jsonFiles) {
                        loadCommandFromFile(file.getName());
                    }
                }
            } else {
                // 生产环境：从JAR包加载
                loadCommandsFromJar();
            }
        } catch (Exception e) {
            System.err.println("自动加载指令配置文件失败: " + e.getMessage());
            // 回退到显式加载
            loadDefaultCommands();
        }
    }
    
    private void loadCommandsFromJar() {
        try {
            String jarPath = getClass().getProtectionDomain().getCodeSource().getLocation().getPath();
            if (jarPath.endsWith(".jar")) {
                JarFile jarFile = new JarFile(jarPath);
                Enumeration<JarEntry> entries = jarFile.entries();
                
                while (entries.hasMoreElements()) {
                    JarEntry entry = entries.nextElement();
                    String name = entry.getName();
                    if (name.startsWith("commands/") && name.endsWith(".json")) {
                        String fileName = name.substring("commands/".length());
                        loadCommandFromFile(fileName);
                    }
                }
                jarFile.close();
            }
        } catch (IOException e) {
            System.err.println("从JAR包加载指令失败: " + e.getMessage());
        }
    }
    
    private void loadDefaultCommands() {
        // 回退到显式加载默认指令
        String[] defaultCommands = {
            "give.json", "summon.json", "tp.json", "setblock.json", "fill.json",
            "effect.json", "gamemode.json", "weather.json", "time.json", "enchant.json"
        };
        
        for (String command : defaultCommands) {
            loadCommandFromFile(command);
        }
    }
    
    private void loadCommandFromFile(String fileName) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            InputStream inputStream = getClass().getClassLoader().getResourceAsStream("commands/" + fileName);
            if (inputStream != null) {
                Command command = mapper.readValue(inputStream, Command.class);
                commandMap.put(command.getName(), command);
            }
        } catch (IOException e) {
            System.err.println("加载指令配置文件失败: " + fileName + ", 错误: " + e.getMessage());
        }
    }
    
    public Map<String, Command> getAllCommands() {
        return new HashMap<>(commandMap);
    }
    
    public Command getCommand(String name) {
        return commandMap.get(name);
    }
    
    public void addCommand(Command command) {
        commandMap.put(command.getName(), command);
    }
    
    public void removeCommand(String name) {
        commandMap.remove(name);
    }
}