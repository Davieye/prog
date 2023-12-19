¨

<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        .pixel {
          background-color: white;
            width: 20px;
            height: 20px;
            border: 2px solid #ddd;
            float: left;
        }
        .row::after {
            content: "";
            display: table;
            clear: both;
        }
        #colorPalette {
            position: absolute;
            right: 0;
            top: 0;
            padding: 10px;
        }
        .color {
            width: 20px;
            height: 20px;
            display: inline-block;
            cursor: pointer;
        }
        #eraseButton {
            display: block;
            margin-top: 10px;
            padding: 5px;
            cursor: pointer;
            background-color: #ddd;
            text-align: center;
        }
        #saveButton, #loadButton {
            display: block;
            margin-top: 10px;
            padding: 5px;
            cursor: pointer;
            background-color: #ddd;
            text-align: center;
        }
        body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #808080;
}
    </style>
</head>
<body>
    <div id="pixelCanvas"></div>
    <div id="colorPalette">
        <div class="color" style="background-color: red;"></div>
        <div class="color" style="background-color: green;"></div>
        <div class="color" style="background-color: blue;"></div>
        <div class="color" style="background-color: black;"></div>
        <div class="color" style="background-color: purple;"></div>
        <div class="color" style="background-color: cyan;"></div>
        <div class="color" style="background-color: brown;"></div>
        <div class="color" style="background-color: grey;"></div>
        <!-- Add more colors as needed -->
        <div id="eraseButton">Erase</div>
        <div id="saveButton" class="button">Save</div>
        <div id="loadButton" class="button">Load</div>
    </div>

    <script>
        const pixelCanvas = document.getElementById('pixelCanvas');
        const saveButton = document.getElementById('saveButton');
        const loadButton = document.getElementById('loadButton');

saveButton.addEventListener('click', () => {
  const pixelColors = Array.from(pixelCanvas.getElementsByClassName('pixel')).map(pixel => pixel.style.backgroundColor);
    localStorage.setItem('pixelArt', JSON.stringify(pixelColors));
});

loadButton.addEventListener('click', () => {
  const pixelColors = JSON.parse(localStorage.getItem('pixelArt'));
  if (pixelColors) {
    Array.from(pixelCanvas.getElementsByClassName('pixel')).forEach((pixel, index) => {
      pixel.style.backgroundColor = pixelColors[index];
    });
  }     
});
        const colorPalette = document.getElementById('colorPalette');
        const rows = 16;
        const cols = 16;
        let currentColor = 'black';

        // Create the pixel grid
        for (let i = 0; i < rows; i++) {
            const row = document.createElement('div');
            row.className = 'row';
            for (let j = 0; j < cols; j++) {
                const pixel = document.createElement('div');
                pixel.className = 'pixel';
                row.appendChild(pixel);
            }
            pixelCanvas.appendChild(row);
        }

        // Add event listeners for drawing
        let isDrawing = false;
        pixelCanvas.addEventListener('mousedown', () => isDrawing = true);
        pixelCanvas.addEventListener('mouseup', () => isDrawing = false);
        pixelCanvas.addEventListener('mouseover', (event) => {
            if (isDrawing && event.target.classList.contains('pixel')) {
                event.target.style.backgroundColor = currentColor;
            }
        });

        // Add event listeners for color palette
        colorPalette.addEventListener('click', (event) => {
            if (event.target.classList.contains('color')) {
                currentColor = getComputedStyle(event.target).backgroundColor;
            } else if (event.target.id === 'eraseButton') {
                currentColor = 'white'; // or 'transparent', depending on your canvas background color
            }
        });
    </script>
</body>
</html>