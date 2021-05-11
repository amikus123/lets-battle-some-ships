"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AudioControl {
    constructor() {
        this.musicPlayerc = document.getElementsByTagName("audio")[0];
        this.soundPlayer = document.getElementsByTagName("audio")[1];
        this.theme = "./media/audio/theme.mp3";
        this.shot = "./media/audio/shot";
        this.happy = "./media/audio/happy";
        this.denied = "./media/audio/denied";
        this.isMuted = true;
    }
    playMusic(track) {
        this.musicPlayerc.src = track;
        this.musicPlayerc.play();
        if (!this.isMuted) {
        }
    }
    playSound(sound) {
        this.soundPlayer.src = sound;
        this.soundPlayer.play();
        if (!this.isMuted) {
        }
    }
    toggleMute() {
        this.playMusic(this.theme);
        this.isMuted = !this.isMuted;
        this.musicPlayerc.muted = this.isMuted;
        this.soundPlayer.muted = this.isMuted;
        if (this.isMuted) {
            this.soundPlayer.pause();
            this.musicPlayerc.pause();
        }
        else {
            this.soundPlayer.play();
            this.musicPlayerc.play();
        }
    }
}
exports.default = AudioControl;
