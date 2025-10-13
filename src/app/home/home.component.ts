import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('videoRef') videoElement!: ElementRef<HTMLVideoElement>;

  videoStarted = false;

  ngAfterViewInit() {
    const video = this.videoElement.nativeElement;

    video.addEventListener('timeupdate', () => {
      if (video.currentTime >= 29) {
        video.pause();
        video.currentTime = 29;
      }
    });
  }

  startVideo() {
    const video = this.videoElement.nativeElement;
    video.play()
      .then(() => {
        this.videoStarted = true;
      })
      .catch(err => {
        console.error('Erreur lors du lancement de la vidéo :', err);
      });
  }
}
