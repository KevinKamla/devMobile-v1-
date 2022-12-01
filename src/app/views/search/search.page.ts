import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HandleMusicService } from '../../service/handle-music.service';
import { PlayPage } from '../play/play.page';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  tabSon: any = []
  tabSearchResult: any = []
  constructor(private service: HandleMusicService,  private modal: ModalController) { }

  onSearchChange(e: any) {
    let val = e.target.value;
    this.tabSearchResult = this.tabSon.filter((item: { titre: any }) => 
      val == item.titre
      // let txtNom = item.titre ;
      // return txtNom.toLowerCase().indexOf(val.toLowerCase()) > -1;
    );
    console.log("tabSearchResult : ", this.tabSearchResult);
  }

  async openModalPlay(son: any) {
    const modale = await this.modal.create({
      component: PlayPage
    });

    this.service.loadMusic(son)
    localStorage.setItem("sonIdSelected", JSON.stringify(son.id));
    await modale.present();

  }

  ngOnInit() {
    this.service.getSon().subscribe(async (res: any) => {
      this.tabSon = res
      console.log("ListSon: ", this.tabSon)
    });
  }

}
