"use strict"
var gl;
var vertices = getVertices();
var indices = getIndices(vertices);
var colors = getColors();

var modelViewMatrixLoc;
var theta = [0, 0, 0];
var rotateStatus = [false, false, false];
const scaleCube = document.getElementById("scale");
const translateX = document.getElementById("translateX");
const translateY = document.getElementById("translateY");

document.getElementById("buttonX")
    .addEventListener("click", () => rotateStatus[0] = !rotateStatus[0]);

document.getElementById("buttonY")
    .addEventListener("click", () => rotateStatus[1] = !rotateStatus[1]);

document.getElementById("buttonZ")
    .addEventListener("click", () => rotateStatus[2] = !rotateStatus[2]);

init();

function init() {
    var canvas = document.getElementById("gl-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) alert("WebGL 2.0 isn't available");

    gl.viewport(0, 0, canvas.clientWidth, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    gl.enable(gl.DEPTH_TEST);

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    var Cbuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, Cbuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);

    var iBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW)

    modelViewMatrixLoc = gl.getUniformLocation(program, "uModelViewMatrix");

    render();
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var modelViewMatrix = mat4();

    for (let i = 0; i <= 2; i++)
        if (rotateStatus[i])
            theta[i] += 2;

    modelViewMatrix = mult(modelViewMatrix, scale(scaleCube.value, scaleCube.value, scaleCube.value));
    
    modelViewMatrix = mult(modelViewMatrix, translate(translateX.value, translateY.value, 1));

    modelViewMatrix = mult(modelViewMatrix, rotateX(theta[0]));
    modelViewMatrix = mult(modelViewMatrix, rotateY(theta[1]));
    modelViewMatrix = mult(modelViewMatrix, rotateZ(theta[2]));

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    gl.drawElements(gl.TRIANGLE_FAN, indices.length, gl.UNSIGNED_BYTE, 0);
    requestAnimationFrame(render);
}