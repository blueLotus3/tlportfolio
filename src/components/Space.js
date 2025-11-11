import React, { useRef, useEffect } from "react";

const Space = () => {
    // references <canvas> element
  const canvasRef = useRef(null);

  useEffect(() => {
      // gets canvas and 2d frames
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Makes canvas fill whole browser window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Arrays to store our different "objects" in space
    let particlesArray = []; // stars
    let shootingStars = []; // rare shooting star streak

    // Used to time when new shooting stars appear
    let shootingStarTimer = 0;

    // Drift vars for parallax camera movement
    let driftX = 0;
    let driftY = 0;
    const driftSpeed = 0.005; // = slower camera motion

    // Star Particle class
    class Particle {
      constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
      }

      // Draws one glowing star
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);

        // Random opacity of each frame for "twinkle" effect
        const twinkle = Math.random() * 0.5 + 0.5;
        ctx.globalAlpha = twinkle;

        // Add soft glow around each star
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;


        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

        // Resets transparency for next draw
        ctx.globalAlpha = 1;
      }

      // updates position and calls draw()
      update() {
        // Bounces off screen edges
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;

        // small drifting motion
        this.x += this.directionX * (this.size * 0.3);
        this.y += this.directionY * (this.size * 0.3);
        this.draw();
      }
    }

    // shooting star class
    class ShootingStar {
      constructor() {
        this.reset();
      }

    // Reset sets new position, speed, and lifetime
      reset() {
        this.x = Math.random() * canvas.width * 0.3; // start near top-left
        this.y = Math.random() * canvas.height * 0.2; 
        this.length = Math.random() * 150 + 100;    // streak length
        this.speed = Math.random() * 6 + 4;         // movement speed
        this.angle = Math.PI / 4;                   // diagonal path
        this.opacity = Math.random() * 0.3 + 0.3;   // faint brightness
        this.life = 0;      
        this.maxLife = 80 + Math.random() * 40;     // how long it lasts
      }

    // draws line streak
      draw() {
        const tailX = this.x - this.length * Math.cos(this.angle);
        const tailY = this.y - this.length * Math.sin(this.angle);

        // Gradient fade from bright head to transparent tail
        const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255,255,255,${this.opacity})`);
        gradient.addColorStop(1, `rgba(255,255,255,0)`);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 20;
        ctx.shadowColor = "white";
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
      }

      // Move shooting star and fade it away
      update() {
        this.x += this.speed;
        this.y += this.speed;
        this.life++;

        // Reset after it finishes its life or leaves the screen
        if (this.life > this.maxLife || this.x > canvas.width || this.y > canvas.height) {
          this.reset();
        }
        this.draw();
      }
    }

    // intilazes stars
    const init = () => {
      particlesArray = [];
    
      // Number of stars depends on screen 
      const numberOfStars = (canvas.height * canvas.width) / 9000;
      const colors = ["#ffffff", "#ffe9c4", "#d4fbff"];

      // create random stars
      for (let i = 0; i < numberOfStars; i++) {
        const size = Math.random() * 1.5 + 0.5;
        const x = Math.random() * (window.innerWidth - size * 2);
        const y = Math.random() * (window.innerHeight - size * 2);
        const directionX = Math.random() * 0.5 - 0.25;
        const directionY = Math.random() * 0.5 - 0.25;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    };

    // draws background "glow"
    const drawSpaceBackground = () => {
        // slowly moves the background to create parallax drift
      driftX += driftSpeed;
      driftY += driftSpeed * 0.6;

      // Radial gradient that drifts slightly over time
      const gradient = ctx.createRadialGradient(
        canvas.width / 2 + Math.sin(driftX) * 200,
        canvas.height / 2 + Math.sin(driftY) * 100,
        canvas.width * 0.1,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.7
      );

      // dark to darker shades for subtle nebula look
      gradient.addColorStop(0, "rgba(60,70,110,0.6)");
      gradient.addColorStop(0.4, "rgba(15,15,35,0.8)");
      gradient.addColorStop(1, "rgba(0,0,10,1)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

        // animation loop
    const animate = () => {
        // clear canvas before each frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // redraws moving background
      drawSpaceBackground();

      // Update and draw all regular stars
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }

      // occasionally spawns a shooting star
      shootingStarTimer++;
      if (shootingStarTimer % 900 === 0) {
        shootingStars.push(new ShootingStar());
      }

      // updates all active shooting stars
      for (let i = 0; i < shootingStars.length; i++) {
        shootingStars[i].update();
      }

      // update all active shooting stars
      if (shootingStars.length > 3) {
        shootingStars.splice(0, 1);
      }

      // requests next frame
      requestAnimationFrame(animate);
    };

    init();
    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      init();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="canvasRef" />
 
};

export default Space;
