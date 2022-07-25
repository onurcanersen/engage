package com.example.engagebackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.engagebackend.model.Presenter;

public interface PresenterRepository extends JpaRepository<Presenter, Long> {
    
    Presenter findByEmail(String email);
    
}
