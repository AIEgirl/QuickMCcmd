// 语言包
const languages = {
  zh: {
    // 首页翻译
    home_title: "Minecraft指令生成器",
    home_start_btn: "开始生成",
    home_features_title: "功能特色",
    home_feature1_title: "直观界面",
    home_feature1_desc: "简洁明了的操作界面，轻松上手",
    home_feature2_title: "多样指令",
    home_feature2_desc: "支持多种Minecraft指令生成",
    home_feature3_title: "实时预览",
    home_feature3_desc: "即时生成指令代码，方便复制使用",
    nav_home: "首页",
    nav_generator: "指令生成",
    
    // 指令生成页面翻译
    generator_title: "我的世界指令生成器",
    generator_subtitle: "通过图形化界面轻松生成游戏指令",
    generator_loading: "正在加载指令列表...",
    generator_select_label: "选择指令类型:",
    generator_select_placeholder: "请选择指令类型",
    generator_form_title: "参数配置",
    generator_no_params: "该指令没有参数",
    generator_generate_btn: "生成指令",
    generator_result_title: "生成的指令",
    generator_result_placeholder: "请选择指令类型并填写参数",
    generator_copy_btn: "复制指令",
    generator_copy_success: "已复制!",
    generator_input_placeholder: "请输入或选择",
    generator_footer: "我的世界指令生成器 &copy; 2023",
    
    // 表单相关
    form_required: "必填",
    form_select_placeholder: "请选择",
    generator_select_default: "请选择",
    generator_option_true: "是",
    generator_option_false: "否",
    
    // 错误信息
    error_load_commands: "加载指令列表失败: ",
    error_network: "发生网络错误: ",
    error_load_game_data: "加载游戏数据失败: ",
    error_load_command: "加载指令详情失败: ",
    error_generate_command: "生成指令失败: ",
    error_copy_failed: "复制失败，请手动复制指令",
    error_copy_empty: "没有可复制的指令",
    error_select_command: "请选择指令类型"
  },
  
  en: {
    // Home page translations
    home_title: "Minecraft Command Generator",
    home_start_btn: "Get Started",
    home_features_title: "Features",
    home_feature1_title: "Intuitive Interface",
    home_feature1_desc: "Clean and simple interface, easy to use",
    home_feature2_title: "Multiple Commands",
    home_feature2_desc: "Supports generation of various Minecraft commands",
    home_feature3_title: "Real-time Preview",
    home_feature3_desc: "Instantly generate command code for easy copying",
    nav_home: "Home",
    nav_generator: "Command Generator",
    
    // Command generator page translations
    generator_title: "Minecraft Command Generator",
    generator_subtitle: "Easily generate game commands through graphical interface",
    generator_loading: "Loading command list...",
    generator_select_label: "Select Command Type:",
    generator_select_placeholder: "Please select a command type",
    generator_form_title: "Parameter Configuration",
    generator_no_params: "This command has no parameters",
    generator_generate_btn: "Generate Command",
    generator_result_title: "Generated Command",
    generator_result_placeholder: "Please select a command type and fill in parameters",
    generator_copy_btn: "Copy Command",
    generator_copy_success: "Copied!",
    generator_input_placeholder: "Please enter or select",
    generator_footer: "Minecraft Command Generator &copy; 2023",
    
    // Form related
    form_required: "Required",
    form_select_placeholder: "Please select",
    generator_select_default: "Please select",
    generator_option_true: "Yes",
    generator_option_false: "No",
    
    // Error messages
    error_load_commands: "Failed to load command list: ",
    error_network: "Network error occurred: ",
    error_load_game_data: "Failed to load game data: ",
    error_load_command: "Failed to load command details: ",
    error_generate_command: "Failed to generate command: ",
    error_copy_failed: "Copy failed, please copy manually",
    error_copy_empty: "No command to copy",
    error_select_command: "Please select a command type"
  }
};

// 默认语言
let currentLanguage = 'zh';

