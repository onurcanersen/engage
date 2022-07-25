package com.example.engagebackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.engagebackend.model.Question;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    
    List<Question> findBySessionCode(String sessionCode);
    
}
