package com.todosistemas.prueba.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.todosistemas.prueba.entities.User;

public interface UserRepository extends CrudRepository<User, Integer>{
    @Query("SELECT u FROM User u WHERE u.user = ?1 AND u.pass = ?2")
    User login(String user,String pass);
}
