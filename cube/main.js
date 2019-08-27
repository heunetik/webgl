document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.querySelector("#glcanvas");
    const gl = canvas.getContext("webgl");

    if (!gl) {
        alert("Unable to initialize WebGL. Your browser or machine may not support it.");
        return;
    }

    const vertexShader = loadShader(gl, vertexSource, gl.VERTEX_SHADER);
    const fragmentShader = loadShader(gl, fragmentSource, gl.FRAGMENT_SHADER);
    const program = createProgramWithShaders(gl, vertexShader, fragmentShader);


    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, cube, gl.STATIC_DRAW);

    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.frontFace(gl.CW);

    gl.enable(gl.DEPTH_TEST);

    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    const positionLocation = gl.getAttribLocation(program, "cPos");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 4, gl.FLOAT, false, 0, 0);

    const colorLocation = gl.getAttribLocation(program, "cColor");
    gl.enableVertexAttribArray(colorLocation);
    gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 576);

    const frustumScaleUnif = gl.getUniformLocation(program, "frustumScale");
    const zNearUnif = gl.getUniformLocation(program, "zNear");
    const zFarUnif = gl.getUniformLocation(program, "zFar");

    gl.uniform1f(frustumScaleUnif, 1.0);
    gl.uniform1f(zNearUnif, 1.0);
    gl.uniform1f(zFarUnif, 3.0);

    gl.drawArrays(gl.TRIANGLES, 0, 36);
});

// vertices cordinates & colors of a cube
const cube = new Float32Array([
    0.5,  0.5, 0.5, 1.0,
    0.5, -0.5, 0.5, 1.0,
   -0.5,  0.5, 0.5, 1.0,

    0.5, -0.5, 0.5, 1.0,
   -0.5, -0.5, 0.5, 1.0,
   -0.5,  0.5, 0.5, 1.0,

    0.5,  0.5, -0.5, 1.0,
   -0.5,  0.5, -0.5, 1.0,
    0.5, -0.5, -0.5, 1.0,

    0.5, -0.5, -0.5, 1.0,
   -0.5,  0.5, -0.5, 1.0,
   -0.5, -0.5, -0.5, 1.0,

   -0.5,  0.5,  0.5, 1.0,
   -0.5, -0.5,  0.5, 1.0,
   -0.5, -0.5, -0.5, 1.0,

   -0.5,  0.5,  0.5, 1.0,
   -0.5, -0.5, -0.5, 1.0,
   -0.5,  0.5, -0.5, 1.0,

    0.5,  0.5,  0.5, 1.0,
    0.5, -0.5, -0.5, 1.0,
    0.5, -0.5,  0.5, 1.0,

    0.5,  0.5,  0.5, 1.0,
    0.5,  0.5, -0.5, 1.0,
    0.5, -0.5, -0.5, 1.0,

    0.5,  0.5, -0.5, 1.0,
    0.5,  0.5,  0.5, 1.0,
   -0.5,  0.5,  0.5, 1.0,

    0.5,  0.5, -0.5, 1.0,
   -0.5,  0.5,  0.5, 1.0,
   -0.5,  0.5, -0.5, 1.0,

    0.5, -0.5, -0.5, 1.0,
   -0.5, -0.5,  0.5, 1.0,
    0.5, -0.5,  0.5, 1.0,

    0.5, -0.5, -0.5, 1.0,
    -0.5, -0.5, -0.5, 1.0,
    -0.5, -0.5,  0.5, 1.0,

    // Colors

    // FRONT
    0.0, 0.0, 1.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    0.0, 0.0, 1.0, 1.0,

    // FRONT
    0.0, 0.0, 1.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    0.0, 0.0, 1.0, 1.0,

    0.8, 0.8, 0.8, 1.0,
    0.8, 0.8, 0.8, 1.0,
    0.8, 0.8, 0.8, 1.0,

    0.8, 0.8, 0.8, 1.0,
    0.8, 0.8, 0.8, 1.0,
    0.8, 0.8, 0.8, 1.0,

    0.0, 1.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,

    0.0, 1.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,

    // RIGHT
    1.0, 1.0, 0.0, 1.0,
    1.0, 1.0, 0.0, 1.0,
    1.0, 1.0, 0.0, 1.0,

    // RIGHT
    1.0, 1.0, 0.0, 1.0,
    1.0, 1.0, 0.0, 1.0,
    1.0, 1.0, 0.0, 1.0,

    // TOP
    1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,

    // TOP
    1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,
    1.0, 0.0, 0.0, 1.0,

    0.0, 1.0, 1.0, 1.0,
    0.0, 1.0, 1.0, 1.0,
    0.0, 1.0, 1.0, 1.0,

    0.0, 1.0, 1.0, 1.0,
    0.0, 1.0, 1.0, 1.0,
    0.0, 1.0, 1.0, 1.0,
]);

const vertexSource = `
    attribute vec4 cPos;
    attribute vec4 cColor;

    varying vec4 theColor;
    uniform float zNear;
    uniform float zFar;
    uniform float frustumScale;

    void main() {
        vec4 cameraPos = (cPos * 0.5 + vec4(-0.7, -1, -1.7, 0.0));
        vec4 clipPos;

        clipPos.xy = cameraPos.xy;

        clipPos.z = cameraPos.z * (1.0 + 3.0) / (1.0 - 3.0);
        clipPos.z += 2.0 * 1.0 * 3.0 / (1.0 - 3.0);

        clipPos.w = -cameraPos.z;
        gl_Position = clipPos;

        theColor = cColor;
    }
`;

const fragmentSource = `
    precision mediump float;

    varying vec4 theColor;

    void main() {
        gl_FragColor = theColor;
    }
`;