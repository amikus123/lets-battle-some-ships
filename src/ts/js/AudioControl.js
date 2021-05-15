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
        this.click = "./media/audio/click1.wav";
        this.miss = "./media/audio/miss.wav";
        this.lost = "./media/audio/mario2.m4a";
        this.explosion = "./media/audio/explosion.wav";
        this.isMuted = true;
        this.playDefaultMusic();
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
    playClickSound() {
        this.playSound(this.click);
    }
    playMissSound() {
        this.playSound(this.miss);
    }
    playHitSound() {
        this.playSound(this.shot);
    }
    playSunkSound() {
        this.playSound(this.explosion);
    }
    playDefaultMusic() {
        this.playMusic(this.theme);
    }
    playWinMucis() {
        console.log("won");
        this.playMusic(this.happy);
    }
    playLoseMusic() {
        console.log("lost");
        this.playMusic(this.lost);
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
