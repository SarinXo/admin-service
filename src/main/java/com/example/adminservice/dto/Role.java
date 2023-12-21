package com.example.adminservice.dto;

public enum Role {
    ADMIN("ADMIN"), USER("USER");

    private final String role;

    Role(String role) {
        this.role = role;
    }
}
