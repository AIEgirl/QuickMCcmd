// API基础URL
const API_BASE_URL = 'http://localhost:8080/minecraft-command/api/commands';
const GAME_DATA_URL = 'http://localhost:8080/minecraft-command/api/game-data';
const CONTRIBUTORS_URL = './contributors.json';

// 游戏数据缓存
let gameData = null;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const commandTypeSelect = document.getElementById('commandType');
    const commandForm = document.getElementById('commandForm');
    const commandResult = document.getElementById('commandResult');
    const copyButton = document.getElementById('copyButton');
    const errorMessage = document.getElementById('errorMessage');
    const loadingIndicator = document.getElementById('loadingIndicator');
    
    // 导航栏元素
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 页面元素
    const mainContainer = document.querySelector('main');
    
    // 导航栏交互 - 图标化
    const navIconItems = document.querySelectorAll('.nav-icon-item');
    
    navIconItems.forEach(item => {
        item.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // 移除所有活动状态
            navIconItems.forEach(nav => nav.classList.remove('active'));
            
            // 添加当前活动状态
            this.classList.add('active');
        });
    });
    
    // 语言切换功能
    if (document.getElementById('langToggle')) {
        document.getElementById('langToggle').addEventListener('click', function() {
            if (currentLanguage === 'zh') {
                switchLanguage('en');
            } else {
                switchLanguage('zh');
            }
        });
    }
    
    
    // 初始化显示指令生成器页面
    document.querySelector('.nav-icon-item[data-target="generator"]').classList.add('active');
    
    // 初始化加载指令列表
    loadCommands();
    
    // 加载游戏数据
    loadGameData();
    
    // 添加指令类型选择事件监听
    commandTypeSelect.addEventListener('change', updateForm);
    
    // 添加复制按钮事件监听
    copyButton.addEventListener('click', copyCommand);
    
    
    
    // 加载游戏数据
    async function loadGameData() {
        try {
            const response = await fetch(GAME_DATA_URL);
            const result = await response.json();
            
            if (result.success) {
                gameData = result.data;
            } else {
                console.error(getText('error_load_game_data') + result.error);
            }
        } catch (error) {
            console.error(getText('error_network') + error.message);
        }
    }

    // 加载所有指令
    async function loadCommands() {
        try {
            loadingIndicator.style.display = 'block';
            const response = await fetch(`${API_BASE_URL}`);
            const result = await response.json();
            
            if (result.success) {
                const commands = result.data;
                commandTypeSelect.innerHTML = `<option value="" data-lang="generator_select_placeholder">${getText('generator_select_placeholder')}</option>`;
                
                for (const [name, command] of Object.entries(commands)) {
                    const option = document.createElement('option');
                    option.value = name;
                    option.textContent = `/${name} (${command.description})`;
                    commandTypeSelect.appendChild(option);
                }
            } else {
                showError(getText('error_load_commands') + result.error);
            }
        } catch (error) {
            showError(getText('error_network') + error.message);
        } finally {
            loadingIndicator.style.display = 'none';
        }
    }
    
    // 更新表单函数
    async function updateForm() {
        const selectedCommand = commandTypeSelect.value;
        
        if (!selectedCommand) {
            commandForm.innerHTML = '';
            return;
        }
        
        try {
            const response = await fetch(`${API_BASE_URL}/${selectedCommand}`);
            const result = await response.json();
            
            if (result.success) {
                const command = result.data;
                let formHTML = `<h3 data-lang="generator_form_title">${getText('generator_form_title')}: /${selectedCommand}</h3>`;
                
                if (command.parameters && Object.keys(command.parameters).length > 0) {
                    for (const [paramName, param] of Object.entries(command.parameters)) {
                        formHTML += createFormField(paramName, param);
                    }
                } else {
                    formHTML += `<p data-lang="generator_no_params">${getText('generator_no_params')}</p>`;
                }
                
                formHTML += `<button type="button" id="generateButton" data-lang="generator_generate_btn">${getText('generator_generate_btn')}</button>`;
                commandForm.innerHTML = formHTML;
                
                // 添加生成按钮事件监听
                document.getElementById('generateButton').addEventListener('click', generateCommand);
            } else {
                showError(getText('error_load_command') + result.error);
            }
        } catch (error) {
            showError(getText('error_network') + error.message);
        }
    }
    
    // 创建表单字段
    function createFormField(paramName, param) {
        let fieldHTML = '';
        
        // 添加参数描述
        fieldHTML += `<div class="form-group">`;
        fieldHTML += `<label for="${paramName}" data-lang="generator_param_${paramName}">${getText(`generator_param_${paramName}`) || param.description || paramName}:</label>`;
        
        // 根据参数类型创建不同的输入元素
        if (param.type === 'boolean') {
            fieldHTML += `
                <select id="${paramName}" name="${paramName}" required>
                    <option value="true" data-lang="generator_option_true">${getText('generator_option_true')}</option>
                    <option value="false" data-lang="generator_option_false">${getText('generator_option_false')}</option>
                </select>
            `;
        } else if (param.allowedValues && param.allowedValues.length > 0) {
            fieldHTML += `
                <select id="${paramName}" name="${paramName}" required>
                    <option value="" data-lang="generator_select_default">${getText('generator_select_default')}</option>
                    ${param.allowedValues.map(value => 
                        `<option value="${value}" data-lang="generator_option_${value}">${getText(`generator_option_${value}`) || value}</option>`
                    ).join('')}
                </select>
            `;
        } else if (param.type === 'string' && gameData && gameData[param.suggestionsProvider]) {
            fieldHTML += createDatalistInput(paramName, param);
        } else {
            // 默认创建文本输入框
            fieldHTML += `<input type="text" id="${paramName}" name="${paramName}" placeholder="${param.placeholder || ''}" required>`;
        }
        
        fieldHTML += `</div>`;
        return fieldHTML;
    }
    
    // 创建带数据列表的输入框
    function createDatalistInput(paramName, param) {
        const dataListId = `${paramName}-list`;
        const suggestions = gameData[param.suggestionsProvider] || [];
        
        let inputHTML = `
            <input type="text" id="${paramName}" name="${paramName}" list="${dataListId}" placeholder="${getText('generator_input_placeholder')}" required>
            <datalist id="${dataListId}">
                ${suggestions.map(item => `<option value="${item}">`).join('')}
            </datalist>
        `;
        
        return inputHTML;
    }
    
    // 显示建议
    function showSuggestions(event) {
        const input = event.target;
        const datalist = input.getAttribute('list');
        if (datalist) {
            // 可以在这里添加更复杂的搜索逻辑
            console.log('显示建议:', input.id);
        }
    }
    
    // 生成指令函数
    async function generateCommand() {
        const selectedCommand = commandTypeSelect.value;
        
        if (!selectedCommand) {
            showError(getText('error_select_command'));
            return;
        }
        
        // 收集表单数据
        const formData = new FormData(commandForm);
        const params = {};
        
        for (const [key, value] of formData.entries()) {
            if (key !== 'generateButton') { // 排除生成按钮
                params[key] = value;
            }
        }
        
        try {
            const response = await fetch(`${API_BASE_URL}/${selectedCommand}/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(params)
            });
            
            const result = await response.json();
            
            if (result.success) {
                commandResult.textContent = result.data.command;
                hideError();
            } else {
                showError(getText('error_generate_command') + result.error);
            }
        } catch (error) {
            showError(getText('error_network') + error.message);
        }
    }
    
    // 复制指令到剪贴板
    function copyCommand() {
        const commandText = commandResult.textContent;
        
        if (!commandText) {
            showError(getText('error_copy_empty'));
            return;
        }
        
        navigator.clipboard.writeText(commandText).then(() => {
            // 显示成功消息
            const originalText = copyButton.textContent;
            copyButton.textContent = getText('generator_copy_success');
            setTimeout(() => {
                copyButton.textContent = originalText;
            }, 2000);
        }).catch(err => {
            showError(getText('error_copy_failed') + err);
        });
    }
    
    // 显示错误信息
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
    
    // 隐藏错误信息
    function hideError() {
        errorMessage.style.display = 'none';
    }
});