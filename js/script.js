let currentTest = null;

// 启动测试
function startTest(testType) {
    currentTest = testType;
    const container = document.getElementById('fullscreenTest');
    container.innerHTML = '';
    container.classList.add('active');

    // 进入全屏
    if (container.requestFullscreen) {
        container.requestFullscreen();
    } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
    }

    // 根据不同测试类型加载内容
    switch(testType) {
        case 'solidColor':
            loadSolidColorTest(container);
            break;
        case 'lightLeak':
            loadLightLeakTest(container);
            break;
        case 'interference':
            loadInterferenceTest(container);
            break;
        case 'focus':
            loadFocusTest(container);
            break;
        case 'breathing':
            loadBreathingTest(container);
            break;
        case 'contrast':
            loadContrastTest(container);
            break;
        case 'grayscale':
            loadGrayscaleTest(container);
            break;
        case 'saturation':
            loadSaturationTest(container);
            break;
    }

    // ESC键退出
    document.addEventListener('keydown', handleEscape);
}

// 退出测试
function exitTest() {
    const container = document.getElementById('fullscreenTest');
    container.classList.remove('active');
    container.innerHTML = '';
    currentTest = null;

    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }

    document.removeEventListener('keydown', handleEscape);
}

// ESC键处理
function handleEscape(e) {
    if (e.key === 'Escape') {
        exitTest();
    }
}

// 纯色测试
function loadSolidColorTest(container) {
    const colors = [
        { name: '黑色', value: '#000000' },
        { name: '白色', value: '#FFFFFF' },
        { name: '红色', value: '#FF0000' },
        { name: '绿色', value: '#00FF00' },
        { name: '蓝色', value: '#0000FF' },
        { name: '青色', value: '#00FFFF' },
        { name: '品红', value: '#FF00FF' },
        { name: '黄色', value: '#FFFF00' }
    ];

    let currentColorIndex = 0;

    function updateColor() {
        container.style.backgroundColor = colors[currentColorIndex].value;
    }

    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.innerHTML = `
        <button onclick="changeSolidColor(-1)">上一个</button>
        <span style="font-weight: 500;" id="colorName">${colors[0].name}</span>
        <button onclick="changeSolidColor(1)">下一个</button>
        <button class="close-btn" onclick="exitTest()">关闭 (ESC)</button>
    `;

    const instruction = document.createElement('div');
    instruction.className = 'instruction';
    instruction.textContent = '仔细观察屏幕，寻找异常的亮点或暗点';

    container.appendChild(controls);
    container.appendChild(instruction);
    updateColor();

    window.changeSolidColor = function(direction) {
        currentColorIndex = (currentColorIndex + direction + colors.length) % colors.length;
        updateColor();
        document.getElementById('colorName').textContent = colors[currentColorIndex].name;
    };
}

// 漏光测试
function loadLightLeakTest(container) {
    container.style.backgroundColor = '#000000';

    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.innerHTML = `
        <span>漏光测试模式</span>
        <button class="close-btn" onclick="exitTest()">关闭 (ESC)</button>
    `;

    const instruction = document.createElement('div');
    instruction.className = 'instruction';
    instruction.textContent = '在暗室环境下观察屏幕四周边缘，检查是否有明显的漏光现象';

    container.appendChild(controls);
    container.appendChild(instruction);
}

