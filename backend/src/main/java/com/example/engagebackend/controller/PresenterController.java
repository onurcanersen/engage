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
import com.example.engagebackend.repository.PresenterRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class PresenterController {
    
    @Autowired
    private PresenterRepository presenterRepository;

    @GetMapping("/presenters")
    public ResponseEntity<List<Presenter>> getPresenters() {
        List<Presenter> presenters = presenterRepository.findAll();
        return new ResponseEntity<>(presenters, HttpStatus.OK);
    }

    @GetMapping("/presenters/{email}")
    public ResponseEntity<Presenter> getPresenterByEmail(@PathVariable(value = "email") String email) {
        Presenter presenter = presenterRepository.findByEmail(email);
        return new ResponseEntity<>(presenter, HttpStatus.OK);
    }
    
    @PostMapping("/presenters")
    public ResponseEntity<Presenter> createPresenter(@RequestBody Presenter presenter) {
        Presenter newPresenter = presenterRepository.save(new Presenter(presenter.getEmail()));
        return new ResponseEntity<>(newPresenter, HttpStatus.CREATED);
    }

}
