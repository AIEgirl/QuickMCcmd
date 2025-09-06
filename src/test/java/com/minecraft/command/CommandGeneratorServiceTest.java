package com.minecraft.command;

import com.minecraft.command.model.Command;
import com.minecraft.command.model.Parameter;
import com.minecraft.command.service.CommandGeneratorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

public class CommandGeneratorServiceTest {
    
    private CommandGeneratorService commandGeneratorService;
    
    @BeforeEach
    public void setUp() {
        commandGeneratorService = new CommandGeneratorService();
    }
    
    @Test
    public void testGenerateGiveCommand() {
        // 创建测试指令
        Command command = new Command();
        command.setName("give");
        command.setTemplate("/give {{player}} {{item}} {{count}} {{data}}");
        
        Map<String, Parameter> parameters = new HashMap<>();
        parameters.put("player", new Parameter("player", "目标玩家", "string", true, "@p", null));
        parameters.put("item", new Parameter("item", "物品ID", "string", true, "", null));
        parameters.put("count", new Parameter("count", "物品数量", "integer", false, "1", "^\\d+$"));
        parameters.put("data", new Parameter("data", "数据值", "integer", false, "0", "^\\d+$"));
        
        command.setParameters(parameters);
        
        // 测试参数
        Map<String, String> inputParams = new HashMap<>();
        inputParams.put("player", "Steve");
        inputParams.put("item", "diamond_sword");
        inputParams.put("count", "1");
        inputParams.put("data", "0");
        
        // 生成指令
        String result = commandGeneratorService.generateCommand(command, inputParams);
        
        // 验证结果
        assertEquals("/give Steve diamond_sword 1 0", result);
    }
    
    @Test
    public void testGenerateSummonCommand() {
        // 创建测试指令
        Command command = new Command();
        command.setName("summon");
        command.setTemplate("/summon {{entity}} {{x}} {{y}} {{z}}");
        
        Map<String, Parameter> parameters = new HashMap<>();
        parameters.put("entity", new Parameter("entity", "实体类型", "string", true, "", null));
        parameters.put("x", new Parameter("x", "X坐标", "string", false, "~", null));
        parameters.put("y", new Parameter("y", "Y坐标", "string", false, "~", null));
        parameters.put("z", new Parameter("z", "Z坐标", "string", false, "~", null));
        
        command.setParameters(parameters);
        
        // 测试参数
        Map<String, String> inputParams = new HashMap<>();
        inputParams.put("entity", "zombie");
        inputParams.put("x", "100");
        inputParams.put("y", "64");
        inputParams.put("z", "100");
        
        // 生成指令
        String result = commandGeneratorService.generateCommand(command, inputParams);
        
        // 验证结果
        assertEquals("/summon zombie 100 64 100", result);
    }
    
    @Test
    public void testMissingRequiredParameter() {
        // 创建测试指令
        Command command = new Command();
        command.setName("give");
        command.setTemplate("/give {{player}} {{item}}");
        
        Map<String, Parameter> parameters = new HashMap<>();
        parameters.put("player", new Parameter("player", "目标玩家", "string", true, "@p", null));
        parameters.put("item", new Parameter("item", "物品ID", "string", true, "", null));
        
        command.setParameters(parameters);
        
        // 缺少必需参数的测试参数
        Map<String, String> inputParams = new HashMap<>();
        inputParams.put("player", "Steve");
        // 故意不提供item参数
        
        // 应该抛出异常
        assertThrows(IllegalArgumentException.class, () -> {
            commandGeneratorService.generateCommand(command, inputParams);
        });
    }
}