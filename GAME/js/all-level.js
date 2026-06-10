    const player = document.getElementById("player");
    const door = document.getElementById("door");
    const platforms = document.querySelectorAll(".platform");
    const gameArea = document.querySelector(".game-area");

    const btnLeft = document.getElementById("left");
    const btnRight = document.getElementById("right");
    const btnJump = document.getElementById("jump");
    const btnDown = document.getElementById("down");

    const retryBtn = document.getElementById("retryBtn");
    const restartBtn = document.getElementById("restart");
    const menuToggle = document.getElementById("menuToggle");
    const menuOverlay = document.getElementById("menuOverlay");
    const backBtn = document.getElementById("back");
    const pauseBtn = document.getElementById("pause");
    const spikes = document.querySelectorAll(".spike");

    // 🔥 Sirf data-group spikes ke liye
    const spikeGroups = {};
    document.querySelectorAll(".spike[data-group]").forEach(spike => {  // <- note data-group selector
        const group = spike.dataset.group;
        if(!spikeGroups[group]) spikeGroups[group] = [];
        spikeGroups[group].push(spike);

        // Start hidden at bottom
        spike.style.bottom = "420px";
        spike.style.opacity = "0";
    });

    // Spike animation state
    let spikeActive = false;
    let spikeDirection = 1; // 1 = up, -1 = down
    let spikeTimer = 0;
    let spikeInterval = 2000; // 2 seconds per switch
    let spikeSpeed = 1.2; // pixels per frame for smooth movement

    function updateSpikes(){
        if(!spikeActive) return;

        Object.keys(spikeGroups).forEach(group => {
            spikeGroups[group].forEach(spike => {
                let bottom = parseFloat(spike.style.bottom);

                // Determine direction for each group
                // 1,3,5 = up first, 2,4,6 = down first
                let dir = ([1,3,5].includes(parseInt(group))) ? spikeDirection : -spikeDirection;

                bottom += spikeSpeed * dir;

                // Clamp values
                if(bottom >= 440) bottom = 440;
                if(bottom <= 420) bottom = 420;

                spike.style.bottom = bottom + "px";

                // Show/hide spikes
                spike.style.opacity = (bottom > 420) ? "1" : "0";
            });
        });

        // Timer for switching direction
        spikeTimer += 16; // ~60fps
        if(spikeTimer >= spikeInterval){
            spikeDirection *= -1;
            spikeTimer = 0;
        }
    }

    // Trigger spike movement when player reaches 720px
    function checkSpikeTrigger(){
        spikeActive = positionX >= 720;
        if(!spikeActive){
            // Reset spikes to hidden
            Object.values(spikeGroups).flat().forEach(spike => {
                spike.style.bottom = "420px";
                spike.style.opacity = "0";
            });
        }
    }

    // 🔥 UPDATED SPIKE COLLISION
    function checkSpikeCollision(){
        Object.values(spikeGroups).flat().forEach(spike => {
            const sLeft = spike.offsetLeft;
            const sBottom = parseFloat(spike.style.bottom);
            const sWidth = spike.offsetWidth;
            const sHeight = spike.offsetHeight;

            // Only trigger game over if spike is UP (active)
            if(sBottom > 420){
                if(
                    positionX + playerWidth > sLeft &&
                    positionX < sLeft + sWidth &&
                    positionY + playerHeight > sBottom &&
                    positionY < sBottom + sHeight
                ){
    gameRunning = false;
    isGameOver = true;
    document.getElementById("gameOverPopup").style.display = "flex";
    cancelAnimationFrame(animationId);

                }
            }
        });
    }

    // Integrate into main update loop
    function spikeLoop(){
        checkSpikeTrigger();
        updateSpikes();
        checkSpikeCollision(); // check only active spikes
        requestAnimationFrame(spikeLoop);
    }

    // Start spike loop
    requestAnimationFrame(spikeLoop);

    // 🔥 ALL PLATFORM CONFIG HERE (REAL + FAKE BOTH)
    const platformConfigs = {

        1: {
            type: "horizontal",
            startX: 200,
            endX: 300,
            speed: 1.5,
            triggerX: [130, 300],
            repeat: false
        },

        2: {  
            type: "horizontal",
            startX: 450,
            endX: 700,
            speed: 1,
            triggerX: [420, 450],
            repeat: true
        },

        3: {
            type: "vertical",
            startY: 400,
            endY: 400,
            speed: 0.005,
            triggerX: [400, 600],
            repeat: false
        },

        4: {
            type: "horizontal",
            startX: 850,
            endX: 1500,
            speed: 0.9,
            triggerX: [800, 1300],
            repeat: true
        },

        5: {
            type: "vertical",
            startY: 450,
            endY: 700,
            speed: 2,
            triggerX: [1700, 1900],
            repeat: false
        },
        6: {
            type: "horizontal",
            startY: 1420,
            endY: 1800,
            speed: 1.4,
            triggerX: [1400, 1800],
            repeat: false
        },
        7: {
            type: "horizontal",
            startX: 400,
            endX: 600,
            speed: 1.5,
            triggerX: [380, 420],
            repeat: true
        },
        8: {
            type: "horizontal",
            startX: 10,
            endX: 900,
            speed: 1.5,
            triggerX: [380, 420],
            repeat: false
        },
            9: {
            type: "horizontal",
            startX: 900,
            endX: 1800,
            speed: 1.5,
            triggerX: [850, 900],
            repeat: true
        },
        10: {
            type: "horizontal",
            startX: -110,
            endX: -910,
            speed: 25,
            triggerX: [350, 900],
            repeat: true
        },
            11: {
            type: "horizontal",
            startX: -130,
            endX: -930,
            speed: 25,
            triggerX: [350, 900],
            repeat: true
        },
            12: {
            type: "horizontal",
            startX: -150,
            endX: -950,
            speed: 25,
            triggerX: [350, 900],
            repeat: true
        },
        13: {
            type: "horizontal",
            startX: 900,
            endX: 9500,
            speed: 55,
            triggerX: [950, 1000],
            repeat: true
        },
        14: {
            type: "vertical",
            startY: 400,
            endY: 680,
            speed: 2.5,
            triggerX: [1000, 1400],
            repeat: true
        },
        15: {
            type: "horizontal",
            startX: 1330,
            endX: 1800,
            speed: 1.9,
            triggerX: [1000, 1800],
            repeat: true
        },
        16: {
            type: "horizontal",
            startX: 480,
            endX: 960,
            speed: 0.8,
            triggerX: [760, 1800],
            repeat: false
        },
            17: {
            type: "horizontal",
            startX: 480,
            endX: 1100,
            speed: 0.8,
            triggerX: [760, 1800],
            repeat: false
        },
            18: {
            type: "horizontal",
            startX: 480,
            endX: 1240,
            speed: 0.8,
            triggerX: [760, 1800],
            repeat: false
        },
        19: {
            type: "horizontal",
            startX: 480,
            endX: 1380,
            speed: 0.8,
            triggerX: [760, 1800],
            repeat: false
        },
        20: {
            type: "horizontal",
            startX: 480,
            endX: 1520,
            speed: 0.8,
            triggerX: [760, 1800],
            repeat: false
        },
    21: {
            type: "horizontal",
            startX: 480,
            endX: 1660,
            speed: 0.8,
            triggerX: [760, 1800],
            repeat: false
        },
        22: {
            type: "horizontal",
            startX: 1810,
            endX: 2560,
            speed: 0.6,
            triggerX: [1800, 2900],
            repeat: true
        },
        23: {
            type: "horizontal",
            startX: 1810,
            endX: 2560,
            speed: 0.6,
            triggerX: [1800, 2900],
            repeat: true
        },
            24: {
            type: "horizontal",
            startX: 1810,
            endX: 2560,
            speed: 0.6,
            triggerX: [1800, 2900],
            repeat: true
        },
        25: {
            type: "horizontal",
            startX: 1810,
            endX: 2560,
            speed: 0.6,
            triggerX: [1800, 2900],
            repeat: true
        },
            26: {
            type: "horizontal",
            startX: 1810,
            endX: 2560,
            speed: 0.6,
            triggerX: [1800, 2900],
            repeat: true
        },
            27: {
            type: "horizontal",
            startX: 1810,
            endX: 2560,
            speed: 0.6,
            triggerX: [1800, 2900],
            repeat: true
        },
            28: {
            type: "horizontal",
            startX: 1810,
            endX: 2560,
            speed: 0.6,
            triggerX: [1800, 2900],
            repeat: true
        },
            29: {
            type: "horizontal",
            startX: 1810,
            endX: 2560,
            speed: 0.6,
            triggerX: [1800, 2900],
            repeat: true
        },
            30: {
            type: "horizontal",
            startX: 1810,
            endX: 2560,
            speed: 0.6,
            triggerX: [1800, 2900],
            repeat: true
        },
                31: {
            type: "vertical",
            startY: 420,
            endY: 440,
            speed: 2,
            triggerX: [130, 400],
            repeat: false
        },
            32: {
            type: "vertical",
            startY: 420,
            endY: 440,
            speed: 2,
            triggerX: [150, 400],
            repeat: false
        },
            33: {
            type: "vertical",
            startY: 420,
            endY: 440,
            speed: 2,
            triggerX: [170, 400],
            repeat: false
        },
                34: {
            type: "vertical",
            startY: 420,
            endY: 440,
            speed: 2,
            triggerX: [190, 400],
            repeat: false
        },
                35: {
            type: "vertical",
            startY: 420,
            endY: 440,
            speed: 2,
            triggerX: [210, 400],
            repeat: false
        },
                36: {
            type: "vertical",
            startY: 420,
            endY: 440,
            speed: 2,
            triggerX: [230, 400],
            repeat: false
        },
                    37: {
            type: "vertical",
            startY: 420,
            endY: 440,
            speed: 2,
            triggerX: [250, 400],
            repeat: false
        },
                    38: {
            type: "vertical",
            startY: 420,
            endY: 440,
            speed: 2,
            triggerX: [270, 400],
            repeat: false
        },
                    39: {
            type: "vertical",
            startY: 420,
            endY: 440,
            speed: 2,
            triggerX: [290, 400],
            repeat: false
        },
                        40: {
            type: "vertical",
            startY: 420,
            endY: 440,
            speed: 2,
            triggerX: [310, 400],
            repeat: false
        },
        41: {
            type: "vertical",
            startY: 420,
            endY: 440,
            speed: 2,
            triggerX: [330, 400],
            repeat: false
        },
        42: {
            type: "vertical",
            startY: 420,
            endY: 440,
            speed: 2,
            triggerX: [350, 400],
            repeat: false
        },
        43: {
            type: "vertical",
            startY: 420,
            endY: 440,
            speed: 2,
            triggerX: [370, 400],
            repeat: false
        },
        44: {
            type: "vertical",
            startY: 420,
            endY: 440,
            speed: 2,
            triggerX: [390, 400],
            repeat: false
        },
        45: {
            type: "vertical",
            startY: 420,
            endY: 440,
            speed: 2,
            triggerX: [410, 900],
            repeat: false
        },
        46: {
            type: "vertical",
            startY: 420,
            endY: 440,
            speed: 2,
            triggerX: [430, 900],
            repeat: false
        },
        47: {
            type: "vertical",
            startY: 420,
            endY: 440,
            speed: 2,
            triggerX: [450, 900],
            repeat: false
        },
        48: {
            type: "vertical",
            startY: 420,
            endY: 440,
            speed: 2,
            triggerX: [470, 900],
            repeat: false
        },
            49: {
            type: "vertical",
            startY: 420,
            endY: 440,
            speed: 2,
            triggerX: [1000, 1900],
            repeat: false
        },
                50: {
            type: "vertical",
            startY: 420,
            endY: 440,
            speed: 2,
            triggerX: [1100, 1900],
            repeat: false
        },
                    51: {
            type: "vertical",
            startY: 420,
            endY: 440,
            speed: 2,
            triggerX: [1300, 1900],
            repeat: false
        },
                        52: {
            type: "horizontal",
            startX: 1530,
            endX: 1570,
            speed: 4,
            triggerX: [1530, 1900],
            repeat: false
        },
                        53: {
            type: "horizontal",
            startX: 1550,
            endX: 1590,
            speed: 4,
            triggerX: [1530, 1900],
            repeat: false
        },
                            54: {
            type: "horizontal",
            startX: 1570,
            endX: 1610,
            speed: 4,
            triggerX: [1530, 1900],
            repeat: false
        },
                                    55: {
            type: "horizontal",
            startX: 100,
            endX: 40000,
            speed: 6,
            triggerX: [1750, 1900],
            repeat: false
        },   
                                    56: {
            type: "horizontal",
            startX: 100,
            endX: 40000,
            speed: 7.5,
            triggerX: [1850, 1900],
            repeat: false
        }, 
                                            57: {
            type: "vertical",
            startY: 530,
            endY: 690,
            speed: 1.5,
            triggerX: [3750, 4000],
            repeat: false
        }, 
                                            58: {
            type: "vertical",
            startY: 450,
            endY: 870,
            speed: 2.5,
            triggerX: [1500, 4000],
            repeat: false
        }, 
                         
    };
    const allPlatforms = document.querySelectorAll("[data-id]");

    let platformStates = [];

    // initialize
    allPlatforms.forEach(p => {

        const id = p.dataset.id;
        const config = platformConfigs[id];

        if(!config) return;

        platformStates.push({
            element: p,
            config: config,
            direction: 1,
            moving: false
        });

    });

    let isMenuOpen = false;
    let isGameOver = false;
    let isLevelComplete = false;

    let positionX = 100;
    let positionY = 500;
    let velocityY = 0;
    let gravity = 0.8;
    let isJumping = true;
    let gameRunning = true;

    let moveLeft = false;
    let moveRight = false;

    let cameraX = 0;
    let animationId;

    const playerWidth = 40;
    const playerHeight = 80;


    function update(){

        if(!gameRunning) return;

        // Gravity
        velocityY += gravity;
        positionY -= velocityY;

        // Horizontal movement
        if(moveLeft) positionX -= 6;
        if(moveRight) positionX += 6;

        // PLATFORM COLLISION
        platforms.forEach(platform => {

            const pLeft = platform.offsetLeft;
            const pBottom = parseInt(window.getComputedStyle(platform).bottom);
            const pWidth = platform.offsetWidth;
            const pHeight = platform.offsetHeight;

            const pRight = pLeft + pWidth;
            const pTop = pBottom + pHeight;

            const playerRight = positionX + playerWidth;
            const playerTop = positionY + playerHeight;

            if (
                playerRight > pLeft &&
                positionX < pRight &&
                playerTop > pBottom &&
                positionY < pTop
            ) {

                const overlapLeft = playerRight - pLeft;
                const overlapRight = pRight - positionX;
                const overlapTop = pTop - positionY;
                const overlapBottom = playerTop - pBottom;

                const minOverlap = Math.min(overlapLeft, overlapRight, overlapTop, overlapBottom);

                if (minOverlap === overlapTop) {
                    positionY = pTop;
                    velocityY = 0;
                    isJumping = false;
                }
                else if (minOverlap === overlapBottom) {
                    positionY = pBottom - playerHeight;
                    velocityY = 0;
                }
                else if (minOverlap === overlapLeft) {
                    positionX = pLeft - playerWidth;
                }
                else if (minOverlap === overlapRight) {
                    positionX = pRight;
                }
            }
            platformStates.forEach(p => {

        const cfg = p.config;

        // Trigger check
        if(positionX > cfg.triggerX[0] && positionX < cfg.triggerX[1]){
            p.moving = true;
        }

        if(!p.moving) return;

        // HORIZONTAL
        if(cfg.type === "horizontal"){

            let left = p.element.offsetLeft;
            left += cfg.speed * p.direction;

            if(left >= cfg.endX){
                if(cfg.repeat){
                    p.direction = -1;
                }else{
                    left = cfg.endX;
                    p.moving = false;
                }
            }

            if(left <= cfg.startX){
                p.direction = 1;
            }

            p.element.style.left = left + "px";
        }
// Direction change
if (moveRight) {
    player.style.transform = "scaleX(-1)";
}

if (moveLeft) {
    player.style.transform = "scaleX(1)";
}
        // VERTICAL
        if(cfg.type === "vertical"){

            let bottom = parseInt(window.getComputedStyle(p.element).bottom);
            bottom += cfg.speed * p.direction;

            if(bottom >= cfg.endY){
                if(cfg.repeat){
                    p.direction = -1;
                }else{
                    bottom = cfg.endY;
                    p.moving = false;
                }
            }

            if(bottom <= cfg.startY){
                p.direction = 1;
            }

            p.element.style.bottom = bottom + "px";
        }

    });

        });
    // ===== SPIKE COLLISION =====
    spikes.forEach(spike => {

        const sLeft = spike.offsetLeft;
        const sBottom = parseInt(window.getComputedStyle(spike).bottom);
        const sWidth = spike.offsetWidth;
        const sHeight = spike.offsetHeight;

        if(
            positionX + playerWidth > sLeft &&
            positionX < sLeft + sWidth &&
            positionY + playerHeight > sBottom &&
            positionY < sBottom + sHeight
        ){
    gameRunning = false;
    isGameOver = true;
    document.getElementById("gameOverPopup").style.display = "flex";
    cancelAnimationFrame(animationId);

        }

    });

        // Game Over
        if(positionY < 0){
            gameRunning = false;
            document.getElementById("gameOverPopup").style.display = "flex";
            cancelAnimationFrame(animationId);
            return;
        }

        player.style.left = positionX + "px";
        player.style.bottom = positionY + "px";
    // ===== PLAYER ANIMATION =====

    // Remove old states
    player.classList.remove("walking", "jump", "fall");

    // WALK
    if ((moveLeft || moveRight) && !isJumping) {
        player.classList.add("walking");
    }

    // JUMP
    if (isJumping && velocityY < 0) {
        player.classList.add("jump");
    }

    // FALL
    if (isJumping && velocityY > 0) {
        player.classList.add("fall");
    }
    const maxCamera = gameArea.offsetWidth - 1400;

    cameraX = positionX - 400;

    if(cameraX < 0) cameraX = 0;
    if(cameraX > maxCamera) cameraX = maxCamera;

    gameArea.style.transform = `translateX(${-cameraX}px)`;

        checkDoor();

        animationId = requestAnimationFrame(update);
    }

    function checkDoor(){

        const dLeft = door.offsetLeft;
        const dBottom = parseInt(window.getComputedStyle(door).bottom);
        const dWidth = door.offsetWidth;
        const dHeight = door.offsetHeight;

        if(
            positionX + playerWidth > dLeft &&
            positionX < dLeft + dWidth &&
            positionY + playerHeight > dBottom &&
            positionY < dBottom + dHeight
        ){
    gameRunning = false;
    isLevelComplete = true;
    document.getElementById("levelCompletePopup").style.display = "flex";
    cancelAnimationFrame(animationId);

        }
    }
    document.addEventListener("keydown", function(e){

        // ENTER KEY
        if(e.key === "Enter"){

            if(isGameOver){
                location.reload();
            }

            if(isLevelComplete){
                document.getElementById("nextBtn").click();
            }

        }

    });
    document.addEventListener("keydown", function(e){

        if(e.key === "Escape"){
            toggleMenu();
        }

    });

    // Keyboard
    document.addEventListener("keydown", e=>{
        if(e.key === "ArrowRight") moveRight = true;
        if(e.key === "ArrowLeft") moveLeft = true;

        if(e.key === "ArrowUp" && !isJumping){
            velocityY = -15;
            isJumping = true;
        }
    if(e.key === "ArrowDown" && isJumping && velocityY < 0){
        let landingY = 0;
        platforms.forEach(platform => {
            const pLeft = platform.offsetLeft;
            const pRight = pLeft + platform.offsetWidth;
            const pBottom = parseInt(window.getComputedStyle(platform).bottom);
            if(positionX + playerWidth > pLeft && positionX < pRight){
                if(pBottom < positionY) landingY = Math.max(landingY, pBottom);
            }
        });

        const landingSpeed = 15;
        const landingInterval = setInterval(() => {
            if(positionY - landingSpeed > landingY){
                positionY -= landingSpeed;
            } else {
                positionY = landingY;
                velocityY = 0;
                isJumping = false;
                clearInterval(landingInterval);
            }
        }, 16);
    }

    });

    document.addEventListener("keyup", e=>{
        if(e.key === "ArrowRight") moveRight = false;
        if(e.key === "ArrowLeft") moveLeft = false;
    });
