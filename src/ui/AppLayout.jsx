import { Outlet } from "react-router";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { useState } from "react";
import { render } from "react-dom";

const Banner = styled.div`
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-50);
  color: var(--color-brand-700);
  font-size: 2rem;
  padding: 1rem;
  text-align: center;
  width: 100%;
  position: sticky;
  bottom: 0;
  z-index: 1;
  cursor: pointer;
`;

const Main = styled.main`
  padding: 4rem 4.8rem 6.4rem;
  background-color: var(--color-grey-50);
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const StyledAppLayout = styled.div`
  height: 100vh;
  grid-template-columns: 27rem 1fr;
  grid-template-rows: auto 1fr;
  display: grid;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: var(--color-grey-0);
  z-index: -5;
`;

export default function AppLayout() {
  const [renderBanner, setRenderBanner] = useState(true);

  return (
    <>
      <Background />
      {renderBanner && (
        <Banner onClick={() => setRenderBanner(false)}>
          👋 Data mutations (create, update, delete) are deactivated in this
          demo app. (Click to dismiss)
        </Banner>
      )}

      <StyledAppLayout>
        <Header />
        <Sidebar />
        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </StyledAppLayout>
    </>
  );
}