// 干扰测试
function loadInterferenceTest(container) {
    const patterns = [
        { name: '横向条纹', type: 'horizontal' },
        { name: '纵向条纹', type: 'vertical' },
        { name: '网格', type: 'grid' },
        { name: '棋盘格', type: 'checkerboard' }
    ];

    let currentPattern = 0;

    function updatePattern() {
        const pattern = patterns[currentPattern];
        let html = '';

        switch(pattern.type) {
            case 'horizontal':
                html = '<div style="width: 100%; height: 100%; background: repeating-linear-gradient(0deg, #000 0px, #000 2px, #fff 2px, #fff 4px);"></div>';
                break;
            case 'vertical':
                html = '<div style="width: 100%; height: 100%; background: repeating-linear-gradient(90deg, #000 0px, #000 2px, #fff 2px, #fff 4px);"></div>';
                break;
            case 'grid':
                html = '<div style="width: 100%; height: 100%; background-image: repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 20px); background-color: #fff;"></div>';
                break;
            case 'checkerboard':
                html = '<div style="width: 100%; height: 100%; background-image: repeating-conic-gradient(#000 0% 25%, #fff 0% 50%); background-size: 40px 40px;"></div>';
                break;
        }

        container.querySelectorAll('div:not(.controls):not(.instruction)').forEach(el => el.remove());
        const patternDiv = document.createElement('div');
        patternDiv.innerHTML = html;
        patternDiv.style.position = 'absolute';
        patternDiv.style.top = '0';
        patternDiv.style.left = '0';
        patternDiv.style.width = '100%';
        patternDiv.style.height = '100%';
        container.insertBefore(patternDiv, container.firstChild);
    }

    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.innerHTML = `
        <button onclick="changePattern(-1)">上一个</button>
        <span style="font-weight: 500;" id="patternName">${patterns[0].name}</span>
        <button onclick="changePattern(1)">下一个</button>
        <button class="close-btn" onclick="exitTest()">关闭 (ESC)</button>
    `;

    const instruction = document.createElement('div');
    instruction.className = 'instruction';
    instruction.textContent = '观察条纹是否清晰笔直，是否有波纹或扭曲现象';

    container.appendChild(controls);
    container.appendChild(instruction);
    updatePattern();

    window.changePattern = function(direction) {
        currentPattern = (currentPattern + direction + patterns.length) % patterns.length;
        updatePattern();
        document.getElementById('patternName').textContent = patterns[currentPattern].name;
    };
}

// 对焦测试
function loadFocusTest(container) {
    container.style.backgroundColor = '#ffffff';

    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';

    const ctx = canvas.getContext('2d');

    // 绘制对焦测试图案
    ctx.fillStyle = '#000';
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // 中心圆形目标
    for (let i = 5; i > 0; i--) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, i * 30, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? '#000' : '#fff';
        ctx.fill();
    }

    // 四角文字清晰度测试
    ctx.fillStyle = '#000';
    ctx.font = '12px Arial';
    const testText = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789';
    ctx.fillText(testText, 20, 30);
    ctx.fillText(testText, canvas.width - 400, 30);
    ctx.fillText(testText, 20, canvas.height - 20);
    ctx.fillText(testText, canvas.width - 400, canvas.height - 20);

    // 绘制线条测试
    for (let i = 0; i < 360; i += 15) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        const angle = (i * Math.PI) / 180;
        const x = centerX + Math.cos(angle) * 200;
        const y = centerY + Math.sin(angle) * 200;
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    container.appendChild(canvas);

    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.innerHTML = `
        <span>对焦测试模式</span>
        <button class="close-btn" onclick="exitTest()">关闭 (ESC)</button>
    `;

    const instruction = document.createElement('div');
    instruction.className = 'instruction';
    instruction.textContent = '检查中心图案和四角文字是否清晰，线条是否锐利';

    container.appendChild(controls);
    container.appendChild(instruction);
}

// 呼吸效应测试
function loadBreathingTest(container) {
    container.style.backgroundColor = '#808080';

    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: white;
        animation: breathe 3s ease-in-out infinite;
    `;

    container.appendChild(overlay);

    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.innerHTML = `
        <span>呼吸效应测试</span>
        <button class="close-btn" onclick="exitTest()">关闭 (ESC)</button>
    `;

    const instruction = document.createElement('div');
    instruction.className = 'instruction';
    instruction.textContent = '观察屏幕亮度变化是否均匀平滑，是否有闪烁或不均匀现象';

    container.appendChild(controls);
    container.appendChild(instruction);
}

// 对比度测试
function loadContrastTest(container) {
    container.style.backgroundColor = '#000';

    const testDiv = document.createElement('div');
    testDiv.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2px;
        width: 80%;
        max-width: 800px;
    `;

    // 创建黑白对比块
    const blocks = [
        { bg: '#000', text: '#fff', label: '黑底白字' },
        { bg: '#fff', text: '#000', label: '白底黑字' },
        { bg: '#000', text: '#808080', label: '黑底灰字' },
        { bg: '#fff', text: '#808080', label: '白底灰字' }
    ];

    blocks.forEach(block => {
        const div = document.createElement('div');
        div.style.cssText = `
            background: ${block.bg};
            color: ${block.text};
            padding: 3rem;
            text-align: center;
            font-size: 1.5rem;
            font-weight: bold;
        `;
        div.textContent = block.label;
        testDiv.appendChild(div);
    });

    container.appendChild(testDiv);

    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.innerHTML = `
        <span>对比度测试</span>
        <button class="close-btn" onclick="exitTest()">关闭 (ESC)</button>
    `;

    const instruction = document.createElement('div');
    instruction.className = 'instruction';
    instruction.textContent = '检查文字是否清晰可辨，对比度是否足够';

    container.appendChild(controls);
    container.appendChild(instruction);
}

