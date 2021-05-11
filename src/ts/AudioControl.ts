class AudioControl {
  soundPlayer: HTMLAudioElement;
  musicPlayerc: HTMLAudioElement;
  isMuted: boolean;
  theme: string;
  shot: string;
  happy: string;
  denied: string;
  constructor() {
    this.musicPlayerc = document.getElementsByTagName("audio")[0];
    this.soundPlayer = document.getElementsByTagName("audio")[1];
    this.theme = "./media/audio/theme.mp3";
    this.shot = "./media/audio/shot";
    this.happy = "./media/audio/happy";
    this.denied = "./media/audio/denied";
    this.isMuted = true;
  }

  playMusic(track:string):void {
    this.musicPlayerc.src = track;
    this.musicPlayerc.play();
    if (!this.isMuted) {
    }
  }
  playSound(sound:string) :void{
    this.soundPlayer.src = sound;
    this.soundPlayer.play();
    if (!this.isMuted) {
    }
  }
  toggleMute(){
    this.playMusic(this.theme)
    this.isMuted = ! this.isMuted
    this.musicPlayerc.muted = this.isMuted
    this.soundPlayer.muted = this.isMuted
    if(this.isMuted){
      this.soundPlayer.pause()
      this.musicPlayerc.pause()

    }else{
      this.soundPlayer.play()
      this.musicPlayerc.play()
    }

  }
}
export default AudioControl;
