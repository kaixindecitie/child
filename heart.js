// 动态注入字体定义
const style = document.createElement('style');
style.textContent = `
  @font-face {
    font-family: 'sizedemo01';
    src: url('yt.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }
`;
document.head.appendChild(style);
// 配置参数
const config = {
  heart: {
    colors: ['#ff3399', '#ff66b3', '#cc33ff', '#ff99cc', '#ff55aa'],
    minSize: 20,
    maxSize: 40,
    animationDuration: [2500, 5000],
    flyDistance: [-250, -500],
    spawnRate: 300 // 每300ms尝试生成一个
  },
  romanticElement: {
    colors: ['#ff99cc', '#cc99ff', '#99ccff', '#ffccff', '#cce6ff'],
    minSize: 10,
    maxSize: 30,
    floatDuration: [10000, 20000],
    floatDistance: [-150, -400],
    rotationRange: 360,
    spawnRate: 800
  },
  star: {
    colors: ['#ffffff', '#ffccff', '#cce6ff', '#e6ccff', '#ccddff'],
    minSize: 2,
    maxSize: 10,
    twinkleDuration: [1500, 4000],
    spawnRate: 400
  },
  confetti: {
    enabled: true,
    colors: ['#ff3399', '#ff66b3', '#cc33ff', '#ff99cc', '#99ccff', '#cc99ff'],
    minSize: 8,
    maxSize: 16,
    animationDuration: [3000, 6000],
    spawnRate: 1500
  },
  note: {
    text: '晔宝💖（我的一生挚爱郭子晔6.16）',
    minSize: 20,
    maxSize: 40,
    animationDuration: [5000, 10000],
	fontFamily:'sizedemo01',
    spawnRate: 2000
  }
};

// 初始化容器
const heartContainer = document.querySelector('.heart-container') || (() => {
  const container = document.createElement('div');
  container.className = 'heart-container';
  document.body.appendChild(container);
  return container;
})();

// 粒子效果容器
const particleContainer = document.createElement('div');
particleContainer.className = 'particle-container';
document.body.appendChild(particleContainer);

// 点击生成爱心效果
document.addEventListener('click', function(e) {
  createHeart(e.clientX, e.clientY);
  
  // 点击时额外生成一些星星和粒子
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      createStarNear(e.clientX, e.clientY);
      if (config.confetti.enabled) createConfetti(e.clientX, e.clientY);
    }, i * 100);
  }
});

// 自动生成浪漫元素
setInterval(() => {
  if (Math.random() > 0.6) {
    createRomanticElement();
  } else {
    createStar();
  }
}, config.romanticElement.spawnRate);

// 自动生成星星
setInterval(createStar, config.star.spawnRate);

// 自动生成爱心
setInterval(() => {
  if (Math.random() > 0.95) { // 5%的概率生成
    createHeart(
      Math.random() * window.innerWidth, 
      window.innerHeight + 50
    );
  }
}, config.heart.spawnRate);

// 自动生成备注动画
setInterval(createNoteAnimation, config.note.spawnRate);

// 创建爱心
function createHeart(x, y) {
  const heart = document.createElement('div');
  
  // 随机选择颜色
  const color = config.heart.colors[Math.floor(Math.random() * config.heart.colors.length)];
  
  // 随机大小
  const size = Math.floor(Math.random() * (config.heart.maxSize - config.heart.minSize + 1)) + config.heart.minSize;
  
  // 随机动画持续时间
  const duration = Math.floor(Math.random() * (config.heart.animationDuration[1] - config.heart.animationDuration[0] + 1)) + config.heart.animationDuration[0];
  
  // 随机飞行距离
  const flyDistance = Math.floor(Math.random() * (config.heart.flyDistance[1] - config.heart.flyDistance[0] + 1)) + config.heart.flyDistance[0];
  
  // 随机水平偏移
  const horizontalOffset = (Math.random() - 0.5) * 200;
  
  // 设置样式和位置
  heart.className = 'heart';
  heart.style.backgroundColor = color;
  heart.style.setProperty('--animation-duration', `${duration}ms`);
  heart.style.setProperty('--fly-distance', `${flyDistance}px`);
  heart.style.setProperty('--horizontal-offset', `${horizontalOffset}px`);
  heart.style.left = `${x - size/2}px`;
  heart.style.top = `${y - size/2}px`;
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  
  // 添加光晕效果
  if (Math.random() > 0.7) {
    heart.classList.add('glow');
  }
  
  // 应用到容器
  heartContainer.appendChild(heart);
  
  // 动画结束后移除
  setTimeout(() => {
    heart.remove();
  }, duration);
}

