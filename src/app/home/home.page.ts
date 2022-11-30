import { Component } from '@angular/core';
import { HandleMusicService } from '../service/handle-music.service';
import { PlayPage } from '../views/play/play.page';
import { IonRouterOutlet, ModalController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private HandleMusicService: HandleMusicService,
    private modal: ModalController, private routerOutlet: IonRouterOutlet) { }

  miniListSon: any = []
  ListSon: any = []

  swipper = {
    slidesPerView: 1.3,
    centeredSlides: true,
    loop: true,
    spaceBetween: -20,
    autoplay: true,
  }

  async openModalPlay(son:any) {
    const modale = await this.modal.create({
      component: PlayPage,
      swipeToClose:true,
      presentingElement: await this.modal.getTop() 
    });
    
    this.HandleMusicService.loadMusic(son)
    localStorage.setItem("sonIdSelected", JSON.stringify(son.id));
    await modale.present();

  }


  play(son: any) {
    this.HandleMusicService.loadMusic(son);
    this.HandleMusicService.playSon(son, 0.0)
  }



  ngOnInit() {
    this.HandleMusicService.getSon().subscribe((rep:any) => {
      this.ListSon = rep;
      const List: any = [this.ListSon[0], this.ListSon[6], this.ListSon[12], this.ListSon[17], this.ListSon[23]]
      this.miniListSon = List
      console.log("ListSon", this.ListSon)
      console.log("miniListSon", this.miniListSon)
    });

  }

}
