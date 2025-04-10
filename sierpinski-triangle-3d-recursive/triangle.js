var positions = [];
var colors = [];

const RED = vec4(1, 0, 0, 1);
const GREEN = vec4(0, 1, 0, 1);
const BLUE = vec4(0, 0, 1, 1);
const BLACK = vec4(0, 0, 0, 1);

var a = vec3(-1, -1, 1);
var b = vec3(1, -1, 1);
var c = vec3(0, 1, 0);
var d = vec3(0, 0, -1);

function triangleRecursive(a, b, c, d, n) {
    if (n == 0) {
        addTriangle(a, b, c, RED);
        addTriangle(b, d, c, GREEN);
        addTriangle(d, a, c, BLUE);
        addTriangle(a, b, d, BLACK);
    } else {
        let ab = mix(a, b, 0.5);
        let ac = mix(a, c, 0.5);
        let ad = mix(a, d, 0.5);
        let bc = mix(b, c, 0.5);
        let bd = mix(b, d, 0.5);
        let dc = mix(d, c, 0.5);


        triangleRecursive(a, ab, ac, ad, n - 1);
        triangleRecursive(b, ab, bc, bd, n - 1);
        triangleRecursive(c, ac, bc, dc, n - 1);

        triangleRecursive(b, ab, bc, bd, n - 1);
        triangleRecursive(c, ac, bc, dc, n - 1);
        triangleRecursive(d, ad, bd, dc, n - 1);

        triangleRecursive(a, ab, ac, ad, n - 1);
        triangleRecursive(c, bc, ac, dc, n - 1);
        triangleRecursive(d, ad, bd, dc, n - 1);

        triangleRecursive(a, ab, ad, ac, n - 1);
        triangleRecursive(b, ab, bc, bd, n - 1);
        triangleRecursive(d, ad, bd, dc, n - 1);
    }
}

function addTriangle(a, b, c, color) {
    positions.push(a);
    positions.push(b);
    positions.push(c);
    colors.push(color);
    colors.push(color);
    colors.push(color);
}

function getSierpinski(n) {
    triangleRecursive(a, b, c, d, n);
    return positions;
}

function getColors() {
    return colors;
}