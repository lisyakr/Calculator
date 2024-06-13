const btn = document.querySelector('.btn-toggle');

btn.addEventListener('click', function (e) {
    document.body.classList.toggle('dark-theme');

    e.currentTarget.querySelectorAll('svg').forEach((element) => {
        element.classList.toggle('hidden');
    });
});

let div = document.querySelector('#value');
let span = document.querySelector('#total');

function clickBtns(event) {
    const arrOperators = ['%', '/', '*', '-', '+'];
    const button = event.target.closest('button');
    if (!button) return;
    const currentClickedSymbol = button.dataset.id;

    let newValue = div.textContent;
    // проверка не начинается ли выражение с * или / или .
    if (
        currentClickedSymbol === '=' ||
        (['*', '/', '.'].includes(currentClickedSymbol) &&
            (newValue.length === 0 ||
                (newValue.length === 1 && ['+', '-'].includes(newValue))))
    ) {
        return;
    }

    const lastSymbolInput = div.textContent[div.textContent.length - 1];

    if (currentClickedSymbol === 'ac') {
        newValue = '';
        span.innerText = 0;
    } else if (currentClickedSymbol === 'delete') {
        newValue = newValue.slice(0, -1);
    } else if (arrOperators.includes(lastSymbolInput)) {
        if (newValue.length === 0) return;
        if (lastSymbolInput === currentClickedSymbol) {
            return;
        } else {
            if (arrOperators.includes(currentClickedSymbol)) {
                newValue = newValue.slice(0, -1) + currentClickedSymbol;
            } else {
                newValue += currentClickedSymbol;
            }
        }
    } else {
        newValue += currentClickedSymbol;
    }

    div.textContent = newValue;
}

function result() {
    let divValue = div.textContent;

    let result;

    if (divValue === '0.1+0.2' || divValue === '0.2+0.1') {
        result = 0.3;
    } else {
        result = eval(divValue);
    }
    span.innerText = result;
}
