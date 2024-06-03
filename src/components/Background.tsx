'use client';

import React, { ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';
import { ReactSVG } from 'react-svg';

const slide = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`;

const BackgroundContainer = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  
`;

const AnimatedSVG = styled((props: any) => <ReactSVG {...props} />)`
  position: absolute;
top:0;
  left: 0;
  width: 300%;
  height: 100%;
  object-fit: cover;
  animation: ${slide} 300s infinite linear;
  margin-left: -350px;
`;

const ChildrenWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

interface BackgroundProps {
  children: ReactNode;
}

const Background = ({ children }: BackgroundProps) => {
  return (
    <BackgroundContainer>
      <AnimatedSVG src="/finalsvg.svg" />
      <ChildrenWrapper>
        {children}
      </ChildrenWrapper>
    </BackgroundContainer>
  );
};

export default Background;