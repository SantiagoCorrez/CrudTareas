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

import com.todosistemas.prueba.entities.Empleado;
import com.todosistemas.prueba.objects.ResponseObject;
import com.todosistemas.prueba.objects.EmpleadoObject;
import com.todosistemas.prueba.repository.EmpleadoRepository;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/empleado")
public class UsuarioController {
	@Autowired
	private EmpleadoRepository EmpleadoRepository;
	
	@RequestMapping(value="",method=RequestMethod.GET)
	public @ResponseBody Iterable<Empleado> Empleado() {
		return EmpleadoRepository.findAll();
	}
	
	@RequestMapping(value="/new",method=RequestMethod.POST)
	public @ResponseBody ResponseEntity<ResponseObject> saveEmpleado(@RequestBody EmpleadoObject Empleado) {
		Empleado newEmpleado = new Empleado();
        newEmpleado.setName(Empleado.getName());
        newEmpleado.setArea(Empleado.getArea());
		ResponseObject response = new ResponseObject();
		try {
			EmpleadoRepository.save(newEmpleado);
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
	public @ResponseBody ResponseEntity<ResponseObject> updateEmpleado(@PathVariable int id,@RequestBody EmpleadoObject Empleado) {
		Empleado newEmpleado = EmpleadoRepository.findById(id).get();
		newEmpleado.setName(Empleado.getName());
		newEmpleado.setArea(Empleado.getArea());
		ResponseObject response = new ResponseObject();
		try {
			EmpleadoRepository.save(newEmpleado);
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
}
