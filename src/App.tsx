import { MouseEvent } from 'react';
import { styled } from 'styled-components';
import './App.css';
import { BlockSelectorUI } from './ui/block-selector/component';
import { GameScreenUI } from './ui/game-screen/component';
import { GameStorageProvider } from './ui/game-context';

export default function App() {
  function handleContextMenu(ev: MouseEvent) {
    ev.preventDefault();
  }

  return (
    <GameStorageProvider>
      <StyledApp onContextMenuCapture={handleContextMenu}>
        <GameScreenUI />
        <BlockSelectorUI />
      </StyledApp>
    </GameStorageProvider>
  )
}

const StyledApp = styled.div`
  background-color: #afafaf;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  position: relative;
`;