import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-index',
  imports: [
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule
  ],
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

  onTabClick2(event: MouseEvent) {
    const tabActive = document.querySelector('.tab-active2') as HTMLElement;
    let classBase = 'px-2 py-1 h-full w-full flex justify-center items-center tab' as string;

    tabActive.className = classBase;

    const targetElement = event.target as HTMLElement;
    targetElement.className += '-active2';

    const targetElementValue = event.target as HTMLElement;
    const datasetTab = targetElementValue.dataset['tab'];
    

    const tabContents = document.querySelectorAll('.tab-content2') as NodeListOf<HTMLButtonElement>;
    classBase = 'tab-content2 py-1 px-4 flex flex-col gap-4' as string;
    tabContents.forEach(tabContent => {
      
      tabContent.className = classBase;
      if (tabContent.id != datasetTab) {
        tabContent.className += ' hidden';
      }
      
    });
  }

  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    //this.auto_init_page();
    this.auto_init_momentos_epicos();
    this.auto_init_pasivas();
    this.auto_init_check();
    this.button_init_editar_personaje();
    this.button_init_guardar_personaje();
    this.button_init_nuevo_personaje();
    this.button_init_cargar_personaje();

    this.auto_init_edit_momentos_epicos();
    this.auto_init_edit_pasivas();
    this.auto_init_edit_check();
  }

  auto_init_page() {
    let personaje_cache = localStorage.getItem('personaje_cache') as string;

    if (personaje_cache == null) {
      this.nuevo_json_personaje();
    } else {
      console.log('personaje cargado');
      console.log(JSON.parse(personaje_cache));
    }

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
    const objetivo2 = document.querySelectorAll('.close-modal');
    const objetivo3 = document.querySelector('#save-input-modal') as HTMLElement;
    const modalblack = document.querySelector('#black-fade') as HTMLDivElement;
    const modalContainer = document.querySelector('#modal') as HTMLDivElement;

    objetivo.addEventListener('click',()=>{

      modalblack.style.zIndex = '10';
      modalContainer.style.top = '20px';
      document.body.style.overflow = 'hidden';
      
    });

    objetivo2.forEach(elemento => {
      elemento.addEventListener('click',()=>{

        modalblack.style.zIndex = '-10';
        modalContainer.style.top = '-1000px';
        document.body.style.overflow = 'auto';
        
      });
    });

    objetivo3.addEventListener('click',()=>{

      let objetoJson = [] as any;
      let array = document.querySelectorAll('.character-form-edit');
      
      array.forEach(element => {
        
        let key = element.id;
        let content = (element as HTMLInputElement).value;
        let father = (element as HTMLElement).dataset;
        let fatherKey;

        if (key.includes('img')) {
          content = (element as HTMLImageElement).src;
        }
        
        if (!father.hasOwnProperty("key") || father['key'] == null) {

          console.log(element);
          
          return;

        } else {
          fatherKey = father['key'].replace("-edit", "");
        }

        if (!objetoJson.hasOwnProperty(fatherKey)) {
          objetoJson[fatherKey] = [] as any;
        }

        key = key.replace("_Input", "").replace("edit_", "").replace("_input", "").replace("_input", "_edit");

        objetoJson[fatherKey][key] = content;

      });

      console.log(objetoJson);

      objetoJson['datos_combate']['dmg'] = 0;
      objetoJson['datos_combate']['res_con'] = 0;
      objetoJson['datos_combate']['res_cor'] = 0;
      objetoJson['datos_combate']['res_per'] = 0;

      objetoJson.forEach((key: string) => { //back

        let fatherKey = objetoJson[key];
        let result;

        fatherKey.array.forEach((key: string) => {
          
          let objetivo = fatherKey[key];
          result = objetivo;

          if (key == 'dmg_maestry') {

            if (objetivo == "f") {
              result = 0;
            } else if (objetivo == "e") {
              result = 1;
            } else if (objetivo == "d") {
              result = 2;
            } else if (objetivo == "c") {
              result = 3;
            } else if (objetivo == "b") {
              result = 4;
            } else if (objetivo == "a") {
              result = 5;
            } else if (objetivo == "6") {
              result = 6;
            }

            objetoJson[fatherKey]['dmg'] += result;

          } else if (key == 'dmg_scale') {
           
            objetoJson[fatherKey]['dmg'] += objetoJson['stats'][key];

          } else if (key == 'armor_type') {

            if (objetivo == "Flexible") {

              objetoJson[fatherKey]['res_con'] += 0;
              objetoJson[fatherKey]['res_cor'] += 0;
              objetoJson[fatherKey]['res_per'] += 0;

            } else if (objetivo == "Ligera") {

              objetoJson[fatherKey]['res_con'] += 1;
              objetoJson[fatherKey]['res_cor'] += -1;
              objetoJson[fatherKey]['res_per'] += 0;

            } else if (objetivo == "Mediana") {

              objetoJson[fatherKey]['res_con'] += -1;
              objetoJson[fatherKey]['res_cor'] += 0;
              objetoJson[fatherKey]['res_per'] += 1;

            } else if (objetivo == "Pesada") {

              objetoJson[fatherKey]['res_con'] += 0;
              objetoJson[fatherKey]['res_cor'] += 1;
              objetoJson[fatherKey]['res_per'] += -1;

            }

          } else if (key == 'PV') {

            objetoJson[fatherKey]['PS'] = 10 + parseInt(objetoJson['stats']['CON'])*5 + parseInt(objetivo);

          } else if (key == 'Acciones') {

            objetoJson[fatherKey]['ACT'] = 1 + Math.floor((parseInt(objetoJson['stats']['INT'])/5)) + parseInt(objetivo);

          } else if (key == 'Reacciones') {

            objetoJson[fatherKey]['REC'] = 1 + Math.floor((parseInt(objetoJson['stats']['DES'])/5)) + parseInt(objetivo);

          } else if (key == 'Iniciativa') {

            objetoJson[fatherKey]['INI'] = 0 + Math.floor((parseInt(objetoJson['stats']['SAB'])/2)) + parseInt(objetivo);

          } else if (key == 'Oportunidad') {

            objetoJson[fatherKey]['OPT'] = 0 + Math.floor((parseInt(objetoJson['datos_combate']['LV'])/3)) + parseInt(objetivo);

          } else if (key.includes("check_")) {

            let check = objetivo.replace("check_") as string;

            objetivo.forEach((clave:string) => {

              const objetivo2 = objetivo[clave];

              if (clave.includes("check_maestria_")) {

                let res = "";

                if (objetivo2 == "f") {
                  res = "d2";
                } else if (objetivo2 == "e") {
                  res = "d4";
                } else if (objetivo2 == "d") {
                  res = "d6";
                } else if (objetivo2 == "c") {
                  res = "d8";
                } else if (objetivo2 == "b") {
                  res = "d10";
                } else if (objetivo2 == "a") {
                  res = "d12";
                } else if (objetivo2 == "6") {
                  res = "d20";
                }

                objetoJson[fatherKey][`img_${check}`] = `http://localhost:4300/assets/images/dice/${res}.png`;

              } else {

                objetoJson[fatherKey][key][`bonus_${check}`] = `+${parseInt(objetoJson['stats'][objetivo2])}`;
                objetoJson[fatherKey][key][`stat_a_escalar_${check}`] = `+${parseInt(objetoJson['stats'][objetivo2])}`;

              }

            });

          }

        });

      });

      console.log(objetoJson);
      
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

  button_init_cargar_personaje() {
    if (typeof window === 'undefined') { return; };

    const objetivo = document.querySelector('#cargar_personaje') as HTMLElement;
    
    objetivo.addEventListener('click',()=>{
      
      let subObjetivo = document.querySelector('#Cargar_Personaje_Hidden') as HTMLElement;
      subObjetivo.click();

      subObjetivo.addEventListener('change', (event) => {
        const archivo = event.target as HTMLInputElement;
        if (archivo.files && archivo.files.length > 0) {

          const archivoLeido = archivo.files[0];

          const lector = new FileReader();
          lector.onload = (evento) => {
            const contenido = evento.target?.result as string;
            let contenidoText = JSON.parse(contenido) as object;
            this.cargar_json_personaje(contenidoText);
            console.log(contenidoText);
            
          };
          lector.readAsText(archivoLeido);

        }
      });

    });

  }

  cargar_json_personaje(objeto: any) {

    for (const clavePadre in objeto) {
      if (Object.prototype.hasOwnProperty.call(objeto, clavePadre)) {
        const clave = objeto[clavePadre];

        for (const key in clave) {
          let objetivo = document.querySelector(`#${key}`) as HTMLElement
          objetivo.innerHTML = clave[key];
        }
        
      }
    }

  }

  nuevo_json_personaje() {

    this.http.get('assets/personaje_Character.json').subscribe(data => {
    
      this.cargar_json_personaje(data);

    });
  }

  auto_init_edit_check() {
    if (typeof window === 'undefined') { return; };
  
    const checks = ['Atletismo','Robo','Sigilo','Acrobacias','Quimica','Sociedad','Naturaleza','Percepcion','Conocimiento_Poder','Medicina','Tecnologia','Supervivencia','Investigacion','Trato_Animales','Intimidacion','Engaño','Persuasion','Actuacion'];
  
    const objetivo = document.querySelector('#edit-check') as HTMLElement;

    for (let i = 0; i < checks.length; i++) {
      const value = checks[i];

      const append = `
      
        <div>

          <h2 class="text-center pt-6 text-2xl" id="edit_name_${value}">${value}</h2>

          <div class="flex flex-row gap-6 content-center items-center flex-grow mb-8">

            <div class="form__group">
              <select name="edit_check_maestria_${value}" id="edit_check_maestria_${value}" class="form__field character-form-edit" data-key="check_${value}">
                <option class="background-color-main" selected value="null" disabled>Maestria de Armadura</option>
                <option class="background-color-main" value="F">Fatal</option>
                <option class="background-color-main" value="E ">Entrenado</option>
                <option class="background-color-main" value="D">Dominante</option>
                <option class="background-color-main" value="C">Candente</option>
                <option class="background-color-main" value="B">Badass</option>
                <option class="background-color-main" value="A">Apoteosico</option>
                <option class="background-color-main" value="S">Supremo</option>
              </select>
            </div>
                    
            <div class="form__group">
              <select name="edit_stat_a_escalar_${value}" id="edit_stat_a_escalar_${value}" class="form__field character-form-edit" data-key="check_${value}">
                <option class="background-color-main" selected value="null" disabled>Escalado de Defensa</option>
                <option class="background-color-main" value="FUE">Fuerza</option>
                <option class="background-color-main" value="DES">Destreza</option>
                <option class="background-color-main" value="CON">Constitucion</option>
                <option class="background-color-main" value="SAB">Sabiduria</option>
                <option class="background-color-main" value="INT">Inteligencia</option>
                <option class="background-color-main" value="CON">Constitucion</option>
              </select>
            </div>

    
          </div>

        </div>

      `;

      objetivo.insertAdjacentHTML('beforeend', append);
    }
  }

  auto_init_edit_pasivas() {
    if (typeof window === 'undefined') { return; };
  
    const objetivo = document.querySelector('#edit-pasivas') as HTMLElement;
    const numVeces = 5;
  
    if (objetivo) {
      for (let i = 1; i <= numVeces; i++) {
  
        const append = `

          <div class="flex flex-col px-2">

                <h2 class="text-center pt-6 text-2xl">Pasiva ${i}</h2>

                <div class="form__group mb-4">
                  <input type="text" class="form__field character-form-edit" placeholder="Pasiva ${i}" name="pasivas_title_${i}_edit" data-key="pasivas_${i}" id="pasivas_title_${i}_edit"/>
                  <label for="pasivas_title_${i}_edit" class="form__label">Nombre de la Pasiva</label>
                </div>

                <div class="form__group">
                  <textarea name="pasiva_content_${i}_edit" id="pasiva_content_${i}_edit" data-key="pasivas_${i}" class="form__field character-form-edit" placeholder="Descripcion" required></textarea>
                  <label for="pasiva_content_${i}_edit" class="form__label">Descripcion</label>
                </div>

            </div>
        `;
  
        objetivo.insertAdjacentHTML('beforeend', append);
      }
    }
  }

  auto_init_edit_momentos_epicos() {
    if (typeof window === 'undefined') { return; };
  
    const objetivo = document.querySelector('#edit-epicos') as HTMLElement;
    const numVeces = 6;
  
    if (objetivo) {
      for (let i = 1; i <= numVeces; i++) {
  
        const append = `
          <div class="form__group">
              <select name="edit_momento_epico_title_${i}" id="edit_momento_epico_title_${i}" data-key="momentos_epicos_${i}" class="form__field character-form-edit">
                  <option class="background-color-main" selected value="null" disabled>Momento Epico ${i}</option>
                  <option class="background-color-main" value="Placeholder 1">Placeholder 1</option>
                  <option class="background-color-main" value="Placeholder 2">Placeholder 2</option>
                  <option class="background-color-main" value="Placeholder 3">Placeholder 3</option>
                  <option class="background-color-main" value="Placeholder 4">Placeholder 4</option>
                  <option class="background-color-main" value="Placeholder 5">Placeholder 5</option>
                  <option class="background-color-main" value="Placeholder 6">Placeholder 6</option>
              </select>
          </div>
        `;
  
        objetivo.insertAdjacentHTML('beforeend', append);
      }
    }
  }
}