// 创建浪漫元素
function createRomanticElement() {
  const element = document.createElement('div');
  
  // 随机位置
  const randomLeft = Math.random() * window.innerWidth;
  const randomTop = Math.random() * window.innerHeight;
  
  // 随机大小
  const size = Math.floor(Math.random() * (config.romanticElement.maxSize - config.romanticElement.minSize + 1)) + config.romanticElement.minSize;
  
  // 随机形状 (心形、圆形或星形)
  const shapes = ['heart-shaped', 'circle', 'star-shaped'];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  
  // 随机颜色
  const color = config.romanticElement.colors[Math.floor(Math.random() * config.romanticElement.colors.length)];
  
  // 随机动画参数
  const floatDuration = Math.floor(Math.random() * (config.romanticElement.floatDuration[1] - config.romanticElement.floatDuration[0] + 1)) + config.romanticElement.floatDuration[0];
  const floatDistance = Math.floor(Math.random() * (config.romanticElement.floatDistance[1] - config.romanticElement.floatDistance[0] + 1)) + config.romanticElement.floatDistance[0];
  const rotation = Math.floor(Math.random() * config.romanticElement.rotationRange);
  
  // 设置样式和位置
  element.className = `romantic-element ${shape}`;
  element.style.backgroundColor = color;
  element.style.setProperty('--float-duration', `${floatDuration}ms`);
  element.style.setProperty('--float-distance', `${floatDistance}px`);
  element.style.setProperty('--rotation', `${rotation}deg`);
  element.style.left = `${randomLeft}px`;
  element.style.top = `${randomTop}px`;
  element.style.width = `${size}px`;
  element.style.height = `${size}px`;
  
  // 添加发光效果
  if (Math.random() > 0.6) {
    element.classList.add('glow');
  }
  
  // 应用到容器
  heartContainer.appendChild(element);
  
  // 动画结束后移除
  setTimeout(() => {
    element.remove();
  }, floatDuration);
}

// 创建星星
function createStar(x = null, y = null) {
  const star = document.createElement('div');
  
  // 随机位置或指定位置
  const randomLeft = x !== null ? x + (Math.random() - 0.5) * 100 : Math.random() * window.innerWidth;
  const randomTop = y !== null ? y + (Math.random() - 0.5) * 100 : Math.random() * window.innerHeight;
  
  // 随机大小
  const size = Math.floor(Math.random() * (config.star.maxSize - config.star.minSize + 1)) + config.star.minSize;
  
  // 随机颜色
  const color = config.star.colors[Math.floor(Math.random() * config.star.colors.length)];
  
  // 随机闪烁持续时间
  const twinkleDuration = Math.floor(Math.random() * (config.star.twinkleDuration[1] - config.star.twinkleDuration[0] + 1)) + config.star.twinkleDuration[0];
  
  // 随机闪烁强度
  const twinkleMin = Math.random() * 0.4 + 0.3; // 0.3-0.7
  const twinkleScaleMin = Math.random() * 0.4 + 0.6; // 0.6-1.0
  
  // 设置样式和位置
  star.className = 'star';
  star.style.backgroundColor = color;
  star.style.setProperty('--twinkle-duration', `${twinkleDuration}ms`);
  star.style.setProperty('--twinkle-min', `${twinkleMin}`);
  star.style.setProperty('--twinkle-scale-min', `${twinkleScaleMin}`);
  star.style.left = `${randomLeft}px`;
  star.style.top = `${randomTop}px`;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  
  // 随机星星形状
  if (Math.random() > 0.5) {
    star.classList.add('sparkle');
  }
  
  // 应用到容器
  heartContainer.appendChild(star);
  
  // 一段时间后移除
  setTimeout(() => {
    star.remove();
  }, twinkleDuration * 3);
}