// ===== MULTI-TOUCH BUTTON HANDLERS =====

// LEFT
btnLeft.addEventListener("touchstart", e => { e.preventDefault(); moveLeft = true; }, {passive:false});
btnLeft.addEventListener("touchend", e => { e.preventDefault(); moveLeft = false; }, {passive:false});
btnLeft.addEventListener("mousedown", () => moveLeft = true);
btnLeft.addEventListener("mouseup", () => moveLeft = false);
btnLeft.addEventListener("mouseleave", () => moveLeft = false);
btnLeft.addEventListener("touchcancel", e => { e.preventDefault(); moveLeft = false; }, {passive:false});

// RIGHT
btnRight.addEventListener("touchstart", e => { e.preventDefault(); moveRight = true; }, {passive:false});
btnRight.addEventListener("touchend", e => { e.preventDefault(); moveRight = false; }, {passive:false});
btnRight.addEventListener("mousedown", () => moveRight = true);
btnRight.addEventListener("mouseup", () => moveRight = false);
btnRight.addEventListener("mouseleave", () => moveRight = false);
btnRight.addEventListener("touchcancel", e => { e.preventDefault(); moveRight = false; }, {passive:false});

// JUMP
btnJump.addEventListener("touchstart", e => { 
    e.preventDefault(); 
    if(!isJumping){ velocityY = -15; isJumping = true; } 
}, {passive:false});
btnJump.addEventListener("mousedown", e => { 
    if(!isJumping){ velocityY = -15; isJumping = true; } 
});

