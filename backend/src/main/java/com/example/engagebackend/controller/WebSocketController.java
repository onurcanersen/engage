package com.example.engagebackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.example.engagebackend.model.Question;
import com.example.engagebackend.model.Session;
import com.example.engagebackend.repository.QuestionRepository;
import com.example.engagebackend.repository.SessionRepository;

@Controller
public class WebSocketController {
    
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private QuestionRepository questionRepository;
     
    @MessageMapping("/questions")
    public Question receiveQuestion(@Payload Question question) {
        Question newQuestion = new Question(question.getContent(), question.getSessionCode());
        Session session = sessionRepository.findByCode(newQuestion.getSessionCode());
        newQuestion.setSession(session);
        questionRepository.save(newQuestion);
        simpMessagingTemplate.convertAndSend("/sessions/" + newQuestion.getSessionCode(), newQuestion);
        return newQuestion;
    }
    
}
