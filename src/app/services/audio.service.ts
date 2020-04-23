import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  audioSource = new BehaviorSubject<any>(null);
  audioSourceState = new BehaviorSubject<any>(false);

  audioMemAllocation: HTMLAudioElement = null;
  audioIsPlaying: Boolean = false;

  constructor() {
    this.loadAudioEssentials();

    // load mp3 stream into DOM
    this.audioSource.subscribe(audioElem => {
      this.audioMemAllocation = audioElem;
      this.audioMemAllocation ? document.body.appendChild(this.audioMemAllocation) : console.warn('no source found.');
    });

    // update global status of the audio play/pause state
    this.audioSourceState.subscribe(isPlaying => {
      this.audioIsPlaying = isPlaying;
    });
  }

  playSource() {
    this.audioMemAllocation.play();
    this.audioSourceState.next(true);
  }
  
  stopSource() {
    this.audioMemAllocation.pause();
    this.audioSourceState.next(false);
  }

  loadAudioEssentials() {
    const audioElem = new Audio('https://onlineradiobox.com/json/us/nonstopoldies/play?platform=web');
    audioElem.style.visibility = 'hidden';
    audioElem.style.position = 'absolute';
    
    this.audioSource.next(audioElem);
  }

  destroyAudioEssentials() {
    this.audioMemAllocation.remove();
    this.audioSourceState.next(false);
  }
}
