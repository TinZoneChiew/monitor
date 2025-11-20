# 屏幕检测专家

> 专业的在线屏幕质量检测工具，帮助您快速发现屏幕问题

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/yourusername/screen-test)

## 项目介绍

屏幕检测专家是一款完全免费的在线屏幕质量检测工具，无需安装任何软件，直接在浏览器中运行。支持多种专业检测模式，适用于新机验收、二手设备交易、日常屏幕健康检查等多种场景。

### 主要特性

- ✅ **纯色测试** - 检测屏幕坏点、亮点和暗点，支持黑、白、红、绿、蓝等8种颜色
- ✅ **漏光测试** - 在黑色背景下检测屏幕边缘和角落的漏光情况
- ✅ **干扰测试** - 通过网格和条纹图案检测屏幕的像素排列和干扰问题
- ✅ **对焦测试** - 检测屏幕的清晰度和锐度，确保显示内容清晰
- ✅ **呼吸效应** - 检测屏幕亮度变化是否均匀，是否存在闪烁问题
- ✅ **对比度测试** - 测试屏幕的黑白对比度和灰度层次表现
- ✅ **色阶测试** - 检测屏幕的灰阶过渡是否平滑，是否有色带现象
- ✅ **饱和度测试** - 测试屏幕的色彩饱和度和色彩还原能力

### 技术特点

- 🚀 纯前端技术，所有检测均在本地完成
- 🔒 零数据收集，完全保护用户隐私
- 📱 响应式设计，支持各种屏幕尺寸
- 🎨 遵循 Facebook Design 设计规范
- ⚡ 无需网络连接即可使用（下载后）
- 🌐 支持全屏模式，获得最佳检测体验

## 在线演示

访问 [在线演示地址](#) 立即体验

## 技术栈

本项目采用纯前端技术栈开发，无需后端支持：

- **HTML5** - 页面结构
- **CSS3** - 样式和动画
  - CSS Grid 布局
  - CSS Variables 主题变量
  - CSS Animations 动画效果
- **Vanilla JavaScript** - 核心交互逻辑
  - Canvas API - 对焦测试图案绘制
  - Fullscreen API - 全屏模式支持
  - 事件处理 - 键盘和鼠标交互

## 快速开始

### 本地运行

1. **克隆项目**

```bash
git clone https://github.com/yourusername/screen-test.git
cd screen-test
```

2. **直接打开**

由于项目是纯静态页面，可以直接用浏览器打开：

```bash
# 方式1: 直接双击 index.html 文件

# 方式2: 使用简单的 HTTP 服务器
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080

# Node.js (需要先安装 http-server)
npx http-server -p 8080
```

3. **访问应用**

打开浏览器访问 `http://localhost:8080`

## Nginx 部署

### 前置要求

- 已安装 Nginx
- 具有服务器 root 权限或 sudo 权限

### 部署步骤

#### 1. 上传项目文件

将项目文件上传到服务器，例如 `/var/www/screen-test/`

```bash
# 创建项目目录
sudo mkdir -p /var/www/screen-test

# 上传文件（使用 scp、ftp 或 git clone）
# 示例：使用 git
cd /var/www/screen-test
sudo git clone https://github.com/yourusername/screen-test.git .
```

#### 2. 设置文件权限

```bash
# 设置所有者为 nginx 用户（根据实际情况调整）
sudo chown -R nginx:nginx /var/www/screen-test

# 设置文件权限
sudo chmod -R 755 /var/www/screen-test
```

#### 3. 配置 Nginx

创建 Nginx 配置文件：

```bash
sudo nano /etc/nginx/conf.d/screen-test.conf
```

添加以下配置：

```nginx
server {
    listen 80;
    listen [::]:80;

    # 替换为你的域名
    server_name screen-test.example.com;

    # 项目根目录
    root /var/www/screen-test;
    index index.html;

    # 日志配置
    access_log /var/log/nginx/screen-test-access.log;
    error_log /var/log/nginx/screen-test-error.log;

    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # 主路由
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # HTML 文件不缓存
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # 安全头部
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

#### 4. 配置 HTTPS（推荐）

使用 Let's Encrypt 免费 SSL 证书：

```bash
# 安装 certbot
sudo yum install certbot python3-certbot-nginx  # CentOS/RHEL
sudo apt install certbot python3-certbot-nginx  # Ubuntu/Debian

# 获取并配置 SSL 证书
sudo certbot --nginx -d screen-test.example.com

# 证书会自动续期，可以测试续期命令
sudo certbot renew --dry-run
```

#### 5. 测试并重启 Nginx

```bash
# 测试配置文件语法
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx

# 设置开机自启
sudo systemctl enable nginx
```

#### 6. 配置防火墙

```bash
# CentOS/RHEL (firewalld)
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload

# Ubuntu/Debian (ufw)
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

### 验证部署

访问 `http://your-domain.com` 或 `https://your-domain.com` 检查网站是否正常运行。

### 常见问题

1. **403 Forbidden 错误**
   - 检查文件权限：`ls -la /var/www/screen-test`
   - 检查 SELinux：`sudo setenforce 0`（临时禁用）

2. **502 Bad Gateway**
   - 检查 Nginx 是否正在运行：`sudo systemctl status nginx`
   - 查看错误日志：`sudo tail -f /var/log/nginx/error.log`

3. **静态文件无法加载**
   - 检查文件路径是否正确
   - 查看浏览器控制台错误信息

## 项目结构

```
screen-test/
├── index.html          # 主页面
├── about.html          # 关于页面
├── privacy.html        # 隐私政策页面
├── style.css           # 全局样式文件
├── script.js           # 核心交互逻辑
├── .gitignore          # Git 忽略文件
└── README.md           # 项目文档
```

## 使用说明

1. **选择测试模式**：在首页点击任意测试项目卡片
2. **进入全屏**：自动进入全屏测试模式
3. **切换测试**：使用顶部控制按钮切换不同的测试模式
4. **退出测试**：按 `ESC` 键或点击"关闭"按钮退出

### 各测试模式说明

- **纯色测试**：仔细观察屏幕，寻找异常的亮点或暗点
- **漏光测试**：在暗室环境下观察屏幕四周边缘
- **干扰测试**：观察条纹是否清晰笔直
- **对焦测试**：检查中心图案和四角文字是否清晰
- **呼吸效应**：观察屏幕亮度变化是否均匀平滑
- **对比度测试**：检查文字是否清晰可辨
- **色阶测试**：观察灰阶过渡是否平滑
- **饱和度测试**：检查颜色是否鲜艳饱满

## 浏览器兼容性

- ✅ Chrome / Edge（推荐）
- ✅ Firefox
- ✅ Safari
- ✅ Opera

建议使用最新版本的现代浏览器以获得最佳体验。

## 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 开源许可

本项目采用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 作者

**丁老师**

- 如有问题或建议，欢迎提交 Issue

## 更新日志

### v1.0.0 (2025-01-20)

- 🎉 初始版本发布
- ✨ 实现 8 种屏幕检测模式
- 🎨 采用 Facebook Design 设计规范
- 📱 响应式设计支持
- 🔒 零数据收集，保护隐私

## 致谢

感谢所有为本项目提供建议和帮助的朋友们！

---

⭐ 如果这个项目对你有帮助，欢迎 Star！
