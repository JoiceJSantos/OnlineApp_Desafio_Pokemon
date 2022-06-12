import {  Component} from '@angular/core';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent  {
 
  
  

  title = 'desafio-pokemon';
  mostrarCards:boolean = false;
  cidadeName:any;
  pokeTipo = '';
  numPok: number | undefined;

  pokemon: any={
   nome:''
  };
  imgDados: any;
  dataTempo:any ={
  cidade: '',
  hora:'',
  temperatura:'',
  tempo: '',
  descricao:''

 };
 dataPoke :any ={};
  erro: any;

 onSubmit(form: NgForm){
  this.cidadeName = form.value.cidade;

   fetch('https://api.openweathermap.org/data/2.5/weather?q='+this.cidadeName+'&appid=8dddf24f00ae6f71d503c186eb571ed7')
   .then(response=>response.json())
   .then(data=>{
     if(data == '404 (Not Found)'){
     }else if(data){
       this.setDataTempo(data);
     }
    })
   .catch(error =>{
     this.erro = 'Cidade Não Encontrada!'
     this.mostrarCards= false;
   })
   

 }

  setDataTempo(data: any){
    this.dataTempo = data;
    this.dataTempo.cidade = this.dataTempo.name;
    this.dataTempo.hora = new Date().toLocaleString();
    this.dataTempo.temperatura = (this.dataTempo.main.temp - 273.15).toFixed(0);
    this.dataTempo.tempo =(this.dataTempo.weather[0]['main']);
    this.dataTempo.descricao = (this.dataTempo.weather[0]['description']);
    this.getDataPoke(this.dataTempo);
    this.mostrarCards = true;
  }
  getDataPoke(dataTempo: any){
 
    if(dataTempo.tempo == 'Rain'){
      this.pokeTipo = 'electric';
    }else{
      if(dataTempo.temperatura < 5){
        this.pokeTipo = 'ice';
      } else if(dataTempo.temperatura >= 5 && dataTempo.temperatura < 10){
        this.pokeTipo = 'water';
      }else if(dataTempo.temperatura >= 12 && dataTempo.temperatura < 15){
        this.pokeTipo = 'grass';
      }else if(dataTempo.temperatura >= 15 && dataTempo.temperatura < 21){
        this.pokeTipo = 'ground';
      }else if(dataTempo.temperatura >= 23 && dataTempo.temperatura < 27){
        this.pokeTipo = 'bug';
      }else if(dataTempo.temperatura >= 27 && dataTempo.temperatura <= 33){
        this.pokeTipo = 'rock';
      }else if(dataTempo.temperatura > 33){
        this.pokeTipo = 'fire';
      }else{
        this.pokeTipo = 'normal';
      }
    }
    fetch('https://pokeapi.co/api/v2/type/'+ this.pokeTipo)
    .then(response=>response.json())
    .then(dataP=>{this.setDataPoke(dataP);})
     
  }
  
  setDataPoke(dataP:any){
   this.dataPoke = dataP;
   let pokemons = this.dataPoke.pokemon;
   
   this.numPok = Math. floor(Math. random() * pokemons.length);
   this.pokemon.nome = pokemons[this.numPok].pokemon.name;
 
   fetch('https://pokeapi.co/api/v2/pokemon/'+this.pokemon.nome)
    .then(response=>response.json())
    .then(dataImg=>{this.setImagePokemon(dataImg);})
    
  }
 
  setImagePokemon(dataImg:any){
    this.imgDados = dataImg;
    this.pokemon.img = this.imgDados.sprites.front_default;
    }
 
}



