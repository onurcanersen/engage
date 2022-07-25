package com.example.engagebackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.engagebackend.model.Presenter;
import com.example.engagebackend.model.Session;
import com.example.engagebackend.repository.PresenterRepository;
import com.example.engagebackend.repository.SessionRepository;

import net.bytebuddy.utility.RandomString;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class SessionController {
    
    @Autowired
    private PresenterRepository presenterRepository;

    @Autowired
    private SessionRepository sessionRepository;

    @GetMapping("/sessions")
    public ResponseEntity<List<Session>> getSessions() {
        List<Session> sessions = sessionRepository.findAll();
        return new ResponseEntity<>(sessions, HttpStatus.OK);
    }

    @GetMapping("/presenters/{presenterId}/sessions")
    public ResponseEntity<List<Session>> getSessionsByPresenterId(@PathVariable(value = "presenterId") Long presenterId) {
        List<Session> sessions = sessionRepository.findByPresenterId(presenterId);
        return new ResponseEntity<>(sessions, HttpStatus.OK);
    }
    
    @PostMapping("/presenters/{presenterId}/sessions")
    public ResponseEntity<Session> createSession(@PathVariable(value = "presenterId") Long presenterId, @RequestBody Session session) {
        Presenter presenter = presenterRepository.findById(presenterId).orElseThrow();
        session.setPresenter(presenter);
        String code = RandomString.make(6);
        session.setCode(code);
        Session newSession = sessionRepository.save(session);
        return new ResponseEntity<>(newSession, HttpStatus.CREATED);
    }
    
}
