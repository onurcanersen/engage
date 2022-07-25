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
@Table(name = "questions")
public class Question {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String content;
    private String sessionCode;
    private boolean answered;
    private int vote;
    
    @ManyToOne
    @JoinColumn(name = "session_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Session session;
    
    protected Question() {}

    public Question(String content, String sessionCode) {
        this.content = content;
        this.sessionCode = sessionCode;
        this.answered = false;
        this.vote = 0;
        this.session = null;
    }

    public Long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public String getSessionCode() {
        return sessionCode;
    }

    public boolean getAnswered() {
        return answered;
    }

    public int getVote() {
        return vote;
    }

    public Session getSession() {
        return session;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setSessionCode(String sessionCode) {
        this.sessionCode = sessionCode;
    }

    public void setAnswered(boolean answered) {
        this.answered = answered;
    }

    public void setVote(int vote) {
        this.vote = vote;
    }

    public void setSession(Session session) {
        this.session = session;
    }

}
