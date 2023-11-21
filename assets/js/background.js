document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Draw grid
    const gridSize = 50;
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'white';

    for(let i=0; i<canvas.width; i+=gridSize) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, canvas.height);
    ctx.stroke();  
    }

    for(let j=0; j<canvas.height; j+=gridSize) {
    ctx.beginPath();  
    ctx.moveTo(0, j);
    ctx.lineTo(canvas.width, j);
    ctx.stroke();
    }

    // Track mouse position
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;  
    });

    // Perturb grid
    function perturbGrid() {
    
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    
    // Draw perturbation circles
    for(let i=0; i<canvas.width; i+=gridSize) {
        for(let j=0; j<canvas.height; j+=gridSize) {
        
        const dx = i - parseFloat(mouseX);
        const dy = j - parseFloat(mouseY);
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        const pert =  Math.abs(Math.sin(Math.abs(dist)/10))*50;
        
        ctx.beginPath();
        ctx.arc(i, j, pert, 0, Math.PI*2);
        ctx.fill();
        }
    }  
    
    requestAnimationFrame(perturbGrid);
    } 
    perturbGrid();
  });
  window.addEventListener('resize', perturbGrid);