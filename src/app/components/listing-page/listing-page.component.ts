import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import  {constant}  from 'src/assets/app.constants/app.constants';
import { GitModel } from 'src/app/model/data.model';
import { first } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

 
@Component({
  selector: 'app-listing-page',
  templateUrl: './listing-page.component.html',
  styleUrls: ['./listing-page.component.css']
})
export class ListingPageComponent implements OnInit {

  constructor( public http:HttpClient) { 
  
  }

  public url = constant.url;

  public data:Array<GitModel> = new Array<GitModel>();
  contents:any;
  public arr = new Array()
  public val :any;

  ngOnInit(): void {

    this.http.get(this.url).subscribe(response=>{
      this.contents = response as string
      this.arr.push(this.contents.items)
     // console.log(this.arr[0][0].stargazers_count)
      
      for( var x =0;x<this.arr[0].length;x++){
        var data_model:GitModel = new GitModel()
        data_model.name = this.arr[0][x].name
        data_model.full_name = this.arr[0][x].full_name
        data_model.description = this.arr[0][x].description
        data_model.owner_login = this.arr[0][x].owner.login 
        data_model.stargazers_count = this.arr[0][x].stargazers_count
        data_model.forks_count = this.arr[0][x].forks_count
        data_model.language = this.arr[0][x].language
        
        this.data.push(data_model);

      }

      this.firstpage()
      console.log(this.val)
    
    })

    
   
      


    
  }



  //LOGIC FOR SEARCHING 
  term :string = '';
  searchVal(term:string){
    
    var searchArr:Array<GitModel> = new Array<GitModel>();
    this.term = term.toLowerCase()
    for(var i = 0;i<this.data.length;i++){
      if(this.term == this.data[i].name.toLowerCase() || this.term == this.data[i].language.toLowerCase()){
        searchArr.push(this.data[i])
      }
    }
    this.pagination_data = searchArr;
    if(term == '') this.firstpage()
  }


  //Sorting data 
  sortascs(){
    for(var i =0;i<this.data.length;i++){
      for(var j=i+1;j<this.data.length;j++){
        if(this.data[i].stargazers_count > this.data[j].stargazers_count){
          var temp:GitModel = new GitModel();
          temp = this.data[j];
          this.data[j] = this.data[i];
          this.data[i] = temp;
        }
      }
    }
    this.firstpage()
  }
  sortdscs(){
    for(var i =0;i<this.data.length;i++){
      for(var j=i+1;j<this.data.length;j++){
        if(this.data[i].stargazers_count < this.data[j].stargazers_count){
          var temp:GitModel = new GitModel();
          temp = this.data[j];
          this.data[j] = this.data[i];
          this.data[i] = temp;
        }
      }
    }
    this.firstpage()
  } 

  sortascn(){
    this.data.sort((a, b) => a.name.localeCompare(b.name))
    this.firstpage()
  }

  sortdscn(){
    this.data.sort((a, b) => b.name.localeCompare(a.name))
    this.firstpage()
  }




  // LOGIC FOR PAGINATION
   start_page = 0;
   current_page = this.start_page;
   end_size = 4;


   pagination_data:Array<GitModel> = new Array<GitModel>();


  firstpage(){
    this.current_page = 0
    this.end_size = 4
    this.pagination_data = new Array<GitModel>();
    for(var i=0;i<this.end_size;i++){
    this.pagination_data.push(this.data[i]);
    }
  };

  lastpage(){
    this.current_page = this.data.length-4
    this.end_size = this.data.length
    this.pagination_data = new Array<GitModel>();
    for(var i=this.data.length-4;i<this.data.length;i++){
    this.pagination_data.push(this.data[i]);
    }

  }

  nextpage(){
    
    this.current_page += 4
    this.end_size +=4
    this.pagination_data = new Array<GitModel>();
    for(var i=this.current_page;i<this.end_size;i++){
    this.pagination_data.push(this.data[i]);  
  }
  if(this.current_page > (this.data.length -4) ){
    this.lastpage();
  }
  
  }

  backpage(){
    this.current_page -= 4
    this.end_size -=4
    this.pagination_data = new Array<GitModel>();
    for(var i=this.current_page;i<this.end_size;i++){
    this.pagination_data.push(this.data[i]);  
  }
  if(this.current_page < 4 ){
    this.firstpage();
  }
  

  }








}
