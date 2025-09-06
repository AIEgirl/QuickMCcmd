package com.minecraft.command.model;

import java.util.Map;

public class Command {
    private String name;
    private String description;
    private String template;
    private Map<String, Parameter> parameters;
    
    // 构造函数
    public Command() {}
    
    public Command(String name, String description, String template, Map<String, Parameter> parameters) {
        this.name = name;
        this.description = description;
        this.template = template;
        this.parameters = parameters;
    }
    
    // Getter和Setter方法
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getTemplate() {
        return template;
    }
    
    public void setTemplate(String template) {
        this.template = template;
    }
    
    public Map<String, Parameter> getParameters() {
        return parameters;
    }
    
    public void setParameters(Map<String, Parameter> parameters) {
        this.parameters = parameters;
    }
    
    @Override
    public String toString() {
        return "Command{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", template='" + template + '\'' +
                ", parameters=" + parameters +
                '}';
    }
}