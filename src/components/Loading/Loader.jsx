import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <svg width={115} height={81} viewBox="0 0 115 81" fill="none" xmlns="http://www.w3.org/2000/svg" id="bird">
          <rect x={41} y={47} width={20} height={7} fill="#FFEB3B" />
          <rect x={35} y={67} width={33} height={7} fill="#FFC107" />
          <rect x={21} y={54} width={40} height={14} fill="#FFC107" />
          <rect x={48} y={40} width={20} height={7} fill="#FFEB3B" />
          <rect x={48} y={33} width={20} height={7} fill="#FFEB3B" />
          <rect x={41} y={27} width={20} height={7} fill="#FFEB3B" />
          <rect x={34} y={20} width={20} height={7} fill="#FFEB3B" />
          <rect x={28} y={14} width={20} height={7} fill="#FFEB3B" />
          <rect x={40} y={7} width={21} height={7} fill="#FFEB3B" />
          <rect x={41} y={34} width={7} height={13} fill="black" />
          <rect x={21} y={14} width={7} height={7} fill="black" />
          <rect x={41} width={40} height={7} fill="black" />
          <rect x={28} y={7} width={13} height={7} fill="black" />
          <rect x={7} y={27} width={34} height={27} fill="#FFFFCC" />
          <rect x={61} y={12} width={34} height={28} fill="white" />
          <rect x={7} y={20} width={27} height={7} fill="black" />
          <rect x={34} y={27} width={7} height={7} fill="black" />
          <rect x={7} y={40} width={7} height={7} fill="#FFEB3B" />
          <rect x={34} y={40} width={7} height={7} fill="#FFEB3B" />
          <rect x={48} y={14} width={7} height={7} fill="#FFEB3B" />
          <rect x={7} y={47} width={7} height={7} fill="black" />
          <rect x={14} y={47} width={20} height={7} fill="#FFEB3B" />
          <rect y={47} width={20} height={7} transform="rotate(-90 0 47)" fill="black" />
          <rect x={34} y={47} width={7} height={7} fill="black" />
          <rect x={88} y={13} width={7} height={7} fill="black" />
          <rect x={81} y={6} width={7} height={7} fill="black" />
          <rect x={95} y={40} width={20} height={7} transform="rotate(-90 95 40)" fill="black" />
          <rect x={81} y={33} width={13} height={7} transform="rotate(-90 81 33)" fill="black" />
          <rect x={81} y={13} width={13} height={7} transform="rotate(-180 81 13)" fill="white" />
          <rect x={61} y={33} width={7} height={7} fill="black" />
          <rect x={61} y={6} width={7} height={7} fill="black" />
          <rect x={54} y={33} width={20} height={7} transform="rotate(-90 54 33)" fill="black" />
          <rect x={14} y={60} width={7} height={7} fill="black" />
          <rect x={21} y={67} width={14} height={7} fill="black" />
          <rect x={35} y={74} width={33} height={7} fill="black" />
          <rect x={14} y={54} width={20} height={7} fill="black" />
          <rect x={108} y={47} width={7} height={7} fill="black" />
          <rect x={68} y={53} width={33} height={7} fill="black" />
          <rect x={68} y={46} width={40} height={7} fill="#F44336" />
          <rect x={65} y={60} width={40} height={7} fill="#F44336" />
          <rect x={101} y={67} width={14} height={7} transform="rotate(-90 101 67)" fill="black" />
          <rect x={61} y={46} width={7} height={7} fill="black" />
          <rect x={68} y={40} width={40} height={7} fill="black" />
          <rect x={68} y={67} width={33} height={7} fill="black" />
          <rect x={54} y={53} width={7} height={7} fill="black" />
          <rect x={61} y={53} width={7} height={7} fill="#F44336" />
          <rect x={61} y={60} width={7} height={7} fill="black" />
        </svg>
        <div className="sceneTop ">
          <div className="flappyBirdScene">
            <div className="birdObs1" id="birdObstacle" />
            <div className="birdObs2" id="birdObstacle" />
            <div className="birdObs3" id="birdObstacle" />
            <div className="birdObs4" id="birdObstacle" />
          </div>
          <div className="flappyBirdScene">
            <div className="birdObs1" id="birdObstacle" />
            <div className="birdObs2" id="birdObstacle" />
            <div className="birdObs3" id="birdObstacle" />
            <div className="birdObs4" id="birdObstacle" />
          </div>
        </div>
        <div className="sceneBottom">
          <div className="flappyBirdSceneBottom">
            <div className="birdObs1" id="birdObstacle" />
            <div className="birdObs2" id="birdObstacle" />
            <div className="birdObs3" id="birdObstacle" />
            <div className="birdObs4" id="birdObstacle" />
          </div>
          <div className="flappyBirdSceneBottom">
            <div className="birdObs1" id="birdObstacle" />
            <div className="birdObs2" id="birdObstacle" />
            <div className="birdObs3" id="birdObstacle" />
            <div className="birdObs4" id="birdObstacle" />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    position: relative;
    width: 18rem; /* Reposition the obstacles and the bird if the width is changed */
    aspect-ratio: 1;
    overflow: hidden;
    border-radius: 50%;
    background: linear-gradient(to bottom, #6ccee7 60%, white);
    
  }
  #bird {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-80%, -50%);
    width: 3rem;
    height: auto;
    animation: flap 500ms linear infinite;
  }
  .flappyBirdScene,
  .flappyBirdSceneBottom {
    display: flex;
    width: 20rem;
    top: -23%;
    position: relative;
  }
  .sceneTop {
    display: flex;
    width: fit-content;
    animation: flow 5s linear infinite;
  }
  .sceneBottom {
    display: flex;
    width: fit-content;
    animation: flowBottom 5s linear infinite;
  }
  #birdObstacle {
    height: 8rem;
    width: 2rem;
    background: linear-gradient(
      to right,
      #9de558 0px,
      #9de558 3px,
      #e7ff8d 3px,
      #e7ff8d 5px,
      #9de858 5px,
      #9de858 10px,
      #74c029 10px,
      #74c029 13px,
      #9de558 13px,
      #9de558 15px,
      #74c029 22px,
      #74c029 28px,
      #59811a 28px,
      #59811a 100%
    );
    border: solid;
    position: relative;
  }
  .flappyBirdSceneBottom {
    bottom: -25%;
    left: 0;
  }
  #birdObstacle::after {
    content: "";
    position: absolute;
    width: 135%;
    height: 1.25rem;
    top: 100%;
    left: 50%;
    border: solid;
    transform: translate(-50%, 0);
    background: linear-gradient(
      to right,
      #9de558 0px,
      #9de558 3px,
      #e7ff8d 3px,
      #e7ff8d 5px,
      #9de858 5px,
      #9de858 10px,
      #74c029 10px,
      #74c029 13px,
      #9de558 13px,
      #9de558 15px,
      #74c029 22px,
      #74c029 28px,
      #59811a 28px,
      #59811a 100%
    );
  }
  .birdObs2 {
    transform: translate(0%, 15%);
    left: 15%;
  }
  .birdObs3 {
    transform: translate(0, 18%);
    left: 30%;
  }
  .birdObs4 {
    transform: translate(0, 15%);
    left: 45%;
  }
  @keyframes flap {
    from {
      transform: translate(-80%, -50%);
    }
    25% {
      transform: translate(-80%, -50%) rotate(-15deg);
    }
    50% {
      transform: translate(-80%, -12%) rotate(5deg);
    }
    100% {
      transform: translate(-80%, -50%);
    }
  }
  @keyframes flow {
    from {
      transform: translate(0, -43%);
    }
    to {
      transform: translate(-50%, -43%);
    }
  }
  @keyframes flowBottom {
    from {
      transform: translate(0, 75%) rotateX(180deg);
    }
    to {
      transform: translate(-50%, 75%) rotateX(180deg);
    }
  }`;

export default Loader;
