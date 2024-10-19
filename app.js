// create 16 * 16 div for grid
function createGrid(num_square = 16) {
    const grid = document.createElement('div');
    grid.id = 'container';
    for (let i = 0; i < num_square; ++i) {
        const container = document.createElement('div');
        container.className = 'row';
        for (let j = 0; j < num_square; ++j) {
            const square = document.createElement('div');
            square.className = 'square';

            // style random color for each square interaction but just once
            square.addEventListener('mouseenter', (e) => {
                e.target.style.backgroundColor = `rgb(${random_color()}, ${random_color()}, ${random_color()})`;
                e.target.style.opacity = '0'; // set opacity to 0 at the beginning
            }, { once: true });

            square.addEventListener('mouseenter', darkenColor);

            container.appendChild(square);
        }

        grid.appendChild(container);
    }
    document.body.appendChild(grid);

    function random_color() {
        return Math.random() * 255;
    }

    // function to darken background-color of each interaction with square
    function darkenColor(e) {
        const value = parseFloat(e.target.style.opacity);
        if (value == 1) {
            // remove event if value of opacity is 1
            e.target.removeEventListener('mouseenter', darkenColor);
        } else {
            e.target.style.opacity = `${value + 0.1}`; // increase by 0.1 with each interaction.
        }
    }
}

let btn = document.querySelector('#number-square');
btn.addEventListener('click', () => {
    do {
        num_square = parseInt(prompt('How many squares per side for a new grid: ', 16));
        if (num_square > 100 || num_square < 1) {
            alert('The number of squares per side must between [1, 100]');
        }
    } while (num_square > 100 || num_square < 1);
    // remove grid every time button clicked 
    document.querySelector('#container').remove();
    // create new grid with num_square value
    createGrid(num_square);
})

// Set to default after page reload
window.addEventListener('load', createGrid(num_square = 16));