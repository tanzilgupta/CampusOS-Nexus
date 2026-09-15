package com.campusos.backend.portfolio.service;

import com.campusos.backend.exception.DuplicateResourceException;
import com.campusos.backend.exception.ResourceNotFoundException;
import com.campusos.backend.portfolio.dto.PortfolioRequest;
import com.campusos.backend.portfolio.dto.PortfolioResponse;
import com.campusos.backend.portfolio.entity.Portfolio;
import com.campusos.backend.portfolio.repository.PortfolioRepository;
import com.campusos.backend.user.entity.User;
import com.campusos.backend.user.repository.UserRepository;
import com.campusos.backend.user.service.CurrentUserService;
import com.campusos.backend.exception.UnauthorizedException;

import org.springframework.stereotype.Service;

@Service
public class PortfolioService {

        private final PortfolioRepository portfolioRepository;

        private final UserRepository userRepository;
        private final CurrentUserService currentUserService;

        public PortfolioService(
                        PortfolioRepository portfolioRepository,
                        UserRepository userRepository,
                        CurrentUserService currentUserService) {

                this.portfolioRepository = portfolioRepository;
                this.userRepository = userRepository;
                this.currentUserService = currentUserService;

        }

        public PortfolioResponse createPortfolio(
                        Long userId,
                        PortfolioRequest request) {

                assertCurrentUser(userId);
                User user = userRepository.findById(userId)

                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "User not found"));

                if (portfolioRepository.existsByUserId(userId)) {

                        throw new DuplicateResourceException(
                                        "Portfolio already exists");

                }

                Portfolio portfolio = Portfolio.builder()

                                .title(request.getTitle())

                                .description(request.getDescription())

                                .projectUrl(request.getProjectUrl())

                                .imageUrl(request.getImageUrl())

                                .user(user)

                                .build();

                return map(
                                portfolioRepository.save(portfolio));

        }

        public PortfolioResponse getPortfolio(
                        Long userId) {

                Portfolio portfolio = portfolioRepository.findByUserId(userId)

                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Portfolio not found"));

                return map(portfolio);

        }

        public PortfolioResponse updatePortfolio(
                        Long userId,
                        PortfolioRequest request) {

                assertCurrentUser(userId);
                Portfolio portfolio = portfolioRepository.findByUserId(userId)

                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Portfolio not found"));

                portfolio.setTitle(
                                request.getTitle());

                portfolio.setDescription(
                                request.getDescription());

                portfolio.setProjectUrl(
                                request.getProjectUrl());

                portfolio.setImageUrl(
                                request.getImageUrl());

                return map(
                                portfolioRepository.save(portfolio));

        }

        public void deletePortfolio(
                        Long userId) {

                assertCurrentUser(userId);
                Portfolio portfolio = portfolioRepository.findByUserId(userId)

                                .orElseThrow(() -> new ResourceNotFoundException(
                                                "Portfolio not found"));

                portfolioRepository.delete(portfolio);

        }

        private PortfolioResponse map(
                        Portfolio portfolio) {

                return PortfolioResponse.builder()

                                .id(portfolio.getId())

                                .userId(
                                                portfolio.getUser().getId())

                                .title(
                                                portfolio.getTitle())

                                .description(
                                                portfolio.getDescription())

                                .projectUrl(
                                                portfolio.getProjectUrl())

                                .imageUrl(
                                                portfolio.getImageUrl())

                                .build();

        }

        private void assertCurrentUser(Long userId) {
                if (!currentUserService.requireCurrentUser().getId().equals(userId)) {
                        throw new UnauthorizedException("You can only manage your own portfolio");
                }
        }

}
