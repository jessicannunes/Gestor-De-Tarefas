import { Injectable } from '@angular/core';
import { Task } from '../Models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  // criando uma lista
  private tasks: Array<Task> = [];

  // obetendo a lista de tarefas
  public getTasks(): Array<Task> {

    this.tasks = this.getFromLocalStorage();

    return this.tasks;
  }

  // localizar uma tarefa pelo id
  public getById(id: number): Task | undefined{

    const task = this.tasks.find( c=> c.id === id);

    return task;
  }

  // adicionar uma tarefa
  public addTask(task: Task): void{
    this.tasks.push(task);
  }

  //update da tarefa
  public updateTask(){

    this.saveLocalStorage();
  }

  //remover uma tarefa
  public removeTask(task:Task){

    const index = this.tasks.indexOf(task);

    if(index != -1){
      // achou
      this.tasks.splice(index, 1);

      this.saveLocalStorage();
    }

  }

  private saveLocalStorage(){

    // transformando o meu obejto que é do tipo tarefa em JSON porque o storage no google só aceita string
    const tasksJSON = JSON.stringify(this.tasks);

    // gravando no local storege
    localStorage.setItem('tasks', tasksJSON);
    
  }
  // obter a lista no localstorage
  private getFromLocalStorage(): Array<Task>{

    const tasksJSON = localStorage.getItem('tasks');

    if( ! tasksJSON){
      // não achou
      return new Array<Task>;
    }

    return JSON.parse(tasksJSON);

  }

}
