import { vec3 } from "gl-matrix";
import React, { useEffect, useRef } from "react";
import Shape from "../mainScreen/classes/shape";
// import "./index.scss";
import { Button } from "@/components/ui/button";
import { GameStatus } from "../../enum";

interface RealtimeInfoProps {
  nextShape?: Shape;
  nextShapeColor: vec3;
  score: number;
  status: GameStatus;
  setStatus: React.Dispatch<React.SetStateAction<GameStatus>>;
}

const GameStateInfo: React.FC<RealtimeInfoProps> = (props) => {
  const { nextShape, score, nextShapeColor, status, setStatus } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Получаем контекст
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Не удалось получить 2D контекст");
      return;
    }

    // Устанавливаем размеры канваса
    const setCanvasSize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };

    // Устанавливаем размеры только один раз или при ресайзе
    setCanvasSize();

    // Добавляем обработчик ресайза окна
    window.addEventListener("resize", setCanvasSize);

    // Отрисовка фигуры
    if (nextShape) {
      // Очищаем канвас
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Устанавливаем цвет
      ctx.fillStyle = `rgb(${Math.round(255 * nextShapeColor[0])}, ${Math.round(255 * nextShapeColor[1])}, ${Math.round(255 * nextShapeColor[2])})`;

      // Размеры ячеек для сетки 4x4
      const cellW = canvas.width / 4;
      const cellH = canvas.height / 4;

      // Копия данных фигуры
      let shapeData = nextShape.data;

      // Отрисовка сетки 4x4
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          // Проверяем старший бит
          if (shapeData & 0x8000) {
            ctx.fillRect(j * cellW, i * cellH, cellW, cellH);
          }
          // Сдвигаем биты
          shapeData <<= 1;
        }
      }
    }

    // Очищаем обработчик ресайза при размонтировании
    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, [nextShape, nextShapeColor]); // Добавили nextShapeColor в зависимости

  const onStart = () => {
    setStatus(GameStatus.GAME_RUNNING);
  };

  const onPause = () => {
    if (status === GameStatus.GAME_RUNNING) {
      setStatus(GameStatus.GAME_PAUSED);
      return;
    }
    if (status === GameStatus.GAME_PAUSED) {
      setStatus(GameStatus.GAME_RUNNING);
      return;
    }
  };

  const btn1Disabled = !(
    status === GameStatus.GAME_NOT_STARTED || status === GameStatus.GAME_ENDED
  );
  const btn2Disabled = !btn1Disabled;

  return (
    <div>
      <div className="absolute right-4 top-4 flex h-[170px] w-[170px] flex-col items-center rounded-md bg-[var(--primary-bg)] p-4">
        Next Shape:
        <canvas className="mt-4 h-[100px] w-[100px]" ref={canvasRef} />
      </div>
      <div className="absolute left-4 top-4 rounded-md bg-[var(--primary-bg)] p-4">
        <div className="mb-4">
          <span>Score: </span>
          <span>{score}</span>
        </div>
        <div className="flex gap-2">
          <Button disabled={btn1Disabled} onClick={onStart}>
            {status === GameStatus.GAME_NOT_STARTED ? "Start" : "Restart"}
          </Button>
          <Button disabled={btn2Disabled} onClick={onPause}>
            {status === GameStatus.GAME_RUNNING ? "Pause" : "Continue"}
          </Button>
        </div>
      </div>
      {status === GameStatus.GAME_ENDED && (
        <div className="absolute left-[50%] top-[50%] mt-4 flex w-[200px] -translate-x-1/2 -translate-y-1/2 transform flex-col items-center rounded-md bg-[var(--primary-bg)] p-4">
          <div>Game Over</div>
          <Button className="mt-4" variant="pillFilled" onClick={onStart}>
            Restart
          </Button>
        </div>
      )}
    </div>
  );
};

export default GameStateInfo;