// 获取翻译文本的函数
function getText(key) {
  return languages[currentLanguage][key] || key;
}

// 切换语言的函数
function switchLanguage(lang) {
  currentLanguage = lang;
  updatePageLanguage();
  // 保存用户选择的语言到本地存储
  localStorage.setItem('language', lang);
}

// 更新页面语言的函数
function updatePageLanguage() {
  // 更新所有有data-lang属性的元素
  const elements = document.querySelectorAll('[data-lang]');
  elements.forEach(element => {
    const key = element.getAttribute('data-lang');
    const text = getText(key);
    if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
      element.placeholder = text;
    } else {
      element.textContent = text;
    }
  });
  
  // 更新特定元素
  updateSpecificElements();
}

// 更新特定元素的函数
function updateSpecificElements() {
  // 首页特有元素
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.textContent = getText('home_title');
  }
  
  const startBtn = document.querySelector('.btn-primary');
  if (startBtn) {
    startBtn.textContent = getText('home_start_btn');
  }
  
  const featuresTitle = document.querySelector('.section-title');
  if (featuresTitle) {
    featuresTitle.textContent = getText('home_features_title');
  }
  
  const featureCards = document.querySelectorAll('.feature-card');
  if (featureCards.length >= 3) {
    featureCards[0].querySelector('.feature-title').textContent = getText('home_feature1_title');
    featureCards[0].querySelector('.feature-description').textContent = getText('home_feature1_desc');
    featureCards[1].querySelector('.feature-title').textContent = getText('home_feature2_title');
    featureCards[1].querySelector('.feature-description').textContent = getText('home_feature2_desc');
    featureCards[2].querySelector('.feature-title').textContent = getText('home_feature3_title');
    featureCards[2].querySelector('.feature-description').textContent = getText('home_feature3_desc');
  }
  
  // 导航栏元素
  const navHome = document.querySelector('.nav-icon-item[data-target="home"]');
  if (navHome) {
    navHome.textContent = getText('nav_home');
  }
  
  const navGenerator = document.querySelector('.nav-icon-item[data-target="generator"]');
  if (navGenerator) {
    navGenerator.textContent = getText('nav_generator');
  }
  
  // 语言切换按钮
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.textContent = currentLanguage === 'zh' ? 'EN/中文' : 'EN/中文';
  }
  
  // 指令生成页面特有元素
  const generatorTitle = document.querySelector('header h1');
  if (generatorTitle) {
    generatorTitle.textContent = getText('generator_title');
  }
  
  const generatorSubtitle = document.querySelector('header p');
  if (generatorSubtitle) {
    generatorSubtitle.textContent = getText('generator_subtitle');
  }
  
  const loadingIndicator = document.querySelector('#loadingIndicator p');
  if (loadingIndicator) {
    loadingIndicator.textContent = getText('generator_loading');
  }
  
  const selectLabel = document.querySelector('.command-selector label');
  if (selectLabel) {
    selectLabel.textContent = getText('generator_select_label');
  }
  
  const resultTitle = document.querySelector('.result-container h2');
  if (resultTitle) {
    resultTitle.textContent = getText('generator_result_title');
  }
  
  const commandResult = document.querySelector('#commandResult');
  if (commandResult && commandResult.textContent === '请选择指令类型并填写参数') {
    commandResult.textContent = getText('generator_result_placeholder');
  }
  
  const copyButton = document.querySelector('#copyButton');
  if (copyButton) {
    copyButton.textContent = getText('generator_copy_btn');
  }
  
  const footer = document.querySelector('footer p');
  if (footer) {
    footer.innerHTML = getText('generator_footer');
  }
}

// 页面加载完成后初始化语言
document.addEventListener('DOMContentLoaded', function() {
  // 从本地存储获取用户选择的语言，如果没有则使用默认语言
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage) {
    currentLanguage = savedLanguage;
  }
  
  // 更新页面语言
  updatePageLanguage();
});