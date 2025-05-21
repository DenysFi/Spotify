import { vec3 } from "gl-matrix";
import React, { useEffect, useRef, useState } from "react";
import {
  columnCount,
  rowCount as HEIGHT,
  columnCount as WIDTH,
} from "../../data/shaderData";
import { GameStatus } from "../../enum";
import GameStateInfo from "../game-info";
import { drawCanvas, gameSettings, gameStateInfo } from "./classes/painter";
import Shape from "./classes/shape";
import ShapeCreator from "./classes/shapeCreator";

type CellData = (0 | 1)[][];
interface MainScreenProps {
  gameState: GameStatus;
  setGameStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const getInitData = () => {
  const data: CellData = [];
  for (let i = 0; i < HEIGHT; i++) {
    const rowData: 0 | 1[] = Array(WIDTH).fill(0);
    data.push(rowData);
  }

  return data;
};

/**
 * @param coordLd
 */
const getCellValueByCoord = (
  cells: CellData,
  coordLd: { x: number; y: number },
) => {
  let binaryString = "";
  for (let i = coordLd.y + 3; i >= coordLd.y; i--) {
    if (i < 0) {
      binaryString += "1111";
    } else if (i >= cells.length) {
      for (let j = coordLd.x; j < coordLd.x + 4; j++) {
        if (j < 0 || j >= columnCount) {
          binaryString += "1";
        } else {
          binaryString += "0";
        }
      }
    } else {
      for (let j = coordLd.x; j < coordLd.x + 4; j++) {
        if (j >= 0 && j < cells[i].length) {
          binaryString += cells[i][j];
        } else {
          binaryString += "1";
        }
      }
    }
  }

  return parseInt(binaryString, 2);
};

/**
 * @param cells
 * @param coordLd
 * @param value
 */
const updateCellValueByCoord = (
  cells: CellData,
  coordLd: { x: number; y: number },
  value: number,
) => {
  const resultData: CellData = JSON.parse(JSON.stringify(cells)) as CellData;
  for (let i = coordLd.y; i < coordLd.y + 4; i++) {
    if (i >= 0 && i < cells.length) {
      for (let j = coordLd.x + 3; j >= coordLd.x; j--) {
        if (j >= 0 && j < cells[i].length) {
          const cellValue = value & 1;
          if (cellValue === 1) {
            resultData[i][j] = cellValue;
          }
        }
        value >>= 1;
      }
    } else {
      value >>= 4;
    }
  }

  return resultData;
};

let flicker = false;

const MainScreen: React.FC<MainScreenProps> = (props) => {
  const { gameState, setGameStatus, score, setScore } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [mouseDownCoord, setMouseDownCoord] = useState<{
    y: number;
  }>({ y: 0 });

  const [cells, setCellsData] = useState<CellData>([]);
  const [currentShape, setActiveShape] = useState<Shape>();
  const [activeShapeCoord, setActiveShapeCoord] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const [activeShapeColor, setActiveShapeColor] = useState<vec3>([1, 1, 1]);

  const [nextShape, setNextShape] = useState<Shape | undefined>(
    ShapeCreator.createRandomShape() as Shape,
  );
  const [nextShapeColor, setNextShapeColor] = useState<vec3>([
    Math.random(),
    Math.random(),
    Math.random(),
  ]);
  const animationFrameId = useRef<number | null>(null);
  const [speed, setSpeed] = useState<number>(1);
  const preStatusRef = useRef<GameStatus>(gameState);

  const setNextRandomShape = () => {
    const shape = ShapeCreator.createRandomShape();
    setNextShape(shape as Shape);
    const r = Math.random();
    const g = Math.random();
    const b = Math.random();
    setNextShapeColor([r, g, b]);
    const coordX = Math.round(Math.random() * (WIDTH - 4));
    setActiveShapeCoord({ x: coordX, y: HEIGHT });

    setActiveShape(nextShape);
    setActiveShapeColor(nextShapeColor);
  };

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      setMouseDown(true);
      setMouseDownCoord({
        y: e.clientY,
      });
    }

