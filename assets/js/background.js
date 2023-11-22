let mouseX = 0;
let mouseY = 0;

// Canvas and animation
let canvas;
let ctx;
const animation = () => {

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Perturb grid
  perturbGrid();

  requestAnimationFrame(animation);
}
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 
  }
  
  // Perturb grid
  function perturbGrid() {
    // Draw perturbation circles  
   // const gradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 100);

    // Add grey color stops
   // gradient.addColorStop(0, 'white');
   // gradient.addColorStop(0.5, 'grey');
   // gradient.addColorStop(1, 'black');  

  // Set fill style to gradient
     ctx.fillStyle = "rgba(255, 255, 255, 0.05)";

    let maxValue = 0;
    let maxX = 0;
    let maxY = 0;
    let meanX = 0; 
    let meanY = 0;
    const stdDev = 50;
    
    for(let i = 0; i < canvas.width; i++) {
        for(let j = 0; j < canvas.height; j++) {
        
          // Calculate gaussian for pixel
            const dx = i - meanX;
            const dy = j - meanY;
            const dist = Math.sqrt(dx*dx + dy*dy);  
            const gaussian = Math.exp(-(dist*dist)/(2*stdDev*stdDev));
          
          // Check if new max
          if(gaussian > maxValue) {
            maxValue = gaussian;
            maxX = i; 
            maxY = j;
          }
        }
      }
      ctx.beginPath();
    ctx.moveTo(maxX, 0);
    ctx.lineTo(maxX, canvas.height); 
    ctx.strokeStyle = "white";
    ctx.stroke();
    }
// Initialize 
document.addEventListener('DOMContentLoaded', () => {

    // Get canvas
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    // Set size to window
    resizeCanvas();

    // Start animation
    animation();

    // Mouse Move listener  
    window.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;  
        mouseY = event.clientY;
    });

    // Resize listener
    window.addEventListener('resize', resizeCanvas);

});