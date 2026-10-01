const stage=document.getElementById('gift3d');
const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setSize(stage.clientWidth,stage.clientHeight);renderer.shadowMap.enabled=true;stage.appendChild(renderer.domElement);
const scene=new THREE.Scene();const camera=new THREE.PerspectiveCamera(34,stage.clientWidth/stage.clientHeight,.1,100);camera.position.set(0,1.2,7.2);
const group=new THREE.Group();group.position.y=-.25;scene.add(group);
scene.add(new THREE.HemisphereLight(0xffe9df,0x160e0f,2.8));const key=new THREE.DirectionalLight(0xffd8c8,5);key.position.set(3,6,5);key.castShadow=true;scene.add(key);const rim=new THREE.PointLight(0xe88783,3,14);rim.position.set(-4,2,3);scene.add(rim);
const M=(c,r=.4,m=.05)=>new THREE.MeshStandardMaterial({color:c,roughness:r,metalness:m});
const boxMat=M(0xb96b69,.25,.03), lidMat=M(0xd99590,.25,.04), ribbonMat=M(0xf2b0aa,.23,.02), gold=M(0xc99968,.18,.75), dark=M(0x553337,.45);
const base=new THREE.Mesh(new THREE.BoxGeometry(2.9,1.6,2.15),boxMat);base.position.y=-.05;base.castShadow=true;group.add(base);
const inner=new THREE.Mesh(new THREE.BoxGeometry(2.55,.15,1.82),M(0x6d4245,.6));inner.position.y=.78;group.add(inner);
const lid=new THREE.Mesh(new THREE.BoxGeometry(3.02,.28,2.28),lidMat);lid.position.set(0,1.02,.05);lid.rotation.z=-.07;lid.rotation.x=-.03;lid.castShadow=true;group.add(lid);
const ribbon=new THREE.Mesh(new THREE.BoxGeometry(.34,1.9,2.2),ribbonMat);ribbon.position.y=.1;group.add(ribbon);
for(const x of [-.3,.3]){const b=new THREE.Mesh(new THREE.TorusGeometry(.43,.1,18,40,Math.PI*1.7),ribbonMat);b.scale.y=.7;b.position.set(x,1.35,.05);b.rotation.z=x>0?-.22:.22;group.add(b)}
const bc=new THREE.Mesh(new THREE.SphereGeometry(.16,24,24),ribbonMat);bc.position.set(0,1.34,.05);group.add(bc);
function flower(x,z,s=1,c=0xd77f82){const stem=new THREE.Mesh(new THREE.CylinderGeometry(.025,.035,1.25,10),M(0x5c7e58,.8));stem.position.set(x,.92,z);group.add(stem);const g=new THREE.Group();g.position.set(x,1.58,z);const center=new THREE.Mesh(new THREE.SphereGeometry(.14,16,16),gold);g.add(center);for(let i=0;i<7;i++){const p=new THREE.Mesh(new THREE.SphereGeometry(.2,16,16),M(c,.42));const a=i*Math.PI*2/7;p.position.set(Math.cos(a)*.17,Math.sin(a)*.17,0);p.scale.y=.68;g.add(p)}group.add(g)}
flower(-.65,.2,1,0xd97880);flower(0,.18,1.1,0xe99b9a);flower(.65,.23,.9,0xb95e66);
const bear=new THREE.Group();const bm=M(0xd6a78f,.65);const body=new THREE.Mesh(new THREE.SphereGeometry(.42,24,24),bm);body.scale.y=1.15;bear.add(body);const head=new THREE.Mesh(new THREE.SphereGeometry(.35,24,24),bm);head.position.y=.55;bear.add(head);for(const x of[-.23,.23]){const ear=new THREE.Mesh(new THREE.SphereGeometry(.12,16,16),bm);ear.position.set(x,.77,0);bear.add(ear)}bear.position.set(.25,.72,.7);bear.scale.set(.8,.8,.8);group.add(bear);
const tag=new THREE.Mesh(new THREE.BoxGeometry(.75,.45,.04),M(0xfff2ea,.6));tag.position.set(.7,.1,1.09);tag.rotation.z=-.12;group.add(tag);
const particles=[];for(let i=0;i<35;i++){const p=new THREE.Mesh(new THREE.SphereGeometry(.018,8,8),M(i%2?0xe9a19c:0xd3b080,.4));p.position.set((Math.random()-.5)*5,Math.random()*4-1,(Math.random()-.5)*2.5);scene.add(p);particles.push(p)}
let tx=0,ty=0;window.addEventListener('pointermove',e=>{tx=(e.clientX/innerWidth-.5)*.7;ty=(e.clientY/innerHeight-.5)*.35;document.querySelector('.cursor').style.left=e.clientX+'px';document.querySelector('.cursor').style.top=e.clientY+'px'});
function animate(t){requestAnimationFrame(animate);group.rotation.y+=(tx-group.rotation.y)*.035;group.rotation.x+=(-ty-group.rotation.x)*.035;group.position.y=-.25+Math.sin(t*.001)*.045;particles.forEach((p,i)=>{p.position.y+=Math.sin(t*.0007+i)*.0005;p.rotation.y+=.003});renderer.render(scene,camera)}animate(0);
addEventListener('resize',()=>{camera.aspect=stage.clientWidth/stage.clientHeight;camera.updateProjectionMatrix();renderer.setSize(stage.clientWidth,stage.clientHeight)});
const nav=document.querySelector('.nav');addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>30));
document.querySelectorAll('.tilt').forEach(el=>{el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(800px) rotateX(${-y*5}deg) rotateY(${x*5}deg) translateY(-5px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(x=>obs.observe(x));
function sendRequest(e){e.preventDefault();document.getElementById('msg').textContent='♡ Request captured — connect this form to WhatsApp/email before launch.';e.target.reset()}
