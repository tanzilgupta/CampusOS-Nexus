package com.campusos.backend.portfolio.controller;

import com.campusos.backend.portfolio.dto.PortfolioRequest;
import com.campusos.backend.portfolio.dto.PortfolioResponse;
import com.campusos.backend.portfolio.service.PortfolioService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/portfolio")
@CrossOrigin
public class PortfolioController {

        private final PortfolioService portfolioService;

        public PortfolioController(
                        PortfolioService portfolioService) {

                this.portfolioService = portfolioService;

        }

        @PostMapping("/{userId}")
        public ResponseEntity<PortfolioResponse> create(

                        @PathVariable Long userId,

                        @RequestBody PortfolioRequest request) {

                return ResponseEntity.ok(

                                portfolioService.createPortfolio(
                                                userId,
                                                request)

                );

        }

        @GetMapping("/{userId}")
        public ResponseEntity<PortfolioResponse> get(

                        @PathVariable Long userId) {

                return ResponseEntity.ok(

                                portfolioService.getPortfolio(userId)

                );

        }

        @PutMapping("/{userId}")
        public ResponseEntity<PortfolioResponse> update(

                        @PathVariable Long userId,

                        @RequestBody PortfolioRequest request) {

                return ResponseEntity.ok(

                                portfolioService.updatePortfolio(
                                                userId,
                                                request)

                );

        }

        @DeleteMapping("/{userId}")
        public ResponseEntity<String> delete(

                        @PathVariable Long userId) {

                portfolioService.deletePortfolio(userId);

                return ResponseEntity.ok(
                                "Portfolio deleted successfully");

        }

}