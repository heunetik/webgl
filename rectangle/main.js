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
    gl.bufferData(gl.ARRAY_BUFFER, square, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "pos");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
});

const square = new Float32Array([
    -1.0, -1.0,
    1.0, -1.0,
    -1.0, 1.0,
    -1.0, 1.0,
    1.0, -1.0,
    1.0, 1.0
]);

const vertexSource = `
    attribute vec2 pos;

    void main() {
        gl_Position = vec4(pos, 0, 4);
    }
`;

const fragmentSource = `
    void main() {
        gl_FragColor = vec4(0.3, 0.7, 1, 1);
    }
`;