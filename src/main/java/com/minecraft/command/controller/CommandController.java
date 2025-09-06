package com.minecraft.command.controller;

import com.minecraft.command.model.Command;
import com.minecraft.command.service.CommandConfigManager;
import com.minecraft.command.service.CommandGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/commands")
@CrossOrigin(origins = "*")
public class CommandController {
    
    @Autowired
    private CommandConfigManager commandConfigManager;
    
    @Autowired
    private CommandGeneratorService commandGeneratorService;
    
    /**
     * 获取所有支持的指令列表
     */
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllCommands() {
        Map<String, Object> response = new HashMap<>();
        try {
            response.put("success", true);
            response.put("data", commandConfigManager.getAllCommands());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "获取指令列表失败: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * 获取特定指令的详细信息
     */
    @GetMapping("/{name}")
    public ResponseEntity<Map<String, Object>> getCommand(@PathVariable String name) {
        Map<String, Object> response = new HashMap<>();
        try {
            Command command = commandConfigManager.getCommand(name);
            if (command != null) {
                response.put("success", true);
                response.put("data", command);
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("error", "未找到指令: " + name);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "获取指令失败: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    /**
     * 生成指令
     */
    @PostMapping("/{name}/generate")
    public ResponseEntity<Map<String, Object>> generateCommand(
            @PathVariable String name,
            @RequestBody Map<String, String> parameters) {
        Map<String, Object> response = new HashMap<>();
        try {
            Command command = commandConfigManager.getCommand(name);
            if (command != null) {
                String generatedCommand = commandGeneratorService.generateCommand(command, parameters);
                response.put("success", true);
                response.put("data", generatedCommand);
                return ResponseEntity.ok(response);
            } else {
                response.put("success", false);
                response.put("error", "未找到指令: " + name);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (IllegalArgumentException e) {
            response.put("success", false);
            response.put("error", "参数错误: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", "生成指令失败: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}