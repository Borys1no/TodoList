import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.html',
  styleUrls: ['./todo.css']
})

export class Todo {
  tareas :{texto: string; completada:boolean} [] = [];
  nuevaTarea: string='';
  editandoTareaIndex: number | null = null;
  tareaEditada:string = '';

  constructor(){
    const tareasGuardadas = localStorage.getItem('tareas');
    this.tareas = tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  }
  guardarLocalStorage(){
    localStorage.setItem('tareas', JSON.stringify(this.tareas));
  }

  agregarTarea(){
    if(this.nuevaTarea.trim() !== ''){
      this.tareas.push({texto:this.nuevaTarea.trim(), completada:false});
      this.nuevaTarea='';
      this.guardarLocalStorage();
    }
  }

  toggleCompletada(tarea:any){
    tarea.completada = !tarea.completada;
    this.guardarLocalStorage();
  }
  eliminarTarea(index:number){
    this.tareas.splice(index, 1);
    this.guardarLocalStorage();
  }

  

  editarTarea(index:number){
    this.editandoTareaIndex = index;
    this.tareaEditada = this.tareas[index].texto;
  }

  guardarEdicion(){
    if(this.editandoTareaIndex !== null && this.tareaEditada.trim() !== ''){
      this.tareas[this.editandoTareaIndex].texto = this.tareaEditada.trim();
      this.editandoTareaIndex= null;
      this.tareaEditada= '';
      this.guardarLocalStorage();
    }

  }

  cancelarEdicion(){
    this.editandoTareaIndex = null;
    this.tareaEditada = '';
  }




}
