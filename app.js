// create grid
function createGrid(num_square = 16, feature = 'square reset') {
    const grid = document.querySelector('#container');
    for (let i = 0; i < num_square; ++i) {
        const container = document.createElement('div');
        container.className = 'row';
        for (let j = 0; j < num_square; ++j) {
            const square = document.createElement('div');
            square.className = feature;
            container.appendChild(square);
        }
        grid.appendChild(container);
    }
    document.querySelector('#grid-size').textContent = `Grid size: ${num_square}x${num_square}`;
    addEventListeners();
}

// Add event listeners after the grid is created
function addEventListeners() {
    const squares = document.querySelectorAll('.square');
    const random_btn = document.querySelector('#random-color');
    const darkening_btn = document.querySelector('#darkening');
    const reset_btn = document.querySelector('#reset');

    random_btn.addEventListener('click', () => {
        darkening_btn.style.cssText = '#darkening {background-color: initial} #darkening:hover {background-color: bisque}';
        if (squares[0].classList.contains('random-btn')) {
            squares.forEach(square => {
                square.className = 'square reset';
            });
            random_btn.style.cssText = '#random-color {background-color: initial} #random-color:hover {background-color: bisque}';
        } else {
            random_btn.style.backgroundColor = 'bisque';
            squares.forEach(square => {
                square.className = 'square random-color';
            });
        }
    });

    darkening_btn.addEventListener('click', () => {
        random_btn.style.cssText = '#random-color {background-color: initial} #random-color:hover {background-color: bisque}';
        if (squares[0].classList.contains('darkening')) {
            squares.forEach(square => {
                square.className = 'square reset';
            });
            darkening_btn.style.cssText = '#darkening {background-color: initial} #darkening:hover {background-color: bisque}';
        } else {
            darkening_btn.style.backgroundColor = 'bisque';
            squares.forEach(square => {
                square.className = 'square darkening';
            });
        }
    });

    reset_btn.addEventListener('click', () => {
        random_btn.style.cssText = '#random-color {background-color: initial} #random-color:hover {background-color: bisque}';
        darkening_btn.style.cssText = '#darkening {background-color: initial} #darkening:hover {background-color: bisque}';
        squares.forEach(square => {
            square.className = 'square reset';
        });
    });

    // Attach event listeners for the squares only once
    squares.forEach(square => {
        square.addEventListener('mouseenter', (e) => {
            if (square.classList.contains('random-color')) {
                e.target.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
                e.target.style.opacity = 'unset';
            } else if (square.classList.contains('darkening')) {
                e.target.style.backgroundColor = 'black';
                const value = parseFloat(e.target.style.opacity) || 0;
                if (value < 1) {
                    e.target.style.opacity = `${value + 0.1}`;
                }
            } else {
                e.target.style.backgroundColor = '#71C9CE';
                e.target.style.opacity = 'unset';
            }
        });
    });
}

// Set to default after page reload
window.addEventListener('load', () => {
    let num_square = 16;
    createGrid(num_square);
    let change_grid = document.querySelector('#change-grid');
    change_grid.addEventListener('click', () => {
        do {
            num_square = parseInt(prompt('How many squares per side for a new grid: ', 16));
            if (num_square > 100 || num_square < 1 || isNaN(num_square)) {
                alert('The number of squares per side must be between [1, 100]');
            }
        } while (num_square > 100 || num_square < 1 || isNaN(num_square));

        const old_feature = document.querySelector('.square').className;
        
        const rows = document.querySelectorAll('.row');
        rows.forEach(row => row.remove());
        createGrid(num_square, old_feature);
    });
});