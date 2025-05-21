import { useEffect, useState } from "react";
import MainScreen from "./components/mainScreen";
import { GameStatus } from "./enum";

const Tetris = (): JSX.Element => {
  const [status, setStatus] = useState<GameStatus>(GameStatus.GAME_NOT_STARTED);
  const [score, setScore] = useState<number>(0);

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === " ") {
        setStatus((status) => {
          switch (status) {
            case GameStatus.GAME_NOT_STARTED:
            case GameStatus.GAME_ENDED:
            case GameStatus.GAME_PAUSED:
              return GameStatus.GAME_RUNNING;
            case GameStatus.GAME_RUNNING:
              return GameStatus.GAME_PAUSED;
            default:
              throw new Error(`undefined game status: ${status}.`);
          }
        });
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <div className="h-full w-full">
      <MainScreen
        gameState={status}
        setGameStatus={setStatus}
        score={score}
        setScore={setScore}
      />
    </div>
  );
};

export default Tetris;
