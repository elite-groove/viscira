import { Component } from '@angular/core';
import { AudioService } from '../services/audio.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isAudioSourcePlaying = false;

  constructor(private audioService: AudioService) {
    this.audioService.audioSourceState.subscribe(isPlaying => {
      this.isAudioSourcePlaying = isPlaying;
    });
  }

  startPlaying() {
    this.audioService.playSource();
  }

  stopPlaying() {
    this.audioService.stopSource();
  }

}
