import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { HandleMusicService } from 'src/app/service/handle-music.service';
import { PlayPage } from '../play/play.page';

@Component({
  selector: 'app-son',
  templateUrl: './son.page.html',
  styleUrls: ['./son.page.scss'],
})
export class SonPage implements OnInit {

  idAlbum: any;
  tabSon: any = []
  currentTabSon: any
  constructor(private service: HandleMusicService, private modal: ModalController) { }

  async openModalPlay(son: any) {
    const modale = await this.modal.create({
      component: PlayPage
    });

    this.service.loadMusic(son)
    localStorage.setItem("sonIdSelected", JSON.stringify(son.id));
    await modale.present();

  }


  ngOnInit() {
    // this.idAlbum = this.route.snapshot.paramMap.get('id_album')
    // console.log("idAlbum :", this.idAlbum);
    this.idAlbum = localStorage.getItem('albumIdSelected');
    console.log("albumIdSelected :", this.idAlbum);
    this.service.getSon().subscribe((rep: any) => {
      this.tabSon = rep;
      this.currentTabSon = this.tabSon.filter((x: { id_album: any }) => x.id_album == this.idAlbum);
      console.log("currentTabSon :", this.currentTabSon);
    })
  }

}
