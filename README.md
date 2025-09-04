# Pomodoro

Pomodoro React app with app theme settings and circular progress bar component.

## Project hightlights

- Countdown component

- Circular progess bar

### Countdown component

To create this component, I would get the **initial time** using the selected time mode (pomodoro / short break / long break) as a key to the timeSettings object inside the application config atom. Then I converted it to seconds by multiplying it by 60, since the initial time for each mode is specified in minutes.

Then I created a **remainingTime** state, because I wanted my component to remember it between renders, and an **isRunning** state to pause the countdown.
I did this by storing the **interval ID** in a refand clearing it before resuming the countdown.

To format the remaining time I used this little function:

```js
  const formatTime = (seconds: number) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };
```

### Circular progress bar

Probably the most difficult part of this project. There are different methods for creating a circular progress bar, but I chose the SVG option because, from what I've heard, it looks better on small devices and simply allows for more customization (for example, rounded cups).
Now you can look at the structure of the Clock component to see how everything is structured. It was a little tricky because of all the paddings in the design of this clock. SVG is essentially a circular bar positioned on top of a rounded div. Two properties were used to display the remaining time on the bar: **stroke-dasharray** and **stroke-dashoffset**. You can read about them in a good article, which I will link to below. The math for the progress is as follows:

```js
const RADIUS = window.matchMedia("(width >= 40rem)").matches ? 170 : 110;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const progress = timeRemaining / INITIAL_TIME_SECONDS;
const strokeDashoffset = CIRCUMFERENCE * (1 - progress);
```

- [A Friendly Introduction to SVG](https://www.joshwcomeau.com/svg/friendly-introduction-to-svg/)
