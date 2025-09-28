/**
 * 摄像头PWA应用主类
 * 负责管理摄像头启动、停止、拍照和镜像切换功能
 */
class CameraApp {
    constructor() {
        // DOM元素引用
        this.video = document.getElementById('video');
        this.mainBtn = document.getElementById('main-btn');
        this.mirrorBtn = document.getElementById('mirror-btn');
        
        // 应用状态
        this.stream = null;
        this.isMirrored = false;
        this.isRunning = false;
        
        // 初始化应用
        this.init();
    }
    
    /**
     * 初始化应用
     * 绑定事件监听器和检查浏览器支持
     */
    init() {
        this.bindEvents();
        this.checkBrowserSupport();
    }
    
    /**
     * 绑定事件监听器
     */
    bindEvents() {
        this.mainBtn.addEventListener('click', () => this.handleMainButtonClick());
        this.mirrorBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleMirror();
        });
    }
    
    /**
     * 检查浏览器支持
     */
    checkBrowserSupport() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            console.error('浏览器不支持摄像头功能');
        }
    }
    
    /**
     * 处理主按钮点击事件
     * 根据当前状态决定启动摄像头或拍照
     */
    async handleMainButtonClick() {
        if (this.isRunning) {
            await this.takePhoto();
        } else {
            await this.startCamera();
        }
    }
    
    /**
     * 启动摄像头
     */
    async startCamera() {
        try {
            this.updateMainButton('启动中...', true);
            
            // 获取摄像头权限
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: { 
                    width: { ideal: 1280 }, 
                    height: { ideal: 720 }, 
                    facingMode: 'user' 
                },
                audio: false
            });
            
            // 设置视频源
            this.video.srcObject = this.stream;
            this.video.onloadedmetadata = () => {
                this.video.play();
                this.isRunning = true;
                this.updateMainButton('拍照', false);
                this.mirrorBtn.disabled = false;
            };
        } catch (error) {
            this.handleError(error);
        }
    }
    
    /**
     * 停止摄像头
     */
    stopCamera() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        this.video.srcObject = null;
        this.isRunning = false;
        this.updateMainButton('启动', false);
        this.mirrorBtn.disabled = true;
    }
    
    /**
     * 处理错误
     * @param {Error} error - 错误对象
     */
    handleError(error) {
        console.error('摄像头错误:', error);
        this.updateMainButton('启动', false);
    }
    
    /**
     * 更新主按钮状态
     * @param {string} text - 按钮文字
     * @param {boolean} disabled - 是否禁用
     */
    updateMainButton(text, disabled) {
        this.mainBtn.textContent = text;
        this.mainBtn.disabled = disabled;
        
        // 添加加载动画
        if (text === '启动中...') {
            this.mainBtn.classList.add('loading');
        } else {
            this.mainBtn.classList.remove('loading');
        }
    }
    
    /**
     * 切换镜像模式
     */
    toggleMirror() {
        // 只有在摄像头运行时才能切换镜像
        if (!this.isRunning) {
            return;
        }
        
        this.isMirrored = !this.isMirrored;
        
        if (this.isMirrored) {
            this.video.style.transform = 'scaleX(-1)';
            this.mirrorBtn.textContent = '镜像';
        } else {
            this.video.style.transform = 'scaleX(1)';
            this.mirrorBtn.textContent = '非镜像';
        }
    }
    
    /**
     * 拍照功能
     */
    async takePhoto() {
        if (!this.isRunning) return;
        
        try {
            const canvas = this.createCanvas();
            const ctx = canvas.getContext('2d');
            
            // 设置canvas尺寸
            canvas.width = this.video.videoWidth;
            canvas.height = this.video.videoHeight;
            
            // 绘制视频帧
            this.drawVideoFrame(ctx, canvas);
            
            // 下载照片
            this.downloadPhoto(canvas);
            
            // 闪光效果
            this.showFlash();
        } catch (error) {
            console.error('拍照失败:', error);
        }
    }
    
    /**
     * 创建canvas元素
     * @returns {HTMLCanvasElement} canvas元素
     */
    createCanvas() {
        return document.createElement('canvas');
    }
    
    /**
     * 绘制视频帧到canvas
     * @param {CanvasRenderingContext2D} ctx - canvas上下文
     * @param {HTMLCanvasElement} canvas - canvas元素
     */
    drawVideoFrame(ctx, canvas) {
        ctx.save(); // 保存当前变换状态
        
        if (this.isMirrored) {
            ctx.scale(-1, 1);
            ctx.drawImage(this.video, -canvas.width, 0, canvas.width, canvas.height);
        } else {
            ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height);
        }
        
        ctx.restore(); // 恢复变换状态
    }
    
    /**
     * 下载照片
     * @param {HTMLCanvasElement} canvas - canvas元素
     */
    downloadPhoto(canvas) {
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `photo_${new Date().getTime()}.jpg`;
            link.click();
            URL.revokeObjectURL(url);
        }, 'image/jpeg', 0.9);
    }
    
    /**
     * 显示闪光效果
     */
    showFlash() {
        const flashEl = document.getElementById('flash');
        flashEl.style.opacity = '1';
        setTimeout(() => {
            flashEl.style.opacity = '0';
        }, 100);
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => new CameraApp());

// 注册Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js');
    });
}
