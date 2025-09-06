package com.minecraft.command.controller;

import com.minecraft.command.service.GameDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/game-data")
@CrossOrigin(origins = "*")
public class GameDataController {
    
    @Autowired
    private GameDataService gameDataService;
    
    @GetMapping
    public Map<String, Object> getAllGameData() {
        Map<String, Object> response = new HashMap<>();
        try {
            response.put("success", true);
            response.put("data", Map.of(
                "items", gameDataService.getItems(),
                "entities", gameDataService.getEntities(),
                "blocks", gameDataService.getBlocks(),
                "players", gameDataService.getPlayers()
            ));
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
        }
        return response;
    }
    
    @GetMapping("/{type}")
    public Map<String, Object> getGameDataByType(@PathVariable String type) {
        Map<String, Object> response = new HashMap<>();
        try {
            List<Map<String, String>> data = gameDataService.getDataByType(type);
            if (data != null) {
                response.put("success", true);
                response.put("data", data);
            } else {
                response.put("success", false);
                response.put("error", "Unknown data type: " + type);
            }
        } catch (Exception e) {
            response.put("success", false);
            response.put("error", e.getMessage());
        }
        return response;
    }
}