const cols = document.querySelectorAll('.col');

document.addEventListener("DOMContentLoaded", () => {
  setRandomColors();
});

document.addEventListener('keydown', (event) =>{
  event.preventDefault();
  if (event.code.toLowerCase() === 'space') {
    setRandomColors(true);
  }
});

document.addEventListener('click', (event) => {
  const type = event.target.dataset.type;
  if (type === 'lock') {
    const node = event.target.tagName.toLowerCase() === 'i' ? event.target : event.target.children[0];
    node.classList.toggle('fa-lock-open');
    node.classList.toggle('fa-lock');
  } else if (type === 'copy') {
    copyToClickborad(event.target.textContent);
    alert('Text copy');
  }
});

function generateRandomColor () {
  let color = '';
  const hexCodes = '012345678ABCDF';
  for (let i = 0; i < 6; i++) {
   color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
  }
  return '#' + color;
}

function copyToClickborad (text) {
  navigator.clipboard.writeText(text);
}

function setRandomColors () {
cols.forEach((col)=> {
    const isLocked = col.querySelector('i')
    .classList.contains('fa-lock');
    if (isLocked) {
      return;
    }

    // const color = generateRandomColor();
   
     const color = chroma.random();
     
    const text = col.querySelector('h2');
    const button = col.querySelector('button');
    
    text.textContent = color;
    col.style.background = color;

    setTextColor(text, color);
    setTextColor(button, color);
  });    
};


function updateColorsHash(colors = []) {
  document.location.hash = colors 
  .map((col) => {
    return col.toString().substring(1);
  }).join('-');
}

function getColorsFromHash () {
  if (document.location.hash.length < 1) {
    return document.location.hash
    .substring(1)
    .split('-')
    .map(color => '#' + color);
  } 
    return [];
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? '#000' : '#fff';
}