// 在指定位置附近创建星星
function createStarNear(x, y) {
  createStar(x, y);
}

// 创建五彩纸屑
function createConfetti(x, y) {
  const confetti = document.createElement('div');
  
  // 随机颜色
  const color = config.confetti.colors[Math.floor(Math.random() * config.confetti.colors.length)];
  
  // 随机大小
  const size = Math.floor(Math.random() * (config.confetti.maxSize - config.confetti.minSize + 1)) + config.confetti.minSize;
  
  // 随机形状
  const shapes = ['square', 'circle', 'triangle', 'heart-shaped']; // 添加爱心形状
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  
  // 随机动画参数
  const duration = Math.floor(Math.random() * (config.confetti.animationDuration[1] - config.confetti.animationDuration[0] + 1)) + config.confetti.animationDuration[0];
  const horizontalDrift = (Math.random() - 0.5) * 200;
  const rotation = Math.floor(Math.random() * 360);
  
  // 设置样式和位置
  confetti.className = `confetti ${shape}`;
  confetti.style.backgroundColor = color;
  confetti.style.setProperty('--animation-duration', `${duration}ms`);
  confetti.style.setProperty('--horizontal-drift', `${horizontalDrift}px`);
  confetti.style.setProperty('--rotation', `${rotation}deg`);
  confetti.style.left = `${x - size/2}px`;
  confetti.style.top = `${y - size/2}px`;
  confetti.style.width = `${size}px`;
  confetti.style.height = `${size}px`;
  
  // 应用到容器
  particleContainer.appendChild(confetti);
  
  // 动画结束后移除
  setTimeout(() => {
    confetti.remove();
  }, duration);
}

// 创建备注动画
function createNoteAnimation() {
  const note = document.createElement('div');
  
  // 随机位置
  const randomLeft = Math.random() * window.innerWidth;
  const randomTop = window.innerHeight;
  
  // 随机大小
  const size = Math.floor(Math.random() * (config.note.maxSize - config.note.minSize + 1)) + config.note.minSize;
  
  // 随机动画持续时间
  const duration = Math.floor(Math.random() * (config.note.animationDuration[1] - config.note.animationDuration[0] + 1)) + config.note.animationDuration[0];
  
  // 随机水平偏移
  const horizontalOffset = (Math.random() - 0.5) * 200;
  
  // 设置样式和位置
  note.className = 'note';
  note.textContent = config.note.text;
  note.style.fontSize = `${size}px`;
  note.style.fontFamily = config.note.fontFamily;  // 设置字体类型
  note.style.color = config.note.color;  // 设置字体颜色
  note.style.setProperty('--animation-duration', `${duration}ms`);
  note.style.setProperty('--horizontal-offset', `${horizontalOffset}px`);
  note.style.left = `${randomLeft}px`;
  note.style.top = `${randomTop}px`;
  
  // 应用到容器
  heartContainer.appendChild(note);
  
  // 动画结束后移除
  setTimeout(() => {
    note.remove();
  }, duration);
}

// 响应窗口大小变化
window.addEventListener('resize', function() {
  // 可以添加调整元素位置的逻辑
});    
document.querySelectorAll('.photo-card').forEach(card => {
	card.addEventListener('click', () => {
		card.classList.toggle('flipped');
		card.classList.add('flip-surprise');
		setTimeout(() => {
			card.classList.remove('flip-surprise');
		}, 1000);
		checkAllFlipped();
	});
});

function checkAllFlipped() {
	const allFlipped = Array.from(document.querySelectorAll('.photo-card')).every(card => card.classList.contains('flipped'));
	if (allFlipped) {
		triggerFinalSurprise();
	}
}

function triggerFinalSurprise() {
	alert("彩蛋触发！给宝宝满满一筐的爱！");
}

const blessings = [
	"愿我们的爱永远甜蜜",
	"每天都像初见般心动",
	"你是我生命中最美的风景",
	"携手共度每一个春夏秋冬",
	"爱你无悔，陪你到老",
	"感谢有你，幸福满满"
];

const blessingElements = document.querySelectorAll('.blessing-text');
blessingElements.forEach((el, index) => {
	const blessing = blessings[index % blessings.length];
	el.textContent = blessing;
});
