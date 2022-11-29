import { Component, OnInit } from '@angular/core';
import { IonItem, ModalController } from '@ionic/angular';
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
  currentValueDuration: number = 0;
  pauseIcon: string = "pause";
  currentTabSon: any;
  volSon: number = 0.4
  muteIcon: string = "mute"

  constructor(private modal: ModalController,
    private service: HandleMusicService) { }

  // Fermeture du modal(page play)
  closeModal() {
    this.modal.dismiss();
  }

  // Son precedent

  previewSon() {
    const i = this.currentTabSon.indexOf(this.currentSon)
    if (i == 0) {
      // this.service.playSon(this.currentTabSon[this.currentTabSon.lenght - 1])
    } else {
      // this.service.playSon(this.currentTabSon[i-1])
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
    if (i == (this.currentTabSon.lenght - 1)) {
      // this.service.playSon(this.currentTabSon[0])
    } else {
      // this.service.playSon(this.currentTabSon[i+1])
    }
  }

  // Modification de l'instance son son 
  rangeChange(e: any) {
    const t = e.target.value
    this.currentValueDuration = t
    // this.service.playSon(son, t)
  }

  // Baisser le volume
  volMoin() {
    // this.service.setVolume(this.currentSon, this.volSon-0.1);
    // this.volSon -= 0.1;  
  }

  // Augmenter le volume
  volPlus() {
    // this.service.setVolume(this.currentSon, this.volSon+0.1);
    // this.volSon += 0.1;  
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

  }


  ngOnInit() {
    var son = (localStorage.getItem('sonSelected'));
    this.currentSon = son
    console.log(" son courant : ", this.currentSon)
    // localStorage.removeItem("sonSelected")
    this.service.playSon(son, 0.0)
    this.service.getSon().subscribe((res: any) => {
      this.tabSon = res
    });

    this.service.getAlbum().subscribe((res: any) => {
      this.tabAlbum = res
      console.log("album courant : ", this.tabAlbum)
      this.currentAlbum = this.tabAlbum.filter((item: any) => {
        item.id == this.currentSon.id_album
      })
      console.log("album courant : ", this.currentAlbum)
    });

    // Duree du son 
    this.duration = this.service.getDuration(son)
    console.log("duree son : ", this.duration)
//
    this.currentTabSon = this.tabSon.filter((item: any) => {
      item.id_album = this.currentSon.id_album;
    });


  }

}
