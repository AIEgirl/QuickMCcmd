package com.minecraft.command.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

@Service
public class GameDataService {
    
    private Map<String, List<Map<String, String>>> gameData;
    
    @PostConstruct
    public void init() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            InputStream is = getClass().getResourceAsStream("/game-data.json");
            gameData = mapper.readValue(is, Map.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to load game data", e);
        }
    }
    
    public List<Map<String, String>> getItems() {
        return gameData.get("items");
    }
    
    public List<Map<String, String>> getEntities() {
        return gameData.get("entities");
    }
    
    public List<Map<String, String>> getBlocks() {
        return gameData.get("blocks");
    }
    
    public List<Map<String, String>> getPlayers() {
        return gameData.get("players");
    }
    
    public List<Map<String, String>> getDataByType(String type) {
        switch (type.toLowerCase()) {
            case "item":
            case "items":
                return getItems();
            case "entity":
            case "entities":
                return getEntities();
            case "block":
            case "blocks":
                return getBlocks();
            case "player":
            case "players":
                return getPlayers();
            default:
                return null;
        }
    }
}