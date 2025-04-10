var positions = [];
var a = vec2(-1, -1);
var b = vec2(1, -1);
var c = vec2(0, 1);

function triangleRecursive(a, b, c, n) {
    if (n == 0) {
        positions.push(a);
        positions.push(b);
        positions.push(c);
    } else {
        let ab = mix(a, b, 0.5);
        let bc = mix(b, c, 0.5);
        let ac = mix(a, c, 0.5);
        triangleRecursive(a, ab, ac, n - 1);
        triangleRecursive(ab, b, bc, n - 1);
        triangleRecursive(ac, bc, c, n - 1);
    }
}

function getSierpinski(n){
    triangleRecursive(a, b, c, n);
    return positions;
}