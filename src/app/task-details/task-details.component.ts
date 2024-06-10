import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../Models/task';
import { TaskService } from '../service/task.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent {

  task?: Task;

  constructor(private router: Router, private route: ActivatedRoute, private taskService: TaskService){}

  // assim que inicializar
  ngOnInit(){
    let id = this.route.snapshot.paramMap.get('id');

    // verificação do Id da tarefa
    if(id === null)
    {

      this.navigateBack();
    }

    else
    {
      this.task = this.taskService.getById(+id);

      if(this.task === undefined){
        this.navigateBack();
      }
      
    }

  }

  // metodo para voltar a rota caso o id não seja encontrado
  navigateBack(){
    this.router.navigate(['/taskList'], {relativeTo: this.route});
  }

// botões salvar e cancelar
  save(){
    this.taskService.updateTask();
    this.navigateBack();
  }

  cancel(){
    this.navigateBack();
  }


}
