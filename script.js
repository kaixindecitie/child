// 3D零食金字塔渲染
document.addEventListener('DOMContentLoaded', function() {
  // 创建场景
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x2A2A3A);
  
  // 创建相机
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 15;
  camera.position.y = 8;
  
  // 创建渲染器
  const container = document.getElementById('pyramid-container');
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  
  // 添加轨道控制器
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.0;
  
  // 添加环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  // 添加点光源 - 粉色调
  const pointLight1 = new THREE.PointLight(0xff69b4, 1, 100);
  pointLight1.position.set(5, 10, 5);
  scene.add(pointLight1);
  
  const pointLight2 = new THREE.PointLight(0xffb6c1, 1, 100);
  pointLight2.position.set(-5, 10, -5);
  scene.add(pointLight2);
  
  // 零食纹理映射
  const snackTextures = {
    lays: 'https://picsum.photos/id/292/200/200', // 乐事薯片
    driedFruit: 'https://picsum.photos/id/139/200/200', // 冻干水果
    fruitDried: 'https://picsum.photos/id/1080/200/200', // 水果干
    chocolate: 'https://picsum.photos/id/225/200/200', // 巧克力
    nuts: 'https://picsum.photos/id/291/200/200', // 坚果
    candy: 'https://picsum.photos/id/431/200/200' // 糖果
  };
  
  // 加载纹理函数
  const textureLoader = new THREE.TextureLoader();
  const loadedTextures = {};
  
  for (const [key, url] of Object.entries(snackTextures)) {
    loadedTextures[key] = textureLoader.load(url);
    // 设置纹理重复和包裹模式
    loadedTextures[key].wrapS = THREE.RepeatWrapping;
    loadedTextures[key].wrapT = THREE.RepeatWrapping;
    loadedTextures[key].repeat.set(1, 1);
  }
  
  // 创建零食块函数
  function createSnack(position, size, textureKey, rotation = 0) {
    const geometry = new THREE.BoxGeometry(size.x, size.y, size.z);
    const material = new THREE.MeshStandardMaterial({ map: loadedTextures[textureKey] });
    const snack = new THREE.Mesh(geometry, material);
    
    snack.position.set(position.x, position.y, position.z);
    if (rotation) {
      snack.rotation.y = rotation;
    }
    
    scene.add(snack);
    return snack;
  }
  
  // 构建金字塔
  function buildPyramid() {
    const snacks = [];
    
    // 第一层 - 基础层 (乐事薯片)
    const layer1Size = 3;
    const layer1Height = 0.5;
    
    // 底部正方形排列
    for (let x = -layer1Size; x <= layer1Size; x += 2) {
      for (let z = -layer1Size; z <= layer1Size; z += 2) {
        const snack = createSnack(
          { x, y: layer1Height / 2, z }, 
          { x: 1.8, y: layer1Height, z: 1.8 }, 
          'lays',
          Math.random() * Math.PI * 0.2
        );
        snacks.push(snack);
      }
    }
    
    // 第二层 (冻干水果)
    const layer2Size = 2;
    const layer2Height = 0.4;
    const layer2BaseY = layer1Height + layer2Height / 2;
    
    for (let x = -layer2Size; x <= layer2Size; x += 2) {
      for (let z = -layer2Size; z <= layer2Size; z += 2) {
        const snack = createSnack(
          { x, y: layer2BaseY, z }, 
          { x: 1.5, y: layer2Height, z: 1.5 }, 
          'driedFruit',
          Math.random() * Math.PI * 0.2
        );
        snacks.push(snack);
      }
    }
    
    // 第三层 (水果干)
    const layer3Size = 1;
    const layer3Height = 0.3;
    const layer3BaseY = layer2BaseY + layer2Height + layer3Height / 2;
    
    for (let x = -layer3Size; x <= layer3Size; x += 2) {
      for (let z = -layer3Size; z <= layer3Size; z += 2) {
        const snack = createSnack(
          { x, y: layer3BaseY, z }, 
          { x: 1.2, y: layer3Height, z: 1.2 }, 
          'fruitDried',
          Math.random() * Math.PI * 0.2
        );
        snacks.push(snack);
      }
    }
    
    // 第四层 (巧克力)
    const layer4Size = 0;
    const layer4Height = 0.3;
    const layer4BaseY = layer3BaseY + layer3Height + layer4Height / 2;
    
    const chocolate = createSnack(
      { x: layer4Size, y: layer4BaseY, z: layer4Size }, 
      { x: 1.0, y: layer4Height, z: 1.0 }, 
      'chocolate'
    );
    snacks.push(chocolate);
    
    // 第五层 (坚果)
    const layer5Height = 0.2;
    const layer5BaseY = layer4BaseY + layer4Height + layer5Height / 2;
    
    const nuts = createSnack(
      { x: layer4Size, y: layer5BaseY, z: layer4Size }, 
      { x: 0.8, y: layer5Height, z: 0.8 }, 
      'nuts'
    );
    snacks.push(nuts);
    
    // 顶部 (糖果)
    const topHeight = 0.3;
    const topBaseY = layer5BaseY + layer5Height + topHeight / 2;
    
    const candy = createSnack(
      { x: layer4Size, y: topBaseY, z: layer4Size }, 
      { x: 0.6, y: topHeight, z: 0.6 }, 
      'candy'
    );
    snacks.push(candy);
    
    return snacks;
  }
  
  // 创建地面
  function createGround() {
    const geometry = new THREE.PlaneGeometry(30, 30);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0x3a3a4a,
      roughness: 0.8,
      metalness: 0.2
    });
    const ground = new THREE.Mesh(geometry, material);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    scene.add(ground);
    
    // 添加地面网格辅助线
    const gridHelper = new THREE.GridHelper(30, 30, 0xff69b4, 0x3a3a4a);
    scene.add(gridHelper);
    
    return ground;
  }
  
  // 创建装饰元素
  function createDecorations() {
    const decorations = [];
    const colors = [0xff69b4, 0xffb6c1, 0xffc0cb, 0xff85a2];
    
    for (let i = 0; i < 20; i++) {
      const size = 0.3 + Math.random() * 0.2;
      const geometry = new THREE.SphereGeometry(size, 16, 16);
      const material = new THREE.MeshStandardMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        emissive: 0x222222,
        roughness: 0.3,
        metalness: 0.7
      });
      
      const decoration = new THREE.Mesh(geometry, material);
      
      // 随机位置（在金字塔周围）
      const angle = Math.random() * Math.PI * 2;
      const distance = 5 + Math.random() * 3;
      const x = Math.cos(angle) * distance;
      const z = Math.sin(angle) * distance;
      const y = 1 + Math.random() * 3;
      
      decoration.position.set(x, y, z);
      scene.add(decoration);
      decorations.push(decoration);
    }
    
    return decorations;
  }
  
  // 创建漂浮文字
  function createFloatingText() {
    // 由于Three.js直接渲染文字比较复杂，这里创建一个简单的平面表示文字
    const geometry = new THREE.PlaneGeometry(4, 1);
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 512;
    canvas.height = 128;
    
    // 绘制文字
    context.fillStyle = '#FF69B4';
    context.font = 'Bold 40px Poppins';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('六一快乐', canvas.width / 2, canvas.height / 2);
    
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    const textMesh = new THREE.Mesh(geometry, material);
    
    textMesh.position.set(0, 10, 0);
    scene.add(textMesh);
    
    return textMesh;
  }
  
  // 构建场景
  const pyramidSnacks = buildPyramid();
  const ground = createGround();
  const decorations = createDecorations();
  const floatingText = createFloatingText();
  
  // 添加点击交互
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  
  function onMouseClick(event) {
    // 计算鼠标在标准化设备坐标中的位置
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // 更新射线
    raycaster.setFromCamera(mouse, camera);
    
    // 计算射线与场景中物体的交点
    const intersects = raycaster.intersectObjects(pyramidSnacks);
    
    if (intersects.length > 0) {
      // 随机改变零食颜色
      intersects[0].object.material.color.set(
        new THREE.Color(0xff69b4 + Math.random() * 0x404040)
      );
      
      // 创建一个小爆炸效果
      createExplosion(intersects[0].point);
    }
  }
  
  function createExplosion(position) {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCnt = 100;
    
    const posArray = new Float32Array(particlesCnt * 3);
    for (let i = 0; i < particlesCnt * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 2;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0xff69b4
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    particlesMesh.position.copy(position);
    scene.add(particlesMesh);
    
    // 动画效果
    let time = 0;
    const animateParticles = () => {
      time += 0.05;
      
      // 更新粒子位置
      const positions = particlesGeometry.attributes.position.array;
      for (let i = 0; i < particlesCnt * 3; i += 3) {
        positions[i] = positions[i] * (1 + time * 0.1);
        positions[i + 1] = positions[i + 1] * (1 + time * 0.1);
        positions[i + 2] = positions[i + 2] * (1 + time * 0.1);
      }
      particlesGeometry.attributes.position.needsUpdate = true;
      
      // 淡出效果
      particlesMaterial.opacity = 1 - time * 0.2;
      
      if (time < 5) {
        requestAnimationFrame(animateParticles);
      } else {
        scene.remove(particlesMesh);
      }
    };
    
    animateParticles();
  }
  
  // 窗口大小调整
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
  
  // 鼠标点击事件
  container.addEventListener('click', onMouseClick);
  
  // 动画循环
  function animate() {
    requestAnimationFrame(animate);
    
    // 更新控制器
    controls.update();
    
    // 让装饰元素浮动
    decorations.forEach(decoration => {
      decoration.position.y = 1 + Math.sin(Date.now() * 0.001 + decoration.id) * 0.5;
      decoration.rotation.y += 0.01;
    });
    
    // 让漂浮文字旋转
    floatingText.rotation.y += 0.005;
    
    // 渲染场景
    renderer.render(scene, camera);
  }
  
  animate();
});

// 爱的留言交互
document.getElementById('toggle-message').addEventListener('click', function() {
  const response = document.getElementById('message-response');
  response.classList.toggle('hidden');
  
  // 添加动画效果
  if (!response.classList.contains('hidden')) {
    response.style.opacity = '0';
    response.style.transform = 'translateY(10px)';
    response.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    setTimeout(() => {
      response.style.opacity = '1';
      response.style.transform = 'translateY(0)';
    }, 10);
  }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});
