package com.example.engagebackend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Table(name = "sessions")
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String code;

    @ManyToOne
    @JoinColumn(name = "presenter_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Presenter presenter;

    protected Session() {}

    public Long getId() {
        return id;
    }

    public String getCode() {
        return code;
    }

    public Presenter getPresenter() {
        return presenter;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setPresenter(Presenter presenter) {
        this.presenter = presenter;
    }
    
}
