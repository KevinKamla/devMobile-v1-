import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { NativeAudio } from '@capacitor-community/native-audio';

@Injectable({
  providedIn: 'root'
})
export class HandleMusicService {

  constructor(private http: HttpClient) { }

  getSon() {
    return this.http.get("assets/jsons/sons.json")
  }

  getAlbum() {
    return this.http.get("assets/jsons/album.json")
  }


  async loadMusic(son: any) {
    await NativeAudio.preload({
      assetId: son.id.toString(),
      assetPath: son.path_son,
      audioChannelNum: 1,
      isUrl: false
    })
  }

  playSon(son: any, t: number) {
    NativeAudio.play({
      assetId: son.id.toString(),
      time: t
    });
  }

  stopSon(son: any) {
    NativeAudio.stop({
      assetId: son.id.toString(),
    });
  }

  async getDuration(son: any) {
    return await NativeAudio.getDuration({
      assetId: son.id.toString(),
    });
  }


  pause(son: any) {
    NativeAudio.pause({
      assetId: son.id.toString(),
    });
  }

  resume(son: any) {
    NativeAudio.resume({
      assetId: son.id.toString(),
    });
  }

  repete(son: any) {
    NativeAudio.loop({
      assetId: son.id.toString()
    });
  }

  unload(son: any) {
    NativeAudio.unload({
      assetId: son.id.toString()
    });
  }

  setVolume(son: any, vol: number) {
    NativeAudio.setVolume({
      assetId: son.id.toString(),
      volume: vol
    });
  }





}

