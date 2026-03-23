/* LOGIN & MAIN PAGE */
function proceed(){
  const username = document.getElementById("username").value.trim();
  if(username===""){
    alert("Please enter your username");
    return;
  }

  const loginPage = document.getElementById("loginPage");
  const mainPage = document.getElementById("mainPage");

  loginPage.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  loginPage.style.opacity = 0;
  loginPage.style.transform = "translateY(-50px)";

  setTimeout(() => {
    loginPage.classList.add("hidden");
    mainPage.classList.remove("hidden");
    mainPage.style.opacity = 0;
    mainPage.style.transform = "translateY(50px)";
    mainPage.style.transition = "opacity 1s ease, transform 1s ease";

    setTimeout(() => {
      mainPage.style.opacity = 1;
      mainPage.style.transform = "translateY(0)";
      mainPage.classList.add("show");
    }, 50);

    document.getElementById("welcomeText").innerText = "Welcome " + username + "!";
    showProfile();
    heroTyping();
    revealElements();
  }, 800);
}

/* Handle Enter key */
function handleEnter(e){ if(e.key==="Enter") proceed(); }

/* Show Profile, Hobbies, About Me */
function showProfile(){
  document.getElementById("content").innerHTML = `
    <h2>My Profile</h2>
    <img src="profile.jpg" class="profile">
    <p>Hello! This is my personal profile. I am learning web development and building my skills in HTML, CSS, and JavaScript.</p>
  `;
}
function showHobbies(){
  document.getElementById("content").innerHTML = `
    <h2>My Hobbies</h2>
    <p>I enjoy gaming, coding, watching movies, and listening to music.</p>
  `;
}
function showAbout(){
  document.getElementById("content").innerHTML = `
    <h2>About Me</h2>
    <p>Hello! I'm learning web development and creating modern interactive websites using HTML, CSS, and JavaScript. I enjoy exploring new technologies and building projects like this portfolio!</p>
  `;
}

/* Highlight Active Button */
function setActiveButton(clickedBtn){
  document.querySelectorAll(".buttons button").forEach(btn=>{
    btn.classList.remove("activeBtn");
  });
  clickedBtn.classList.add("activeBtn");
}

/* Gallery Lightbox */
const imgs = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
imgs.forEach(img=>{
  img.onclick = ()=>{
    lightbox.style.display="flex";
    lightboxImg.src = img.src;
  };
});
lightbox.onclick = ()=>{ lightbox.style.display="none"; }

/* Reveal on load */
function revealElements(){
  document.querySelectorAll(".reveal").forEach((el,i)=>{
    setTimeout(()=>{el.classList.add("active");}, i*200);
  });
}

/* Particles Background */
function createParticles(){
  const canvas=document.createElement("canvas");
  const ctx=canvas.getContext("2d");
  document.getElementById("particles").appendChild(canvas);
  canvas.width=window.innerWidth; canvas.height=window.innerHeight;

  let particles=[];
  for(let i=0;i<80;i++){
    particles.push({x:Math.random()*canvas.width, y:Math.random()*canvas.height, r:Math.random()*2, d:Math.random()});
  }

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle="white";
    particles.forEach(p=>{
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
      p.y+=p.d;
      if(p.y>canvas.height){p.y=0;}
    });
    requestAnimationFrame(draw);
  }
  draw();
}
window.onload = ()=>{ createParticles(); revealElements(); }

/* Hero typing effect */
function heroTyping(){
  const text = "Hi, I'm Cliff — Web Developer & Designer"; // Change to your name/title
  const el = document.getElementById("heroText");
  el.innerHTML = "";
  let i = 0;

  const interval = setInterval(()=>{
    if(i < text.length){
      el.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(interval);
      blinkCursor(el);
    }
  }, 80);
}

/* Blinking cursor */
function blinkCursor(el){
  el.innerHTML += '<span id="cursor">|</span>';
  setInterval(()=>{
    const cursor = document.getElementById("cursor");
    if(cursor) cursor.style.visibility = (cursor.style.visibility === "hidden") ? "visible" : "hidden";
  },500);
}