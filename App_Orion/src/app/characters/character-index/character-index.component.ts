import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-character-index',
  imports: [],
  templateUrl: './character-index.component.html',
  styleUrl: './character-index.component.css'
})
export class CharacterIndexComponent implements OnInit  {
  img_placeholder = 'assets/images/placeholder.png';

  onTabClick(event: MouseEvent) {
    const tabActive = document.querySelector('.tab-active') as HTMLElement;
    let classBase = 'px-2 py-1 h-full w-full flex justify-center items-center tab' as string;

    tabActive.className = classBase;

    const targetElement = event.target as HTMLElement;
    targetElement.className += '-active';

    const targetElementValue = event.target as HTMLElement;
    const datasetTab = targetElementValue.dataset['tab'];
    

    const tabContents = document.querySelectorAll('.tab-content') as NodeListOf<HTMLButtonElement>;
    classBase = 'tab-content py-1 px-4 flex flex-col gap-4' as string;
    tabContents.forEach(tabContent => {
      
      tabContent.className = classBase;
      if (tabContent.id != datasetTab) {
        tabContent.className += ' hidden';
      }
      
    });
    
  }

  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    this.auto_init_page();
    this.auto_init_momentos_epicos();
    this.auto_init_pasivas();
    this.auto_init_check();
    this.button_init_editar_personaje();
    this.button_init_guardar_personaje();
  }

  auto_init_page() {
    /* let personaje_cache = localStorage.getItem('personaje_cache') as string;

    if (personaje_cache == null) {
      this.nuevo_json_personaje();
    } else {
      console.log('personaje cargado');
      console.log(JSON.parse(personaje_cache));
    } */

  }

  auto_init_momentos_epicos() {
    if (typeof window === 'undefined') { return; };
  
    const objetivo = document.querySelector('#epicos') as HTMLElement;
    const numVeces = 6;
  
    if (objetivo) {
      for (let i = 1; i <= numVeces; i++) {
  
        const append = `
          <div class="flex flex-col flex-grow box-content-father w-full h-full px-2 py-4 gap-2">
            <p class="box-border-bottom text-center character-form" id="momento_epico_title_${i}" data-key="momentos_epicos_${i}">Momento Epico ${i}</p>
            <span class="p-2 character-form" id="momento_epico_content_${i}" data-key="momentos_epicos_${i}">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis corporis quaerat soluta autem veniam dolores iusto temporibus perspiciatis. Ea aspernatur tenetur molestias ipsum necessitatibus non, optio corporis tempore ab. Neque, autem. Rem ipsam consequatur perspiciatis ut laboriosam est obcaecati? Earum velit fuga molestiae sapiente obcaecati expedita dolores enim assumenda reiciendis!
            </span>
          </div>
        `;
  
        objetivo.insertAdjacentHTML('beforeend', append);
      }
    }
  }
  
  auto_init_pasivas() {
    if (typeof window === 'undefined') { return; };
  
    const objetivo = document.querySelector('#pasivas') as HTMLElement;
    const numVeces = 5;
  
    if (objetivo) {
      for (let i = 1; i <= numVeces; i++) {
  
        const append = `
          <div class="flex flex-col flex-grow box-content-father w-full h-full px-2 py-4 gap-2">
            <p class="box-border-bottom text-center character-form" id="pasiva_title_${i}" data-key="pasivas_${i}">Pasiva ${i}</p>
            <span class="p-2 character-form" id="pasiva_content_${i}" data-key="pasivas_${i}">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis corporis quaerat soluta autem veniam dolores iusto temporibus perspiciatis. Ea aspernatur tenetur molestias ipsum necessitatibus non, optio corporis tempore ab. Neque, autem. Rem ipsam consequatur perspiciatis ut laboriosam est obcaecati? Earum velit fuga molestiae sapiente obcaecati expedita dolores enim assumenda reiciendis!
            </span>
          </div>
        `;
  
        objetivo.insertAdjacentHTML('beforeend', append);
      }
    }
  }

  auto_init_check() {
    if (typeof window === 'undefined') { return; };
  
    const checks = ['Atletismo','Robo','Sigilo','Acrobacias','Quimica','Sociedad','Naturaleza','Percepcion','Conocimiento_Poder','Medicina','Tecnologia','Supervivencia','Investigacion','Trato_Animales','Intimidacion','Engaño','Persuasion','Actuacion'];
  
    const objetivo = document.querySelector('#checks') as HTMLElement;

    for (let i = 0; i < checks.length; i++) {
      const value = checks[i];

      const append = `
        <div class="flex flex-row justify-between justify-items-center content-center items-center gap-1 box-content-father px-4 py-2 w-full">
          <img src="assets/images/dice/d2.png" id="img_${value}" class="character-form dice" alt="dado" data-key="check_${value}">
          <span id="name_${value}" class="character-form" data-key="check_${value}">${value}</span>
          <span id="bonus_${value}" class="character-form" data-key="check_${value}">+X</span>
          <span id="stat_a_escalar_${value}" class="character-form hidden" data-key="check_${value}">FUE</span>
        </div>
      `;

      objetivo.insertAdjacentHTML('beforeend', append);
    }
  }

  button_init_editar_personaje() {
    if (typeof window === 'undefined') { return; };
  
    const objetivo = document.querySelector('#editar_personaje') as HTMLElement;

    objetivo.addEventListener('click',()=>{

      console.log(document.querySelectorAll('.character-form'));
      
    });

  }

  button_init_guardar_personaje() {
    if (typeof window === 'undefined') { return; };

    const objetivo = document.querySelector('#guardar_personaje') as HTMLElement;

    objetivo.addEventListener('click',()=>{
      let objetoJson = {} as any;
      let array = document.querySelectorAll('.character-form');
      
      array.forEach(element => {
        
        let key = element.id;
        let content = element.innerHTML;
        let father = (element as HTMLElement).dataset;
        let fatherKey;

        if (key.includes('img')) {
          content = (element as HTMLImageElement).src;
        }
        
        if (!father.hasOwnProperty("key") || father['key'] == null) {

          console.log(element);
          
          return;

        } else {
          fatherKey = father['key'];
        }

        if (!objetoJson.hasOwnProperty(fatherKey)) {
          objetoJson[fatherKey] = {} as any;
        }

        objetoJson[fatherKey][key] = content;

      });

      const jsonString = JSON.stringify(objetoJson); // null y 2 para formato legible
      const blob = new Blob([jsonString], { type: 'application/json' });

      saveAs(blob, `personaje_${objetoJson['datos_personales']['Nombre']}.json`);
      localStorage.setItem('personaje_cache', jsonString);

      
    });
  }

  button_init_nuevo_personaje() {
    if (typeof window === 'undefined') { return; };

    const objetivo = document.querySelector('#nuevo_personaje') as HTMLElement;

    objetivo.addEventListener('click',()=>{
      this.nuevo_json_personaje();
    });

  }

  cargar_json_personaje() {
  }

  nuevo_json_personaje() {
    this.http.get('assets/personaje_Character.json').subscribe(data => {
      console.log('personaje cargado');
      console.log(JSON.parse(data as string));
    });
  }
}