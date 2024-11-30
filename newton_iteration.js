const readline =  require("readline");


// Function to parse a polynomial string and return coeffients
function parsePolynomial(polyStr) {
    const terms = polyStr
                  .replace(/\s+/g, "") // Remove whitespace
                  .replace(/([-+])/g, " $1") // Ensure terms are space-separated
                  .split(" ") // Split into terms
                  .filter(Boolean);

    const coefficients = {};
    terms.forEach((term) => {
        const match = term.match(/([+-]?\d*\.?\d*)x\^?(\d*)/);
        if (match) {
            const coeff = parseFloat(match[1]) || (match[1] === "-" ? -1 : 1);
            const exp = parseInt(match[2]) || (term.includes("x") ? 1 : 0);
            coefficients[exp] = (coefficients[exp] || 0) + coeff;
        } else {
            coefficients[0] = (coefficients[0] || 0) + parseFloat(term);
        }
    });

    return coefficients;
}

// Function to evaluate polynomial at a specific x
function evaluatePolynomial(coefficients, x) {
    return Object.entries(coefficients).reduce((sum, [exp, coeff]) => sum + coeff * Math.pow(x, exp), 0);
}

// Function to calculate the derivative of a polynomial
function derivative(coefficients) {
    const derived = {};
    for (const [exp, coeff] of Object.entries(coefficients)) {
        const expNum = parseInt(exp);
        if (expNum > 0) {
            derived[ expNum - 1 ] = expNum * coeff;
        }
    }
    return derived;
}

// Newton's method to find roots
function newtonMethod (coefficients, initialGuess, tolerance = 1e-7, maxIteration = 100) {
    const func = (x) => evaluatePolynomial(coefficients, x);
    const deriv = derivative(coefficients);

    let x = initialGuess;
    for (let i = 0; i < maxIteration; i++) {
        const fx = func(x);
        const fPrimeX = evaluatePolynomial(deriv, x);

        if (Math.abs(fPrimeX) < tolerance) return null;

        const xNext =  x - fx / fPrimeX;
        if (Math.abs(xNext - x) < tolerance) return xNext;
        x = xNext;
    }

    return null; // Convergence not achieved
}

// Find and count roots
function findRoots (polyStr, range = [-10, 10], step = 0.5) {
    const coefficients = parsePolynomial(polyStr);
    const roots = new Set();

    for (let x = range[0] ; x <= range[1]; x += step) {
        const root = newtonMethod(coefficients, x);

        if (root !== null) {
            const roundedRoot = Math.round(root * 1e7) / 1e7;
            roots.add(roundedRoot);
        }
    }
    return [...roots];
}

// Main program
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Enter a polynomial equation (e.g., x^3 - 6x^2 + 11x - 6)\n", (polynomial) => {
    try {
        const roots = findRoots(polynomial);

        if(roots.length > 0) {
            console.log(`The polynomial has ${roots.length} root(s): ${roots.join(", ")}`);
        } else {
            console.log("No roots found in the given range.");
        }
    } catch (err) {
        console.log("Error parsing the polynomial. Please check your input format.");
    } finally {
        rl.close();
    }
});