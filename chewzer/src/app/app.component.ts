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

  ngAfterViewInit(): void {
    this.canvas = document.getElementById('area') as HTMLCanvasElement
    this.rect = this.canvas.getBoundingClientRect()
    this.canvas.addEventListener('click', (event) => this.handleClick(event))
    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D
    // this.canvas.addEventListener('touchstart', (event) => this.handlePress(event))
  }

  

  handleClick(event: MouseEvent) {
    // mouse coordinates
    const mouseX = event.clientX - this.rect.left
    const mouseY = event.clientY - this.rect.top
    const coords: [x: number, y: number] = [mouseX, mouseY]

    // debug
    console.log(coords)

    this.drawCircle(coords)
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

  drawCircle(coords: [x: number, y: number]) {
    this.ctx.beginPath()
    this.ctx.arc(coords[0], coords[1], 50, 0, Math.PI * 2)
    this.ctx.fillStyle = 'rgb(112, 2, 2)'
    this.ctx.fill()
  }

}
