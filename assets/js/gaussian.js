
let canvas;
let ctx;

document.addEventListener('DOMContentLoaded', function () {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    let mouseX = 0;
    let mean = { x: 0, y: 0 };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      updateMean();
    });

    function updateMean() {
      // You may want to adjust the scaling factor based on the size of your canvas
      const jitterAmount = 0.02; // Adjust this value to control the amount of jitter
      mean.x = mouseX / canvas.width + (Math.random() * 2 - 1) * jitterAmount;
      mean.y = 0.5; // You can adjust this value based on your design

      // Clear the canvas and draw the Gaussian distribution with the updated mean
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGaussian();
    }

    function drawGaussian() {
      const amplitude = 50; // You can adjust this value based on your design
      const sigma = 0.1; // You can adjust this value based on your design

      ctx.beginPath();

      for (let x = 0; x < canvas.width; x++) {
        const y = amplitude * Math.exp(-0.5 * Math.pow((x / canvas.width - mean.x) / sigma, 2)) + mean.y * canvas.height;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'; // Adjust the color and opacity based on your design
      ctx.stroke();
    }

    // Initial draw
    updateMean();
  });