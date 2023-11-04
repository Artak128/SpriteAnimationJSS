import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * It takes a number of rows and columns, a width and height, and a starting and ending frame, and
 * returns a string of keyframes.
 * @param [row] - number of rows in the sprite sheet
 * @param [col] - number of columns in the sprite sheet
 * @param [width] - width of each frame
 * @param [height] - The height of each frame in the sprite sheet.
 * @param [finishFrame] - The last frame of the animation. Not included current frame when have startFrame!!!
 * @param [startingFrame] - The frame you want to play from.
 * @param [cssUnit] - Which css unit use for width and height of frames.
 * @returns A string of CSS keyframes.
 */
function KeyframeGen(row, col, width, height, finishFrame, startingFrame, cssUnit) {
  // Initialize an empty string to store the generated CSS keyframes.
  let frames = ``;
  // Initial horizontal index for the first frame.
  let widthIndex =
    (startingFrame &&
      (startingFrame <= col ? startingFrame - 1 : startingFrame % col > 0 ? (startingFrame % col) - 1 : col - 1)) ||
    0;
  // Initial vertical index for the first frame.
  let heightIndex =
    startingFrame && startingFrame > col
      ? startingFrame % col > 0
        ? Math.trunc(startingFrame / col)
        : startingFrame / col - 1
      : 0;
  // Total number of frames to generate based on the play and end frames.
  const framesCount = startingFrame
    ? startingFrame && finishFrame
      ? finishFrame - startingFrame
      : row * col - startingFrame + 1
    : finishFrame || row * col;
  // Percentage change per frame.
  const percent = 100 / framesCount;

  for (let i = 0; i < framesCount; i++) {
    const positionX = `${width * widthIndex}${cssUnit}`;
    const positionY = `${height * heightIndex}${cssUnit}`;
    const property = `transform: translate(-${positionX}, -${positionY})`;
    // Add the CSS keyframe to the 'frames' string.
    frames += `${Math.floor(percent * i * 100) / 100}% {${property}}`;
    // If it's the last frame, also add a keyframe at 100%.
    if (i + 1 >= framesCount) {
      frames += `100% {${property}}`;
    }
    // Update the horizontal and vertical indices for the next frame.
    if (widthIndex + 1 === col) {
      widthIndex = 0;
      heightIndex += 1;
    } else {
      widthIndex += 1;
    }
  }
  return frames;
}

const AllFrames = styled.div`
  ${({
    width,
    height,
    columnCount,
    cssUnit,
    url,
    uniqKey,
    fps,
    rowCount,
    startingFrame,
    finishFrame,
    delay,
    loop,
    loopCount,
    play,
    forwards,
  }) => `
width: ${width * columnCount}${cssUnit};
height: ${height * rowCount}${cssUnit};
background: url(${url}) no-repeat 0 0/100% 100%;
animation: frames${uniqKey} ${((rowCount * columnCount - startingFrame) * 1000) / fps}ms
  steps(1) ${delay}ms ${loop ? "infinite" : loopCount || ""}
  ${forwards ? "forwards" : "backwards"} ${play ? "" : "paused"};

@keyframes frames${uniqKey} {
  ${KeyframeGen(rowCount, columnCount, width, height, finishFrame, startingFrame, cssUnit)}
}
`}
`;

const Container = styled.div`
  ${({ width, height, cssUnit }) => `
    width: ${width}${cssUnit};
    height: ${height}${cssUnit};
    overflow: hidden;
  `}
`;

function SpriteAnimation({
  uniqKey,
  width,
  cssUnit,
  height,
  rowCount,
  columnCount,
  url,
  loop,
  loopCount,
  play,
  fps,
  onAnimationEnd,
  onIteration,
  finishFrame,
  startingFrame,
  delay,
  forwards,
  classNames,
}) {
  return (
    <Container width={width} height={height} cssUnit={cssUnit} className={classNames}>
      <AllFrames
        key={uniqKey}
        uniqKey={uniqKey}
        width={width}
        cssUnit={cssUnit}
        height={height}
        rowCount={rowCount}
        columnCount={columnCount}
        url={url}
        play={play}
        loop={loop}
        loopCount={loopCount}
        onAnimationEnd={onAnimationEnd}
        omAnimationIteration={onIteration}
        fps={fps}
        finishFrame={finishFrame}
        startingFrame={startingFrame}
        delay={delay}
        forwards={forwards}
      />
    </Container>
  );
}

SpriteAnimation.propTypes = {
  classNames: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  uniqKey: PropTypes.any,
  width: PropTypes.number,
  cssUnit: PropTypes.string,
  height: PropTypes.number,
  rowCount: PropTypes.number.isRequired,
  columnCount: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  play: PropTypes.any,
  loop: PropTypes.bool,
  loopCount: PropTypes.any,
  fps: PropTypes.number,
  onAnimationEnd: PropTypes.func,
  onIteration: PropTypes.func,
  finishFrame: PropTypes.any,
  startingFrame: PropTypes.number,
  delay: PropTypes.number,
  forwards: PropTypes.bool,
};

SpriteAnimation.defaultProps = {
  uniqKey: 0,
  width: 0,
  height: 0,
  rowCount: 0,
  columnCount: 0,
  cssUnit: "px",
  url: "",
  play: false,
  loop: false,
  loopCount: null,
  fps: 30,
  onAnimationEnd: () => {},
  onIteration: () => {},
  finishFrame: null,
  startingFrame: 0,
  delay: 0,
  forwards: false,
  classNames: "",
};

export default SpriteAnimation;
