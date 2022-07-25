package com.example.engagebackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.engagebackend.model.Session;

public interface SessionRepository extends JpaRepository<Session, Long> {
    
    Session findByCode(String code);
    List<Session> findByPresenterId(Long presenterId);
    
}
