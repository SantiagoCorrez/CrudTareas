package com.todosistemas.prueba.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.todosistemas.prueba.entities.Task;


public interface TaskRepository  extends CrudRepository<Task, Integer>{
	@Query(value="SELECT * From Task t WHERE t.user_id = ?1",nativeQuery = true)
	List<Task> findByUser(int Id); 
}
