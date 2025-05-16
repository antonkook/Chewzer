import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'chewzer'
  private canvas!: HTMLCanvasElement
  private rect!: DOMRect
  private ctx!: CanvasRenderingContext2D
  private isCountdownStarted!: boolean
  private TIMER_MAX: number = 5
  private CIRCLE_RAD: number = 50
  protected timeLeft!: number
  private interval!: ReturnType<typeof setTimeout>
  private players!: Array<[number, number]>
  private playerCount!: number
  private blockDrawing: boolean = true

  ngAfterViewInit(): void {
    this.isCountdownStarted = false
    this.timeLeft = this.TIMER_MAX
    this.players = []
    this.playerCount = 0
    this.canvas = document.getElementById('area') as HTMLCanvasElement
    this.rect = this.canvas.getBoundingClientRect()
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D

    // this.canvas.addEventListener('touchstart', (event) => this.handlePress(event))
    this.canvas.addEventListener('click', (event) => this.handleClick(event))
    
  }

  handleClick(event: MouseEvent) {
    // start countdown if first press
    if (this.isCountdownStarted == false) {
      this.isCountdownStarted = true
      this.blockDrawing = false
      this.startCountdown()
    }
      
    if (!this.blockDrawing) {
      // mouse coordinates
      const mouseX = event.clientX - this.rect.left
      const mouseY = event.clientY - this.rect.top
      const coords: [x: number, y: number] = [mouseX, mouseY]

      // debug
      // console.log(coords)

      // push new player into players array
      this.players.push(coords)  
      this.playerCount++

      this.drawCircle(coords, "rgba(224, 34, 53, 1)", "rgba(46, 6, 6, 1)", this.CIRCLE_RAD)
    }
    
  }

  // handlePress(event: TouchEvent) {
  //   // press coordinates
  //   const mouseX = event.clientX - this.rect.left
  //   const mouseY = event.clientY - this.rect.top
  //   const coords = [mouseX, mouseY]

  //   // debug
  //   console.log(coords)

  //   this.drawCircle(coords)
  // }

  startCountdown() {
    this.interval = setInterval(() => {
      this.timeLeft = Math.max(0, --this.timeLeft);
      if (this.timeLeft == 0) {
        // block drawing
        this.blockDrawing = true

        // reset
        clearInterval(this.interval);
        
        // select winner randomly
        this.selectWinner()
        
        // empty players
        this.playerCount = 0
        while (this.players.length > 0)
          this.players.pop()
      }
    },1000)
  }

  selectWinner() {
    // console.log("we have " + this.playerCount + " players.")
    const winner: number = this.rndInt(0, this.playerCount - 1)
    // console.log("the winner is: " + winner)
    const coords = this.players[winner]

    this.winnerAnimation(coords)
  }

  winnerAnimation(coords: [x: number, y: number]) {
    // parameters
    const framerate = 10;
    const frames = 50;
    const killTime = 2000;
    let timeout = 0;

    // expand ball periodically
    for (let i = 0; i < frames; i++, timeout += framerate) {
      setTimeout(() => {
        const size: number = this.CIRCLE_RAD + 2 * i;
        this.drawCircle(coords, "rgba(255, 243, 212, 0.07)", "rgba(231, 179, 22, 0.07)", size)
      }, timeout);
    }

    // clear canvas after certain time
    setTimeout(() => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.timeLeft = this.TIMER_MAX
      this.isCountdownStarted = false
    }, killTime);
    
  }

  drawCircle(coords: [x: number, y: number], color1: string, color2: string, size: number) {
    let gradient = this.ctx.createRadialGradient(coords[0], coords[1], 0,
       coords[0], coords[1], size)

    gradient.addColorStop(0.10, color1);
    gradient.addColorStop(0.72, color2);
    this.ctx.fillStyle = gradient

    this.ctx.beginPath()
    this.ctx.arc(coords[0], coords[1], size, 0, Math.PI * 2)

    this.ctx.fill()
  }

  rndInt(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
