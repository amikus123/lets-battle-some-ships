"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AudioControl {
    constructor() {
        this.musicPlayerc = document.getElementsByTagName("audio")[0];
        this.soundPlayer = document.getElementsByTagName("audio")[1];
        this.theme = "./media/audio/theme.mp3";
        this.shot = "./media/audio/shot.wav";
        this.happy = "./media/audio/happy.wav";
        this.error = "./media/audio/denied.wav";
        this.isMuted = true;
        this.musicPlayerc.src = this.theme;
    }
    playMusic(track) {
        this.musicPlayerc.src = track;
        this.musicPlayerc.play();
    }
    playSound(sound) {
        this.soundPlayer.src = sound;
        this.soundPlayer.play();
    }
    playErrorSound() {
        this.playSound(this.error);
    }
    playWinMucis() {
    }
    playLoseMusic() {
    }
    toggleMute() {
        this.isMuted = !this.isMuted;
        this.musicPlayerc.muted = this.isMuted;
        this.soundPlayer.muted = this.isMuted;
        this.soundPlayer.src = "";
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
