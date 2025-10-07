import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from "@angular/core";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('videoRef') videoElement!: ElementRef<HTMLVideoElement>;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const video = this.videoElement.nativeElement;

    video.addEventListener('timeupdate', () => {
      if (video.currentTime >= 29) {
        video.pause();
        video.currentTime = 29; // Assure l'arrêt à 29s exact
      }
    });
  }
}
