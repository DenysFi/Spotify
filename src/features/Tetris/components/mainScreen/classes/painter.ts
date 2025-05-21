import { glMatrix, mat4, vec3 } from "gl-matrix";
import {
  cube_fragment_source,
  cube_vertex_source,
  grid_fragment_source,
  grid_vertex_source,
} from "../../../data/glsl_source";
import {
  columnCount,
  cubeNormals,
  cubeVertexs,
  generateShapeColor,
  gridVertexs,
  rowCount,
} from "../../../data/shaderData";
import Shader from "../../../gl/shader";
import Shape from "./shape";

interface GameRunData {
  cells: (0 | 1)[][];
  currentShape: Shape | null;
  activeShapePos: { x: number; y: number };
  lightColor: vec3;
  lightDirection: vec3;
  settledCubeColor: vec3;
  activeCubeColor: vec3;
}

interface GameSetting {
  distance: number;
  rotateX: number;
}

export const gameStateInfo: GameRunData = {
  cells: [],
  currentShape: null,
  activeShapePos: {
    x: 0,
    y: 0,
  },
  lightColor: [1, 1, 1],
  lightDirection: [0, 0.8, -2],
  settledCubeColor: [0.92, 0.15, 0.02], // [0.36, 0.42, 0.60],
  activeCubeColor: [1, 1, 1],
};
export const gameSettings: GameSetting = {
  distance: 250,
  rotateX: 0,
};

const viewMatrix = () => {
  const view = mat4.lookAt(
    mat4.create(),
    [0, 0, gameSettings.distance + 100],
    [0, 0, 0],
    [0, 1, 0],
  );
  return view;
};

const modelRotateMatrix = () => {
  const model = mat4.rotate(
    mat4.create(),
    mat4.create(),
    glMatrix.toRadian(gameSettings.rotateX),
    [-1, 0, 0],
  );
  return model;
};

const drawGridLine = (gl: WebGLRenderingContext) => {
  const shader = new Shader(gl, grid_vertex_source, grid_fragment_source);
  shader.useProgram();

  // set vertexs
  const posBuffer = gl.createBuffer();
  const posLocation = gl.getAttribLocation(shader.program, "a_position");
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(gridVertexs), gl.STATIC_DRAW);
  gl.vertexAttribPointer(posLocation, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(posLocation);

  // set color
  shader.setFloat3("u_color", 1, 1, 1);

  // set matrix
  const projection = mat4.perspective(
    mat4.create(),
    Math.PI * 0.25,
    gl.canvas.width / gl.canvas.height,
    0.1,
    1000,
  );
  shader.setMat4("u_model", new Float32Array(modelRotateMatrix()));
  shader.setMat4("u_projection", new Float32Array(projection));
  shader.setMat4("u_view", new Float32Array(viewMatrix()));

  gl.drawArrays(gl.LINES, 0, gridVertexs.length / 3);
};

/**
 * drawCanvas cube
 * @param gl WebGLRenderingContext.
 * @param cells the value of every cell, the value must be 0 or 1.
 * @param lightColor the color of light.
 * @param lightDirection the direction of light.
 */
const drawCube = (
  gl: WebGLRenderingContext,
  cells: (0 | 1)[][],
  lightColor: vec3,
  lightDirection: vec3,
  cubeColor?: vec3,
) => {
  const shader = new Shader(gl, cube_vertex_source, cube_fragment_source);
  shader.useProgram();

  // set cube vertexs
  const posBuffer = gl.createBuffer();
  const posLocation = gl.getAttribLocation(shader.program, "a_position");
  gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertexs), gl.STATIC_DRAW);
  gl.vertexAttribPointer(posLocation, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(posLocation);

  // set cube normals
  const normalBuffer = gl.createBuffer();
  const normalLocation = gl.getAttribLocation(shader.program, "a_normal");
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeNormals), gl.STATIC_DRAW);
  gl.vertexAttribPointer(normalLocation, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(normalLocation);

  const projection = mat4.perspective(
    mat4.create(),
    Math.PI * 0.25,
    gl.canvas.width / gl.canvas.height,
    0.1,
    1000,
  );
  shader.setMat4("u_view", new Float32Array(viewMatrix()));
  shader.setMat4("u_projection", new Float32Array(projection));
  shader.setFloat3("u_lightColor", lightColor[0], lightColor[1], lightColor[2]);
  shader.setFloat3(
    "u_lightDirectionReverse",
    -lightDirection[0],
    -lightDirection[1],
    -lightDirection[2],
  );

  for (let row = 0; row < cells.length; row++) {
    const curRow = cells[row];
    for (let col = 0; col < curRow.length; col++) {
      const cellValue = curRow[col];
      if (cellValue === 1) {
        // set color
        const colorBuffer = gl.createBuffer();
        const colorLocation = gl.getAttribLocation(shader.program, "a_color");
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        if (cubeColor) {
          const color: number[] = [];
          for (let i = 0; i < cubeVertexs.length / 3; i++) {
            color.push(cubeColor[0], cubeColor[1], cubeColor[2]);
          }
          gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(color),
            gl.STATIC_DRAW,
          );
        } else {
          gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(generateShapeColor()),
            gl.STATIC_DRAW,
          );
        }
        gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(colorLocation);

        // set matrix
        const model = mat4.translate(mat4.create(), modelRotateMatrix(), [
          10 * (col - (columnCount / 2 - 0.5)),
          10 * (row - (rowCount / 2 - 0.5)),
          0,
        ]);
        shader.setMat4("u_model", new Float32Array(model));

        gl.drawArrays(gl.TRIANGLES, 0, 36);
      }
    }
  }
};

export const drawCanvas = (
  gl: WebGLRenderingContext,
  animationFrameId: any,
) => {
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.enable(gl.DEPTH_TEST);
  gl.enable(gl.CULL_FACE);
  gl.cullFace(gl.BACK);
  gl.clearColor(0.19, 0.22, 0.25, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // drawCanvas grid line
  drawGridLine(gl);
  // drawCanvas settled cube
  drawCube(
    gl,
    gameStateInfo.cells,
    gameStateInfo.lightColor,
    gameStateInfo.lightDirection,
    gameStateInfo.settledCubeColor,
  );

  // drawCanvas active cube
  if (gameStateInfo.currentShape) {
    const cellData: (0 | 1)[][] = [];
    for (let i = 0; i < rowCount + 4; i++) {
      const rowData: (0 | 1)[] = [];
      for (let j = 0; j < columnCount; j++) {
        rowData.push(0);
      }
      cellData.push(rowData);
    }

    let shapeData = gameStateInfo.currentShape.data;
    const pos = gameStateInfo.activeShapePos;
    for (let i = pos.y + 3; i >= pos.y; i--) {
      for (let j = pos.x; j < pos.x + 4; j++) {
        if (i >= 0 && j >= 0) {
          cellData[i][j] = (shapeData & 0x8000) === 0 ? 0 : 1;
        }
        shapeData <<= 1;
      }
    }

    drawCube(
      gl,
      cellData,
      gameStateInfo.lightColor,
      gameStateInfo.lightDirection,
      gameStateInfo.activeCubeColor,
    );
  }

  animationFrameId.current = window.requestAnimationFrame(() => {
    drawCanvas(gl, animationFrameId);
  });
};