// DOWN
btnDown.addEventListener("touchstart", e => { 
    e.preventDefault(); 
    if(isJumping && velocityY < 0){
        let landingY = 0;
        platforms.forEach(p => {
            const pLeft = p.offsetLeft;
            const pRight = pLeft + p.offsetWidth;
            const pBottom = parseInt(window.getComputedStyle(p).bottom);
            if(positionX + playerWidth > pLeft && positionX < pRight){
                if(pBottom < positionY) landingY = Math.max(landingY, pBottom);
            }
        });
        const landingSpeed = 15;
        const interval = setInterval(() => {
            if(positionY - landingSpeed > landingY){
                positionY -= landingSpeed;
            } else {
                positionY = landingY;
                velocityY = 0;
                isJumping = false;
                clearInterval(interval);
            }
        }, 16);
    }
}, {passive:false});

btnDown.addEventListener("mousedown", e => { 
    if(isJumping && velocityY < 0){
        let landingY = 0;
        platforms.forEach(p => {
            const pLeft = p.offsetLeft;
            const pRight = pLeft + p.offsetWidth;
            const pBottom = parseInt(window.getComputedStyle(p).bottom);
            if(positionX + playerWidth > pLeft && positionX < pRight){
                if(pBottom < positionY) landingY = Math.max(landingY, pBottom);
            }
        });
        const landingSpeed = 15;
        const interval = setInterval(() => {
            if(positionY - landingSpeed > landingY){
                positionY -= landingSpeed;
            } else {
                positionY = landingY;
                velocityY = 0;
                isJumping = false;
                clearInterval(interval);
            }
        }, 16);
    }
});// ===== JUMP BUTTON (MULTI TOUCH FIX) =====
function jumpStart(e){
    e.preventDefault();
    if(!isJumping){
        velocityY = -15;
        isJumping = true;
    }
}

