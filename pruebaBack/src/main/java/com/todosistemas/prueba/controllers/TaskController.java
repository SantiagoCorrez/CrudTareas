package com.todosistemas.prueba.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.todosistemas.prueba.entities.Task;
import com.todosistemas.prueba.objects.ResponseObject;
import com.todosistemas.prueba.objects.TaskObject;
import com.todosistemas.prueba.repository.EmpleadoRepository;
import com.todosistemas.prueba.repository.TaskRepository;
import com.todosistemas.prueba.repository.UserRepository;


@Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/task")
public class TaskController {
	@Autowired
	private TaskRepository taskRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
    private EmpleadoRepository EmpleadoRepository;
	@RequestMapping(value="",method=RequestMethod.GET)
	public @ResponseBody Iterable<Task> init() {
		return taskRepository.findAll();
	}
	@RequestMapping(value="/{id}",method=RequestMethod.GET)
	public @ResponseBody Iterable<Task> init(@PathVariable int id) {
		return taskRepository.findByUser(id);
	}
	@RequestMapping(value="/new",method=RequestMethod.POST)
	public @ResponseBody ResponseEntity<ResponseObject> save(@RequestBody TaskObject user) {
		Task newTask= new Task();
		newTask.setTask(user.getTask());
		newTask.setStatus(user.getStatus());
		newTask.setUser(EmpleadoRepository.findById(user.getIdUser()).get());
		newTask.setFecha(user.getFecha());
		ResponseObject response = new ResponseObject();
		try {
			taskRepository.save(newTask);
			response.setStatus("Ok");
			response.setMessage("Usuario Guardado Exitosamente");
			return new ResponseEntity<ResponseObject>(response, HttpStatus.OK);
		}catch (Exception e) {
			// TODO: handle exception
			response.setStatus("Error");
			response.setMessage("Ha ocurrido un error al guardar el usuario");
			return new ResponseEntity<ResponseObject>(response, HttpStatus.OK);
		}
		
	}
	@RequestMapping(value="/update/{id}",method=RequestMethod.POST)
	public @ResponseBody ResponseEntity<ResponseObject> update(@PathVariable int id,@RequestBody TaskObject user) {
		System.out.println(id);
		Task newTask= taskRepository.findById(id).get();
		newTask.setTask(user.getTask());
		newTask.setStatus(user.getStatus());
		newTask.setUser(EmpleadoRepository.findById(user.getIdUser()).get());
		newTask.setFecha(user.getFecha());
		ResponseObject response = new ResponseObject();
		try {
			taskRepository.save(newTask);
			response.setStatus("Ok");
			response.setMessage("Tarea Guardada Exitosamente");
			return new ResponseEntity<ResponseObject>(response, HttpStatus.OK);
		}catch (Exception e) {
			// TODO: handle exception
			response.setStatus("Error");
			response.setMessage("Ha ocurrido un error al guardar la tarea");
			return new ResponseEntity<ResponseObject>(response, HttpStatus.OK);
		}
	}
	
	
}
