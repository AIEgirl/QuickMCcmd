package com.minecraft.command.model;

import java.util.List;
import java.util.Map;

public class Parameter {
    private String name;
    private String description;
    private String type;
    private boolean required;
    private String defaultValue;
    private String pattern; // 正则表达式验证模式
    private List<String> options; // 枚举选项列表
    private Map<String, String> optionLabels; // 选项标签映射
    private List<String> suggestions; // 建议值列表
    private Integer min; // 最小值（用于整数类型）
    private Integer max; // 最大值（用于整数类型）
    
    // 构造函数
    public Parameter() {}
    
    public Parameter(String name, String description, String type, boolean required, String defaultValue, String pattern) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.required = required;
        this.defaultValue = defaultValue;
        this.pattern = pattern;
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
    
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    public boolean isRequired() {
        return required;
    }
    
    public void setRequired(boolean required) {
        this.required = required;
    }
    
    public String getDefaultValue() {
        return defaultValue;
    }
    
    public void setDefaultValue(String defaultValue) {
        this.defaultValue = defaultValue;
    }
    
    public String getPattern() {
        return pattern;
    }
    
    public void setPattern(String pattern) {
        this.pattern = pattern;
    }
    
    public List<String> getOptions() {
        return options;
    }
    
    public void setOptions(List<String> options) {
        this.options = options;
    }
    
    public Map<String, String> getOptionLabels() {
        return optionLabels;
    }
    
    public void setOptionLabels(Map<String, String> optionLabels) {
        this.optionLabels = optionLabels;
    }
    
    public Integer getMin() {
        return min;
    }
    
    public void setMin(Integer min) {
        this.min = min;
    }
    
    public Integer getMax() {
        return max;
    }
    
    public void setMax(Integer max) {
        this.max = max;
    }
    
    public List<String> getSuggestions() {
        return suggestions;
    }
    
    public void setSuggestions(List<String> suggestions) {
        this.suggestions = suggestions;
    }
    
    @Override
    public String toString() {
        return "Parameter{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", type='" + type + '\'' +
                ", required=" + required +
                ", defaultValue='" + defaultValue + '\'' +
                ", pattern='" + pattern + '\'' +
                ", options=" + options +
                ", optionLabels=" + optionLabels +
                ", suggestions=" + suggestions +
                ", min=" + min +
                ", max=" + max +
                '}';
    }
}