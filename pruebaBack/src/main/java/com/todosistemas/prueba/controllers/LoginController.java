package com.todosistemas.prueba.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.todosistemas.prueba.entities.User;
import com.todosistemas.prueba.objects.LoginObject;
import com.todosistemas.prueba.objects.ResponseObject;
import com.todosistemas.prueba.repository.UserRepository;

@Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/login")
public class LoginController {

    @Autowired
    private UserRepository userRepository;
    
    @RequestMapping(value="",method=RequestMethod.POST)
    public @ResponseBody ResponseEntity<ResponseObject>  user(@RequestBody LoginObject login) {
        ResponseObject response = new ResponseObject();
        try {
            response.setStatus("Ok");
            User uss = userRepository.login(login.getUser(), login.getPass());
            response.setMessage(uss.getId().toString());
            return  new ResponseEntity<ResponseObject>(response,HttpStatus.OK);   
        } catch (Exception e) {
            // TODO: handle exception
            response.setStatus("Error");
            response.setMessage("Ha ocurrido un error al guardar el usuario");
            return  new ResponseEntity<ResponseObject>(response,HttpStatus.OK);
        }
    }
}
