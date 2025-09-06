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
                console.error('加载游戏数据失败:', result.error);
            }
        } catch (error) {
            console.error('加载游戏数据时发生网络错误:', error.message);
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
                commandTypeSelect.innerHTML = '<option value="">请选择指令类型</option>';
                
                for (const [name, command] of Object.entries(commands)) {
                    const option = document.createElement('option');
                    option.value = name;
                    option.textContent = `/${name} (${command.description})`;
                    commandTypeSelect.appendChild(option);
                }
            } else {
                showError('加载指令列表失败: ' + result.error);
            }
        } catch (error) {
            showError('加载指令列表时发生网络错误: ' + error.message);
        } finally {
            loadingIndicator.style.display = 'none';
        }
    }
    
    // 更新表单函数
    async function updateForm() {
        const commandName = commandTypeSelect.value;
        
        if (!commandName) {
            commandForm.innerHTML = '';
            commandResult.textContent = '请选择指令类型并填写参数';
            return;
        }
        
        try {
            loadingIndicator.style.display = 'block';
            const response = await fetch(`${API_BASE_URL}/${commandName}`);
            const result = await response.json();
            
            if (result.success) {
                const command = result.data;
                let formHTML = '';
                
                for (const [paramName, param] of Object.entries(command.parameters)) {
                    formHTML += createFormField(paramName, param);
                }
                
                commandForm.innerHTML = formHTML;
                
                // 为所有输入框添加事件监听
                const inputs = commandForm.querySelectorAll('input, select');
                inputs.forEach(input => {
                    input.addEventListener('input', generateCommand);
                    input.addEventListener('focus', showSuggestions);
                });
            } else {
                showError('加载指令详情失败: ' + result.error);
            }
        } catch (error) {
            showError('加载指令详情时发生网络错误: ' + error.message);
        } finally {
            loadingIndicator.style.display = 'none';
        }
        
        generateCommand();
    }
    
    // 创建表单字段
    function createFormField(paramName, param) {
        let fieldHTML = `
            <div class="form-group">
                <label for="${paramName}">${param.description} (${paramName}):</label>
        `;
        
        if (param.type === 'enum' && param.options) {
            // 枚举类型使用下拉框
            fieldHTML += `<select id="${paramName}" ${param.required ? 'required' : ''}>`;
            fieldHTML += `<option value="">请选择${param.description}</option>`;
            
            param.options.forEach(option => {
                const label = param.optionLabels && param.optionLabels[option] 
                    ? param.optionLabels[option] 
                    : option;
                const selected = param.defaultValue === option ? 'selected' : '';
                fieldHTML += `<option value="${option}" ${selected}>${label}</option>`;
            });
            
            fieldHTML += '</select>';
        } else if (param.type === 'item' && gameData && gameData.items) {
            // 物品类型使用带搜索功能的下拉框
            fieldHTML += createDatalistInput(paramName, param, gameData.items, 'item');
        } else if (param.type === 'entity' && gameData && gameData.entities) {
            // 实体类型使用带搜索功能的下拉框
            fieldHTML += createDatalistInput(paramName, param, gameData.entities, 'entity');
        } else if (param.type === 'block' && gameData && gameData.blocks) {
            // 方块类型使用带搜索功能的下拉框
            fieldHTML += createDatalistInput(paramName, param, gameData.blocks, 'block');
        } else if (param.type === 'player') {
            // 玩家选择器
            fieldHTML += createDatalistInput(paramName, param, gameData.players, 'player');
        } else {
            // 普通输入框
            const placeholder = param.defaultValue || '';
            const required = param.required ? 'required' : '';
            fieldHTML += `<input type="text" id="${paramName}" placeholder="${placeholder}" ${required}>`;
        }
        
        if (param.required) {
            fieldHTML += '<span class="required">*</span>';
        }
        
        fieldHTML += '</div>';
        return fieldHTML;
    }
    
    // 创建带数据列表的输入框
    function createDatalistInput(paramName, param, data, type) {
        const datalistId = `${paramName}-list`;
        const placeholder = param.defaultValue || '';
        const required = param.required ? 'required' : '';
        
        let html = `
            <input type="text" id="${paramName}" list="${datalistId}" placeholder="${placeholder}" ${required}>
            <datalist id="${datalistId}">
        `;
        
        data.forEach(item => {
            html += `<option value="${item.value}" label="${item.name}">`;
        });
        
        html += '</datalist>';
        return html;
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
        const commandName = commandTypeSelect.value;
        
        if (!commandName) {
            commandResult.textContent = '请选择指令类型并填写参数';
            return;
        }
        
        // 收集表单参数
        const parameters = {};
        const inputs = commandForm.querySelectorAll('input, select');
        inputs.forEach(input => {
            if (input.value) {
                parameters[input.id] = input.value;
            }
        });
        
        try {
            const response = await fetch(`${API_BASE_URL}/${commandName}/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(parameters)
            });
            
            const result = await response.json();
            
            if (result.success) {
                hideError();
                commandResult.textContent = result.data;
            } else {
                showError(result.error);
                commandResult.textContent = '请选择指令类型并填写参数';
            }
        } catch (error) {
            showError('生成指令时发生网络错误: ' + error.message);
            commandResult.textContent = '请选择指令类型并填写参数';
        }
    }
    
    // 复制指令到剪贴板
    function copyCommand() {
        const commandText = commandResult.textContent;
        
        if (commandText && commandText !== '请选择指令类型并填写参数') {
            navigator.clipboard.writeText(commandText).then(() => {
                // 显示复制成功提示
                const originalText = copyButton.textContent;
                copyButton.textContent = '已复制!';
                copyButton.style.backgroundColor = '#27ae60';
                
                setTimeout(() => {
                    copyButton.textContent = originalText;
                    copyButton.style.backgroundColor = '#3498db';
                }, 2000);
            }).catch(err => {
                console.error('复制失败: ', err);
                alert('复制失败，请手动复制指令');
            });
        } else {
            alert('没有可复制的指令');
        }
    }
    
    // 显示错误信息
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('show');
    }
    
    // 隐藏错误信息
    function hideError() {
        errorMessage.classList.remove('show');
    }
});