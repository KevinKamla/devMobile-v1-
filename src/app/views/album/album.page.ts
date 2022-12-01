import { Component, OnInit } from '@angular/core';
import { HandleMusicService } from 'src/app/service/handle-music.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.page.html',
  styleUrls: ['./album.page.scss'],
})
export class AlbumPage implements OnInit {

  tabAlbum: any = []
  tabSon: any = []
  nbSonOfAlbum: any = 0

  constructor(private service: HandleMusicService) { }

  navigate(item: any) {
    localStorage.setItem("albumIdSelected",item.id);
  }
  ngOnInit() {
    this.service.getAlbum().subscribe((res: any) => {
      this.tabAlbum = res
      console.log("album  : ", this.tabAlbum)

    });

    this.service.getSon().subscribe(async (res: any) => {
      this.tabSon = res
      console.log("ListSon: ", this.tabSon)

      this.tabAlbum.forEach((album: any) => {
        this.tabSon.forEach((son: any) => {
          if (son.id_album == album.id) album.nbSon += 1
        });
      });
    });



  }

}
