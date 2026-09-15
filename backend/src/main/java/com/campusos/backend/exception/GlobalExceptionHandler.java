package com.campusos.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

        @ExceptionHandler(DuplicateResourceException.class)
        public ResponseEntity<?> handleDuplicate(
                        DuplicateResourceException ex) {

                return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(
                                                Map.of(
                                                                "message",
                                                                ex.getMessage()));
        }

        @ExceptionHandler(ResourceNotFoundException.class)
        public ResponseEntity<?> handleNotFound(
                        ResourceNotFoundException ex) {

                return ResponseEntity
                                .status(HttpStatus.NOT_FOUND)
                                .body(
                                                Map.of(
                                                                "message",
                                                                ex.getMessage()));
        }

        @ExceptionHandler(BadRequestException.class)
        public ResponseEntity<?> handleBadRequest(
                        BadRequestException ex) {

                return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(
                                                Map.of(
                                                                "message",
                                                                ex.getMessage()));
        }

        @ExceptionHandler(UnauthorizedException.class)
        public ResponseEntity<?> handleUnauthorized(UnauthorizedException ex) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                                .body(Map.of("message", ex.getMessage()));
        }

}
