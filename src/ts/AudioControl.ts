class AudioControl {
  soundPlayer: HTMLAudioElement;
  musicPlayerc: HTMLAudioElement;
  isMuted: boolean;
  theme: string;
  shot: string;
  happy: string;
  error: string;
  click : string
  constructor() {
    this.musicPlayerc = document.getElementsByTagName("audio")[0];
    this.soundPlayer = document.getElementsByTagName("audio")[1];
    this.theme = "./media/audio/theme.mp3";
    this.shot = "./media/audio/shot.wav";
    this.happy = "./media/audio/happy.wav";
    this.error = "./media/audio/denied.wav";
    this.click = "./media/audio/click1.wav"
    this.isMuted = true;
    this.musicPlayerc.src = this.theme
  }

  playMusic(track:string):void {
    this.musicPlayerc.src = track;
    this.musicPlayerc.play()

  }
  playSound(sound:string) :void{
    this.soundPlayer.src = sound;
    this.soundPlayer.play()
   
  }
  playErrorSound(){
    this.playSound(this.error)
  }
  playClickSound(){
    this.playSound(this.click)

  }
  public playWinMucis(){

  }
  public playLoseMusic(){

  }
  toggleMute(){
    this.isMuted = ! this.isMuted
    this.musicPlayerc.muted = this.isMuted
    this.soundPlayer.muted = this.isMuted
    this.soundPlayer.src = ""
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
