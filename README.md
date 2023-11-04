# React CSS Sprite Animation

A React component for sprite animations that leverages the power of CSS for smooth and efficient animations.


## Installation

Install this package via npm or yarn:

npm i @m.a.g/spriteanimation

## Usage
```JSX
import React from 'react';
import SpriteAnimation from '@m.a.g/spriteanimation';

function App() {
  return (
    <div>
       <SpriteAnimation
      width={100} // Width of a single sprite frame in pixels
      cssUnit="px" // CSS unit for width and height
      height={100} // Height of a single sprite frame in pixels
      rowCount={4} // Number of rows in the sprite sheet
      columnCount={4} // Number of columns in the sprite sheet
      url="/path/to/your/sprite.png" // URL to the sprite sheet image
      play // Start the animation immediately
      loop // Enable looping
      fps={30} // Frames per second
      onAnimationEnd={handleAnimationEnd} // Animation completion callback
    />
    </div>
  );
}

export default App;
```
## Props 

.{uniqKey} 
(any, optional)
A unique key to identify the component when rendering multiple instances. By default, it's set to 0.(When chaged uniqKey Component will rerender and generate animation again)

.{width} 
(number, optional)
The width of a single sprite frame in pixels. By default, it's set to 0.

.{cssUnit} 
(string, optional)
The CSS unit to be used for the width and height values (e.g., 'px', 'em', '%'). By default, it's set to 'px'.

.{height} 
(number, optional)
The height of a single sprite frame in pixels. By default, it's set to 0.

.{rowCount} 
(number, required)
The number of rows in the sprite sheet.

.{columnCount} 
(number, required)
The number of columns in the sprite sheet.

.{url} 
(string, optional)
The URL to the sprite sheet image. By default, it's an empty string.

.{play} 
(any, optional)
Set to true to start the animation immediately upon component mount. By default, it's set to false.Set false for pause animation.

.{loop} 
(boolean, optional)
Set to true to enable looping of the animation, false to play it only once. By default, it's set to false.

.{loopCount} 
(any, optional)
The number of times to loop the animation. Set to null for unlimited loops. By default, it's set to null.

.{fps} 
(number, optional)
The frames per second (FPS) for the animation. By default, it's set to 30.

.{onAnimationEnd} 
(function, optional)
A callback function to be called when the animation completes. By default, it's an empty function.

.{onIteration} 
(function, optional)
A callback function to be called at the end of each iteration (loop). By default, it's an empty function.

.{finishFrame} 
(any, optional)
The frame at which the animation should finish. If specified, the animation will stop at this frame. By default, it's set to null.

.{startingFrame} 
(number, optional)
The frame at which the animation should start. If specified, the animation will start from this frame. By default, it's set to 0.

.{delay} 
(number, optional)
A delay in milliseconds before starting the animation. By default, it's set to 0.

.{forwards} 
(boolean, optional)
Set to true to play the animation forwards, false to reverse it. By default, it's set to false.

## Features

.Smooth and efficient sprite animations using CSS.

.!We know JavaScript in Single Thread and sometimes there are problems with performance. 
This component differs in that the animation works using the CSS rendering engine and the majority of the animation work uses the GPU resource.

.Customizable animation duration, frame dimensions, and more.

## Examples in CodeSandbox
https://codesandbox.io/s/sprite-component-forked-gtrxkn?file=/src/index.js

## License
This project is licensed under the MIT License.

## Support and Contact
If you encounter issues or have questions, feel free to open a GitHub issue or reach out to us at artak20049@gmail.com.