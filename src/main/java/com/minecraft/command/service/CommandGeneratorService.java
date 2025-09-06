package com.minecraft.command.service;

import com.minecraft.command.model.Command;
import com.minecraft.command.model.Parameter;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.regex.Pattern;

@Service
public class CommandGeneratorService {
    
    public String generateCommand(Command command, Map<String, String> parameters) {
        // 验证必需参数
        validateRequiredParameters(command, parameters);
        
        // 验证参数格式
        validateParameterFormats(command, parameters);
        
        // 生成指令
        String result = command.getTemplate();
        
        // 替换模板中的参数
        for (Map.Entry<String, Parameter> entry : command.getParameters().entrySet()) {
            String paramName = entry.getKey();
            Parameter param = entry.getValue();
            
            // 获取参数值，如果未提供则使用默认值
            String paramValue = parameters.getOrDefault(paramName, param.getDefaultValue());
            
            // 如果参数值为空且是必需的，则抛出异常
            if ((paramValue == null || paramValue.isEmpty()) && param.isRequired()) {
                throw new IllegalArgumentException("必需参数 '" + paramName + "' 未提供");
            }
            
            // 如果参数值为空且不是必需的，则跳过
            if (paramValue == null || paramValue.isEmpty()) {
                continue;
            }
            
            // 替换模板中的参数占位符
            result = result.replace("{{" + paramName + "}}", paramValue);
        }
        
        return result;
    }
    
    private void validateRequiredParameters(Command command, Map<String, String> parameters) {
        for (Map.Entry<String, Parameter> entry : command.getParameters().entrySet()) {
            String paramName = entry.getKey();
            Parameter param = entry.getValue();
            
            if (param.isRequired() && !parameters.containsKey(paramName)) {
                throw new IllegalArgumentException("缺少必需参数: " + paramName);
            }
        }
    }
    
    private void validateParameterFormats(Command command, Map<String, String> parameters) {
        for (Map.Entry<String, Parameter> entry : command.getParameters().entrySet()) {
            String paramName = entry.getKey();
            Parameter param = entry.getValue();
            
            if (parameters.containsKey(paramName)) {
                String value = parameters.get(paramName);
                
                // 如果参数有正则表达式模式，则验证格式
                if (param.getPattern() != null && !param.getPattern().isEmpty()) {
                    if (!Pattern.matches(param.getPattern(), value)) {
                        throw new IllegalArgumentException("参数 '" + paramName + "' 格式不正确: " + value);
                    }
                }
            }
        }
    }
}