    function handleMouseUp() {
      setMouseDown(false);
      setMouseDownCoord({
        y: 0,
      });
    }

    function handleMouseMove(e: MouseEvent) {
      if (!mouseDown) return;

      const currentY = e.clientY;
      const offsetY = mouseDownCoord.y - currentY;
      // Уменьшаем чувствительность и добавляем сглаживание
      const rotationSpeed = 0.3; // Уменьшенная чувствительность
      const newRotation = gameSettings.rotateX + offsetY * rotationSpeed;

      // Ограничиваем угол от 0 до 360
      gameSettings.rotateX = ((newRotation % 360) + 360) % 360;

      // Обновляем координату мыши для следующего шага
      setMouseDownCoord({ y: currentY });
    }

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseDown, mouseDownCoord]);

  useEffect(() => {
    function handleMouseWheel(e: WheelEvent) {
      if (e.deltaY > 0) {
        gameSettings.distance += 30;
      } else {
        gameSettings.distance -= 30;
      }
    }

    document.addEventListener("wheel", handleMouseWheel);

    return () => {
      document.removeEventListener("wheel", handleMouseWheel);
    };
  }, []);

  useEffect(() => {
    if (currentShape) {
      const onKeyPress = (e: KeyboardEvent) => {
        const shapeData = currentShape.getAfterOneRotate_Data();
        const cellValue = getCellValueByCoord(cells, activeShapeCoord);
        switch (e.key) {
          case "ArrowDown":
            setActiveShapeCoord((coord) => ({ x: coord.x, y: coord.y - 1 }));
            break;
          case "ArrowLeft":
            setActiveShapeCoord((coord) => {
              if (coord.y >= HEIGHT) return coord;
              const cellValue = getCellValueByCoord(cells, {
                x: coord.x - 1,
                y: coord.y,
              });
              if ((cellValue & currentShape.data) === 0) {
                return {
                  x: coord.x - 1,
                  y: coord.y,
                };
              } else {
                return coord;
              }
            });
            break;
          case "ArrowRight":
            setActiveShapeCoord((coord) => {
              if (coord.y >= HEIGHT) return coord;
              const cellValue = getCellValueByCoord(cells, {
                x: coord.x + 1,
                y: coord.y,
              });
              if ((cellValue & currentShape.data) === 0) {
                return {
                  x: coord.x + 1,
                  y: coord.y,
                };
              } else {
                return coord;
              }
            });
            break;
          case "ArrowUp":
            if ((cellValue & shapeData) === 0) {
              currentShape.rotate();
            }
            break;
          default:
            break;
        }
      };
      window.addEventListener("keydown", onKeyPress);
      return () => {
        window.removeEventListener("keydown", onKeyPress);
      };
    }
  }, [currentShape, activeShapeCoord]);

  useEffect(() => {
    setNextRandomShape();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (gameState === GameStatus.GAME_RUNNING) {
        setActiveShapeCoord((coord) => ({ x: coord.x, y: coord.y - 1 }));
      }
    }, 1000 / speed);

    return () => {
      clearInterval(intervalId);
    };
  }, [speed, gameState]);

  useEffect(() => {
    if (
      (preStatusRef.current === GameStatus.GAME_ENDED ||
        preStatusRef.current === GameStatus.GAME_NOT_STARTED) &&
      gameState === GameStatus.GAME_RUNNING
    ) {
      setCellsData(getInitData());
    }
    preStatusRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const onResize = () => {
        const displayWidth = canvas.clientWidth;
        const displayHeight = canvas.clientHeight;

        if (canvas.width != displayWidth || canvas.height != displayHeight) {
          canvas.width = displayWidth;
          canvas.height = displayHeight;
        }
      };
      onResize();
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
      };
    }
  }, [canvasRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (
      canvas &&
      (gameState === GameStatus.GAME_RUNNING ||
        gameState === GameStatus.GAME_NOT_STARTED)
    ) {
      const gl = canvas.getContext("webgl2");

      if (gl && animationFrameId.current === null) {
        // Запускаем анимацию, передавая gameState и реф
        drawCanvas(gl, animationFrameId);
      }

      drawCanvas(gl as WebGL2RenderingContext, animationFrameId);
      return () => {
        if (animationFrameId.current !== null) {
          window.cancelAnimationFrame(animationFrameId.current);
          animationFrameId.current = null;
        }
        if (gl) {
          gl.clearColor(0.19, 0.22, 0.25, 1.0);
          gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }
      };
    }
  }, [canvasRef, GameStatus]);

  useEffect(() => {
    gameStateInfo.cells = cells;
  }, [cells]);

  useEffect(() => {
    if (currentShape) {
      gameStateInfo.currentShape = currentShape;
    }
  }, [currentShape]);

  useEffect(() => {
    gameStateInfo.activeCubeColor = activeShapeColor;
  }, [activeShapeColor]);

  useEffect(() => {
    if (currentShape) {
      const areaValue = getCellValueByCoord(cells, activeShapeCoord);
      const collision = currentShape.data & areaValue;
      if (collision) {
        if (activeShapeCoord.y > HEIGHT - 4) {
          setGameStatus(GameStatus.GAME_ENDED);
          return;
        }

        setNextRandomShape();
        const shapeData = gameStateInfo.currentShape?.data as number;
        const shapePos = gameStateInfo.activeShapePos;
        const newCellsData = updateCellValueByCoord(cells, shapePos, shapeData);
        setCellsData(newCellsData);
      } else {
        gameStateInfo.activeShapePos = activeShapeCoord;
      }
    }
  }, [activeShapeCoord]);

  useEffect(() => {
    if (!flicker) {
      const willBeDestroyedRows: number[] = [];
      for (let i = 0; i < cells.length; i++) {
        const curRow = cells[i];
        const isDestroyed = curRow.every((item) => item === 1);

        if (isDestroyed) {
          willBeDestroyedRows.push(i);
        }
      }

      if (willBeDestroyedRows.length > 0) {
        let isDraw = false;
        flicker = true;
        const intervalId = setInterval(() => {
          const data: CellData = JSON.parse(JSON.stringify(cells));
          for (let i = 0; i < willBeDestroyedRows.length; i++) {
            const rowIndex = willBeDestroyedRows[i];
            data[rowIndex] = Array(WIDTH).fill(isDraw ? 1 : 0);
          }
          setCellsData(data);
          isDraw = !isDraw;
        }, 200);

        setTimeout(() => {
          clearInterval(intervalId);
          const data: CellData = JSON.parse(JSON.stringify(cells));
          for (let i = willBeDestroyedRows.length - 1; i >= 0; i--) {
            const delRowIndex = willBeDestroyedRows[i];
            data.splice(delRowIndex, 1);
          }
          for (let i = 0; i < willBeDestroyedRows.length; i++) {
            data.push(Array(WIDTH).fill(0));
          }

          setScore((score) => (score += willBeDestroyedRows.length * 10));
          setCellsData(data);
          flicker = false;
        }, 1000);
      }
    }
  }, [cells]);

  useEffect(() => {
    if (score <= 100) {
      setSpeed(1);
    } else {
      const speed = Math.ceil(score / 100);
      setSpeed(Math.min(speed, 11));
    }
  }, [score]);

  return (
    <div className="relative h-full w-full">
      <canvas className="h-full w-full" ref={canvasRef} />
      <GameStateInfo
        status={gameState}
        setStatus={setGameStatus}
        nextShape={nextShape}
        score={score}
        nextShapeColor={nextShapeColor}
      />
    </div>
  );
};

export default MainScreen;
