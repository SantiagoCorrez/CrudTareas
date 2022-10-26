package com.todosistemas.prueba.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.CreationTimestamp;


@Entity
public class Task {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int Id;
	@ManyToOne
	@JoinColumn(name="user_id")
	private Empleado user;
	private String task;
	private String status;
	@CreationTimestamp
	private Date fecha;
	public int getId() {
		return Id;
	}
	public void setId(int id) {
		Id = id;
	}
	public Empleado getUser() {
		return user;
	}
	public void setUser(Empleado user) {
		this.user = user;
	}
	public String getTask() {
		return task;
	}
	public void setTask(String task) {
		this.task = task;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	
}
