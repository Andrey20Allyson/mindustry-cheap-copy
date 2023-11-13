import { PropsWithChildren, createContext, useContext, useState } from "react";

export interface GameStorage {
  get: () => Phaser.Game | null;
  set: (game: Phaser.Game | null) => void;
}

const GameContext = createContext<GameStorage | null>(null);

export function GameStorageProvider(props: PropsWithChildren) {
  const [game, set] = useState<Phaser.Game | null>(null);

  function get() {
    return game;
  }

  return (
    <GameContext.Provider value={{get, set}}>
      {props.children}
    </GameContext.Provider>
  )
}

export function useGameStorage(): GameStorage {
  const value = useContext(GameContext);
  if (value === null) throw new Error(`Can't use GameStorage outside of a ${GameStorageProvider.name}`);

  return value;
}

export function useGame(): Phaser.Game | null {
  return useGameStorage().get();
}