// 色阶测试
function loadGrayscaleTest(container) {
    container.style.backgroundColor = '#000';

    const testDiv = document.createElement('div');
    testDiv.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 90%;
        max-width: 1000px;
    `;

    // 创建32级灰阶
    const gradientDiv = document.createElement('div');
    gradientDiv.style.cssText = `
        width: 100%;
        height: 100px;
        display: flex;
        margin-bottom: 2rem;
    `;

    for (let i = 0; i < 32; i++) {
        const shade = Math.floor((255 / 31) * i);
        const block = document.createElement('div');
        block.style.cssText = `
            flex: 1;
            background-color: rgb(${shade}, ${shade}, ${shade});
        `;
        gradientDiv.appendChild(block);
    }

    testDiv.appendChild(gradientDiv);

    // 平滑渐变
    const smoothGradient = document.createElement('div');
    smoothGradient.style.cssText = `
        width: 100%;
        height: 100px;
        background: linear-gradient(90deg, #000 0%, #fff 100%);
    `;
    testDiv.appendChild(smoothGradient);

    container.appendChild(testDiv);

    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.innerHTML = `
        <span>色阶测试</span>
        <button class="close-btn" onclick="exitTest()">关闭 (ESC)</button>
    `;

    const instruction = document.createElement('div');
    instruction.className = 'instruction';
    instruction.textContent = '观察灰阶过渡是否平滑，是否能区分每一级，是否有色带现象';

    container.appendChild(controls);
    container.appendChild(instruction);
}

// 饱和度测试
function loadSaturationTest(container) {
    container.style.backgroundColor = '#1a1a1a';

    const testDiv = document.createElement('div');
    testDiv.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        width: 80%;
        max-width: 900px;
    `;

    const colors = [
        { name: '红色渐变', start: '#000', end: '#ff0000' },
        { name: '绿色渐变', start: '#000', end: '#00ff00' },
        { name: '蓝色渐变', start: '#000', end: '#0000ff' },
        { name: '青色渐变', start: '#000', end: '#00ffff' },
        { name: '品红渐变', start: '#000', end: '#ff00ff' },
        { name: '黄色渐变', start: '#000', end: '#ffff00' }
    ];

    colors.forEach(color => {
        const div = document.createElement('div');
        div.style.cssText = `
            height: 150px;
            background: linear-gradient(180deg, ${color.start} 0%, ${color.end} 100%);
            border-radius: 0.5rem;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            padding: 1rem;
        `;
        const label = document.createElement('span');
        label.textContent = color.name;
        label.style.cssText = `
            color: white;
            font-weight: bold;
            text-shadow: 0 2px 4px rgba(0,0,0,0.8);
        `;
        div.appendChild(label);
        testDiv.appendChild(div);
    });

    container.appendChild(testDiv);

    const controls = document.createElement('div');
    controls.className = 'controls';
    controls.innerHTML = `
        <span>饱和度测试</span>
        <button class="close-btn" onclick="exitTest()">关闭 (ESC)</button>
    `;

    const instruction = document.createElement('div');
    instruction.className = 'instruction';
    instruction.textContent = '检查颜色是否鲜艳饱满，渐变是否平滑自然';

    container.appendChild(controls);
    container.appendChild(instruction);
}
