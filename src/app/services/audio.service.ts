import { Injectable } from '@angular/core';
import { MusicControls } from '@ionic-native/music-controls/ngx';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  audioSource = new BehaviorSubject<any>(null);
  audioSourceState = new BehaviorSubject<any>(false);

  audioMemAllocation: HTMLAudioElement = null;
  audioIsPlaying: Boolean = false;

  constructor(private musicControls: MusicControls) {
    this.loadAudioEssentials();
    // this.cordovaAudioInit();

    // load mp3 stream into DOM
    this.audioSource.subscribe(audioElem => {
      this.audioMemAllocation = audioElem;
      this.audioMemAllocation ? (document.body.appendChild(this.audioMemAllocation)) : console.warn('no source found.');
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
    const audioElem = new Audio('http://radio.globaltranceinvasion.com:8000/iua_gtiradio');
    audioElem.style.visibility = 'hidden';
    audioElem.style.position = 'absolute';

    this.audioSource.next(audioElem);
  }

  destroyAudioEssentials() {
    this.audioMemAllocation.remove();
    this.audioSourceState.next(false);
  }

  cordovaAudioInit() {
    try {
      this.musicControls.create({
        track: 'Relaxation Time',        // optional, default : ''
        artist: 'Viscira',                       // optional, default : ''

        // album       : 'Absolution',     // optional, default: ''
        hasScrubbing: false, // enable scrubbing from control center and lockscreen progress bar, optional

        // Android only, optional
        // text displayed in the status bar when the notification (and the ticker) are updated, optional
        ticker: 'Viscira Relax App',
        // All icons default to their built-in android equivalents
        playIcon: 'media_play',
        pauseIcon: 'media_pause',
      });

      this.musicControls.subscribe().subscribe(action => {
        const message = JSON.parse(action).message;
        switch (message) {
          case 'music-controls-pause':
            this.stopSource();
            break;
          case 'music-controls-play':
            this.playSource();
            break;
        }
      });

      this.musicControls.listen();
    } catch (e) {
      alert('web browser or not compatible with device.');
    }
  }
}
