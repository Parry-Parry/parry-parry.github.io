
let pageWidth = document.body.clientWidth;
let pageHeight = document.body.clientHeight;
const gaussWidth = 200;
const gaussHeight = 40;

// Draw center white line
let line = document.createElement("div");
line.style.position = "absolute";   
line.style.width = "2px";
line.style.height = pageHeight+"px";
line.style.left = pageWidth/2+"px";
line.style.backgroundColor = "black";
document.body.appendChild(line);

// Gaussians parameters  
gauss1 = document.createElement("div");
gauss1.style.width = "2px";
gauss1.style.height = pageHeight+"px"  
gauss1.style.backgroundColor = "white";
gauss1.style.position = "absolute";

gauss2 = document.createElement("div"); 
gauss2.style.width = "2px";
gauss2.style.height = pageHeight+"px"   
gauss2.style.backgroundColor = "black";
gauss2.style.position = "absolute";
let cursorX;



function drawGaussians() {

// Calculate dynamic means
let meanOffset = 200; // Max offset

let center = pageWidth/2;  
let cursorDistFromCenter = Math.abs(center - cursorX);  

// Map offset 0 to 200 based on distance
let offsetFactor =  (cursorDistFromCenter / (center)) * meanOffset;

mean1 = cursorX - offsetFactor;
mean2 = cursorX + offsetFactor;

gauss1.style.left = mean1+"px"; 
gauss1.style.top = pageHeight/2+"px";

// Position gauss2
gauss2.style.left = mean2+"px";
gauss2.style.top = pageHeight/2+"px";  
// Calculate means and overlap  
let overlap = Math.abs(mean1 - mean2) < (gaussWidth/2);

if(overlap) {
    
    // Draw a single wider gaussian
    gauss1.style.width = (gaussWidth * 2) + "px";
    gauss1.style.left = Math.min(mean1, mean2) + "px";

    // Create wider fill 
    // Hide second gaussian 
    gauss2.style.visibility = "hidden"; 

} else {

    // Draw two separate  
    gauss1.style.width = gaussWidth+"px";     
    gauss2.style.visibility = "visible";

}

    gauss1.style.left = mean1+"px";
    gauss1.style.top = "0px"; 
    gauss2.style.left = mean2+"px";
    gauss2.style.top = "0px";
}
// Mouse move handler
document.addEventListener("mousemove", e => {
cursorX = e.pageX;
drawGaussians();  
});

// Initially draw gaussians 
drawGaussians();