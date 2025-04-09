var positions = [];
var vertex = getTriangle();

function sierpinski(n) {
    positions.push(getInitialPoint());

    for (let i = 0; i < n - 1; i++) positions.push(getNewPoint());

    return positions;
}

function getTriangle() {
    let triangle = [];

    do {
        triangle = [
            getRandomVertex(),
            getRandomVertex(),
            getRandomVertex(),
        ];
    } while (!isTriangle(triangle));

    return triangle;
}

function getRandomVertex() {
    return vec2(Math.random() * 2 - 1, Math.random() * 2 - 1);
}

function getInitialPoint() {
    let u = mult(0.5, add(vertex[0], vertex[1]));
    let v = mult(0.5, add(vertex[0], vertex[2]));
    return mult(0.5, add(u, v));
}

function getNewPoint() {
    let i = positions.length - 1;
    let j = Math.floor(Math.random() * 3);
    return mult(0.5, add(positions[i], vertex[j]));
}

function isTriangle(triangle) {
    let a = triangle[0];
    let b = triangle[1];
    let c = triangle[2];

    let ab = vec2(b[0] - a[0], b[1] - a[1]);
    let ac = vec2(c[0] - a[0], c[1] - a[1]);

    let crossProduct = ab[0] * ac[1] - ab[1] * ac[0];

    return crossProduct !== 0;
}