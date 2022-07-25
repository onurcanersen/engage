package com.example.engagebackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.engagebackend.model.Question;
import com.example.engagebackend.repository.QuestionRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class QuestionController {
    
    @Autowired
    private QuestionRepository questionRepository;

    @GetMapping("/questions")
    public ResponseEntity<List<Question>> getQuestions() {
        List<Question> questions = questionRepository.findAll();
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @GetMapping("/sessions/{sessionCode}/questions")
    public ResponseEntity<List<Question>> getQuestionsBySessionCode(@PathVariable(value = "sessionCode") String sessionCode) {
        List<Question> questions = questionRepository.findBySessionCode(sessionCode);
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @PutMapping("/questions/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable(value = "id") Long id, @RequestBody Question question) {
        Question updatedQuestion = questionRepository.findById(id).orElseThrow();
        updatedQuestion.setAnswered(question.getAnswered());
        updatedQuestion.setVote(question.getVote());
        return new ResponseEntity<>(questionRepository.save(updatedQuestion), HttpStatus.OK);
    }
    
}
