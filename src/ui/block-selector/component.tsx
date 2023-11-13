import styled from "styled-components";

export function BlockSelectorUI() {
  return (
    <StyledBlockSelector>
      <section className='block-grid'>
        <img src="/conveyor0.png" alt="" />
      </section>
      <section className='category-selector'>
        <img src="/transport-category-icon.png" alt="" />
      </section>
    </StyledBlockSelector>
  );
}

const StyledBlockSelector = styled.div`
  position: fixed;
  height: 250px;
  background-color: #57575778;
  border: 4px solid #969696c8;
  right: 20px;
  bottom: 20px;
  display: flex;
  align-items: stretch;

  &>.block-grid {
    display: grid;
    flex: 1;
    padding: 5px;
    background-color: #0001;
    grid-template-columns: repeat(5, 32px);
    border-right: 4px solid #969696c8;
    gap: 5px;

    &>* {
      cursor: pointer;

      &:hover {
        opacity: .8;
      }
    }
  }

  &>.category-selector {
    padding: 5px;
    display: grid;
    grid-template-columns: repeat(2, 24px);
    gap: 5px;

    &>* {
      cursor: pointer;
      width: 24px;
      height: 24px;
    }
  }
`;