btnJump.addEventListener("touchstart", jumpStart, { passive:false });
btnJump.addEventListener("mousedown", jumpStart);


// ===== DOWN BUTTON (MULTI TOUCH FIX) =====
function downStart(e){
    e.preventDefault();

    if(isJumping && velocityY < 0){

        let landingY = 0;

        platforms.forEach(platform => {
            const pLeft = platform.offsetLeft;
            const pRight = pLeft + platform.offsetWidth;
            const pBottom = parseInt(window.getComputedStyle(platform).bottom);

            if(positionX + playerWidth > pLeft && positionX < pRight){
                if(pBottom < positionY) landingY = Math.max(landingY, pBottom);
            }
        });

        const landingSpeed = 15;

        const landingInterval = setInterval(() => {
            if(positionY - landingSpeed > landingY){
                positionY -= landingSpeed;
            } else {
                positionY = landingY;
                velocityY = 0;
                isJumping = false;
                clearInterval(landingInterval);
            }
        }, 16);
    }
}

btnDown.addEventListener("touchstart", downStart, { passive:false });
btnDown.addEventListener("mousedown", downStart);
    // Retry / Restart
    retryBtn.addEventListener("click", ()=> location.reload());
    restartBtn.addEventListener("click", ()=> location.reload());

    function toggleMenu(){

        if(isMenuOpen){
            // CLOSE MENU
            menuOverlay.style.display = "none";
            menuToggle.classList.remove("active");

            if(!isGameOver && !isLevelComplete){
                gameRunning = true;
                animationId = requestAnimationFrame(update);
            }

            isMenuOpen = false;

        }else{
            // OPEN MENU
            menuOverlay.style.display = "flex";
            menuToggle.classList.add("active");

            gameRunning = false;
            cancelAnimationFrame(animationId);

            isMenuOpen = true;
        }

    }
    menuToggle.addEventListener("click", ()=>{
        toggleMenu();
    });
    // Push dummy state
    history.pushState(null, null, location.href);

    window.addEventListener("popstate", function(){

        if(!isMenuOpen){
            toggleMenu();
            history.pushState(null, null, location.href);
        }else{
            toggleMenu();
        }

    });

    // Back
    backBtn.addEventListener("click", ()=>{
        window.location.href = "lv.html";
    });

    // Pause / Resume
    pauseBtn.addEventListener("click", ()=>{

        if(gameRunning){
            gameRunning = false;
            cancelAnimationFrame(animationId);
            pauseBtn.innerText = "Resume";
        }else{
            gameRunning = true;
            pauseBtn.innerText = "Pause";
            animationId = requestAnimationFrame(update);
        }

    });

    // Start game
    animationId = requestAnimationFrame(update);
    function scaleGame() {
        const wrapper = document.querySelector(".game-wrapper");
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        // 16:9 design ratio
        const scaleX = windowWidth / 2300;
        const scaleY = windowHeight / 1000;
        const scale = Math.min(scaleX, scaleY); // ratio maintain

        wrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;
    }

    // Load & Resize
    window.addEventListener("load", scaleGame);
    window.addEventListener("resize", scaleGame);
