let mouseX = 0;
let mouseY = 0;

// Canvas and animation
let canvas;
let ctx;
const animation = () => {

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw background grid
  drawGrid();
  
  // Perturb grid
  perturbGrid();

  requestAnimationFrame(animation);
}
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 
  }
  function drawGrid() {

    // Draw white grid lines
    ctx.strokeStyle = 'rgba(255,255,255, 0.1)';
    
    ctx.beginPath();
    
    for(let i=0; i<canvas.width; i+=50) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
    }
    
    for(let j=0; j<canvas.height; j+=50) {
      ctx.moveTo(0, j);
      ctx.lineTo(canvas.width, j);
    }
    
    ctx.stroke();  
  }
  
  // Perturb grid
  function perturbGrid() {
   
    // Draw perturbation circles  
    ctx.fillStyle = 'rgba(0,0,0,0.07)';
    
    for(let i=0; i<canvas.width; i+=50) {
      for(let j=0; j<canvas.height; j+=50) {
      
        let dx = i - mouseX;
        let dy = j - mouseY;
        let dist = Math.sqrt(dx*dx + dy*dy);
      
        let pert = Math.abs(Math.sin(dist/30))*30;
        
        ctx.beginPath();
        ctx.arc(i, j, pert, 0, Math.PI*2);
        ctx.fill();
      }
    }
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