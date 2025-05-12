const BLUE = vec4(0, 0, 1, 1);
const CYAN = vec4(0, 1, 1, 1);
const WHITE = vec4(1, 1, 1, 1);
const MAGENTA = vec4(1, 0, 1, 1);
const BLACK = vec4(0, 0, 0, 1);
const GREEN = vec4(0, 1, 0, 1);
const YELLOW = vec4(1, 1, 0, 1);
const RED = vec4(1, 0, 0, 1);

function getColors() {
    return [
        BLUE,
        CYAN,
        WHITE,
        MAGENTA,
        BLACK,
        GREEN,
        YELLOW,
        RED
    ];
}

function getVertices() {
    return [
        vec3(-0.5, -0.5, 0.5),
        vec3(-0.5, 0.5, 0.5),
        vec3(0.5, 0.5, 0.5),
        vec3(0.5, -0.5, 0.5),
        vec3(-0.5, -0.5, -0.5),
        vec3(-0.5, 0.5, -0.5),
        vec3(0.5, 0.5, -0.5),
        vec3(0.5, -0.5, -0.5)
    ];
}

function getIndices() {
    return [
        0, 3, 2, 1, 255,
        4, 7, 3, 0, 255,
        3, 7, 6, 2, 255,
        6, 7, 4, 5, 255,
        1, 2, 6, 5, 255,
        5, 4, 0, 1
    ]
}