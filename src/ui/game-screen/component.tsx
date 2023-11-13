import styled from "styled-components";
import { init } from "../../game";
import { useGameStorage } from "../game-context";

export function GameScreenUI() {
  const gameStorage = useGameStorage();
  
  function handleCanvasRef(canvas: HTMLCanvasElement | null) {
    if (canvas === null) return;

    const game = init(canvas);
    if (game === undefined) return;

    gameStorage.set(game);
  }

  return (
    <StyledGameScreen ref={handleCanvasRef} />
  );
}

export const StyledGameScreen = styled.canvas`
  height: 100%;
  width: 100%;
`;