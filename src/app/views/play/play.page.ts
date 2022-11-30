import { Component, OnInit } from '@angular/core';
import { NativeAudio } from '@capacitor-community/native-audio';
import { ModalController } from '@ionic/angular';
import { time } from 'console';
import { HandleMusicService } from 'src/app/service/handle-music.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {

  tabAlbum: any = [];
  tabSon: any = [];
  currentSon: any;
  currentAlbum: any;
  duration: any;
  min: any;
  sec: any;
  minInit: any = 0;
  secInit: any = 0;
  currentValueDuration: number = 0;
  pauseIcon: string = "pause";
  currentTabSon: any;
  volSon: number = 0.4
  muteIcon: string = "mute"
  temps:any = 1000

  constructor(private modal: ModalController, private service: HandleMusicService) { }

  // Fermeture du modal(page play)
  closeModal() {
    this.modal.dismiss();
  }

  // Son precedent

  previewSon() {
    const i = this.currentTabSon.indexOf(this.currentSon)
    this.service.stopSon(this.currentSon)
    if (i == 0) {
      this.currentValueDuration = 0
      this.service.loadMusic(this.currentTabSon[this.currentTabSon.length - 1])
      this.service.playSon(this.currentTabSon[this.currentTabSon.length - 1], 0.0)
      this.currentSon = this.currentTabSon[this.currentTabSon.length - 1]
    } else {
      this.currentValueDuration = 0
      this.service.loadMusic(this.currentTabSon[i - 1])
      this.service.playSon(this.currentTabSon[i - 1], 0.0)
      this.currentSon = this.currentTabSon[i - 1]
    }
  }

  // Pause au son 

  pauseSon() {
    if (this.pauseIcon == "pause") {
      this.pauseIcon = "play"
      this.service.pause(this.currentSon)
    } else {
      this.pauseIcon = "pause"
      this.service.resume(this.currentSon)
    }
  }

  // Son suivant 

  nextSon() {
    const i = this.currentTabSon.indexOf(this.currentSon)
    this.service.stopSon(this.currentSon)
    console.log(" Taille du tab", this.currentTabSon.length);
    if (i == (this.currentTabSon.length - 1)) {
      this.currentValueDuration = 0
      this.service.loadMusic(this.currentTabSon[0])
      this.service.playSon(this.currentTabSon[0], 0.0)
      this.currentSon = this.currentTabSon[0]
    } else {
      this.currentValueDuration = 0
      this.service.loadMusic(this.currentTabSon[i + 1])
      this.service.playSon(this.currentTabSon[i + 1], 0.0)
      this.currentSon = this.currentTabSon[i + 1]
    }
  }

  stopSon() {
    this.service.stopSon(this.currentSon)
    this.currentValueDuration = Math.floor(this.duration)
    this.pauseIcon = "play"
  }

  // Modification de l'instance son son 
  rangeChange(e: any) {
    const t = e.target.value
    // console.log("time change : ", t);
    this.currentValueDuration = t
    this.minInit = Math.floor(t / 60)
    this.secInit = Math.floor(((t / 60) - this.minInit / 60) * 60)
    this.service.playSon(this.currentSon, t)
  }

  // Baisser le volume
  volMoin() {
    this.service.setVolume(this.currentSon, this.volSon - 0.1);
    this.volSon -= 0.1;
  }

  // Augmenter le volume
  volPlus() {
    this.service.setVolume(this.currentSon, this.volSon + 0.1);
    this.volSon += 0.1;
  }

  // Augmenter le volume
  mute() {
    if (this.muteIcon == "mute") {
      this.muteIcon = "high"
      this.service.setVolume(this.currentSon, 0.0);
    } else {
      this.muteIcon = "mute"
      this.service.setVolume(this.currentSon, this.volSon);
    }
  }

  // Repeter le son a la fin de la lecture
  repete() {
    this.service.repete(this.currentSon)
  }
  // =========================================== OnInit ==========================================
  ngOnInit() {
    var sonIdPreview = localStorage.getItem('sonIdPreview');
    var sonId = (localStorage.getItem('sonIdSelected'));
    localStorage.removeItem("sonIdSelected")
    localStorage.setItem("sonIdPreview", JSON.stringify(sonId));

    // ============================= Les sons ===============================
    this.service.getSon().subscribe(async (res: any) => {
      this.tabSon = res
      console.log("ListSon: ", this.tabSon)
      console.log("sonId :", sonId, "sonIdPreview :", sonIdPreview);
      if (sonId == sonIdPreview) {

      } else {
        this.currentSon = this.tabSon.filter((x: { id: any }) => x.id == sonId)[0];
        console.log(" son courant : ", this.currentSon)
        this.service.playSon(this.currentSon, 0.0)
      }

      // ===================== Duree du son ====================================  
      setTimeout(() => {
        this.service.getDuration(this.currentSon).then((e) => {
          this.duration = e.duration;
          this.min = Math.floor(this.duration / 60)
          this.sec = Math.floor(((this.duration / 60) - this.min / 60) * 60)
          console.log("min : ", this.min, "sec : ", this.sec)
        })
        
        setInterval(() => {
          console.log("duree son : ", this.duration)
          if (this.currentValueDuration == Math.floor(this.duration)) {
            this.temps = null
          } else {
            this.currentValueDuration += 1
            console.log("progress bar ..... : ", this.currentValueDuration);
          }
        },  this.temps)
      }, this.temps)
    });
    // ===================== Les albums =====================================================

    this.service.getAlbum().subscribe((res: any) => {
      this.tabAlbum = res
      console.log("album  : ", this.tabAlbum)

      this.currentAlbum = this.tabAlbum.filter((item: { id: any }) => item.id == this.currentSon.id_album)[0]
      console.log("album courant : ", this.currentAlbum)

      this.currentTabSon = this.tabSon.filter((item: { id_album: any }) => item.id_album == this.currentSon.id_album);
      console.log("currentTabSon :", this.currentTabSon)
    });
  }
}
