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

  public isPlay: boolean = false
  tabAlbum: any = [];
  tabSon: any = [];
  currentSon: any;
  sonPrecedent: any;
  currentAlbum: any;
  duration: any;
  min: any;
  sec: any;
  minInit: any = 0;
  secInit: any = 0;
  currentValueDuration: number = 0;
  pauseIcon: string = "pause";
  currentTabSon: any;
  volSon: number = 0.5
  muteIcon: string = "mute"
  sonIsEnd: boolean = false
  gesVol: string = "medium"

  constructor(private modal: ModalController, private service: HandleMusicService) { }

  // Fermeture du modal(page play)
  closeModal() {
    this.modal.dismiss();

  }
  // Modification de l'instance son son 
  rangeChange(e: any) {
    const t = e.target.value
    this.currentValueDuration = t

    if (this.secInit < 59) {
      this.secInit += 1
    } else {
      this.minInit += 1
      this.secInit = 0
      // this.minInit = Math.floor(t / 60)

    }

    if (t == Math.floor(this.duration)) {
      this.pauseIcon = "play"
      // this.currentValueDuration = 0
      this.sonIsEnd = true
      // this.service.playSon(this.currentSon, t)
    }
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
      this.sonIsEnd = false
      this.pauseIcon = "play"
      this.service.pause(this.currentSon)
    } else {
      this.pauseIcon = "pause"
      if (this.sonIsEnd) {
        this.currentValueDuration = 0;
        this.service.playSon(this.currentSon, 0.0)
      } else this.service.resume(this.currentSon)
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
    this.minInit = 0
    this.secInit = 0
    this.sonIsEnd = true
  }

  //   ================== Gestion du volume ======================

  plus() {
    if (this.gesVol == "mute") {
      this.gesVol = "low"
    } else {
      if (this.gesVol == "low") {
        this.gesVol = "medium"
        this.service.setVolume(this.currentSon, this.volSon + 0.2);
        this.volSon += 0.2;
      } else
        if (this.gesVol == "medium") {
          this.gesVol = "high"
          this.service.setVolume(this.currentSon, this.volSon + 0.2);
          this.volSon += 0.2;
        } else {
          if (this.gesVol == "high") {
            this.service.setVolume(this.currentSon, this.volSon + 0.2);
            this.volSon += 0.2;
          }
        }
    }
  }

  manus() {
    if (this.gesVol == "high") {
      this.gesVol = "medium"
      this.service.setVolume(this.currentSon, this.volSon - 0.2);
      this.volSon -= 0.2;
    } else {
      if (this.gesVol == "medium") {
        this.gesVol = "low"
        this.service.setVolume(this.currentSon, this.volSon - 0.2);
        this.volSon -= 0.2;
      } else {
        this.gesVol = "mute"
        this.service.setVolume(this.currentSon, this.volSon - 0.2);
        this.volSon -= 0.2;
      }
    }
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
    this.sonPrecedent = this.tabSon.filter((x: { id: any }) => x.id == sonIdPreview)[0];
    this.isPlay ? this.service.stopSon(this.sonPrecedent) : "";
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
        this.isPlay = true
      }

      // ===================== Duree du son ====================================  
      setTimeout(() => {
        this.service.getDuration(this.currentSon).then((e) => {
          this.duration = e.duration;
          this.min = Math.floor(this.duration / 60)
          this.sec = Math.floor(this.duration - this.min * 60)
          console.log("min : ", this.min, "sec : ", this.sec)
        })
      }, 1000)

      setInterval(() => {
        console.log("range courrant : ", this.currentValueDuration, "\n duree : ", Math.floor(this.duration))
        if (this.currentValueDuration == Math.floor(this.duration)) {

        } else {
          this.currentValueDuration += 1
          console.log("progress bar ..... : ", this.currentValueDuration);
        }
      }, 1000)
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
