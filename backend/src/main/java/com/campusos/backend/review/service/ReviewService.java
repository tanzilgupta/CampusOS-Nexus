package com.campusos.backend.review.service;

import com.campusos.backend.exception.ResourceNotFoundException;
import com.campusos.backend.review.dto.ReviewRequest;
import com.campusos.backend.review.dto.ReviewResponse;
import com.campusos.backend.review.entity.Review;
import com.campusos.backend.review.repository.ReviewRepository;
import com.campusos.backend.user.entity.User;
import com.campusos.backend.user.repository.UserRepository;
import com.campusos.backend.user.service.CurrentUserService;
import com.campusos.backend.exception.UnauthorizedException;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    private final UserRepository userRepository;
    private final CurrentUserService currentUserService;

    public ReviewService(
            ReviewRepository reviewRepository,
            UserRepository userRepository,
            CurrentUserService currentUserService) {

        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.currentUserService = currentUserService;

    }

    public ReviewResponse createReview(
            Long reviewerId,
            ReviewRequest request) {

        assertCurrentUser(reviewerId);
        User reviewer = userRepository.findById(reviewerId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Reviewer not found"));

        User reviewedUser = userRepository.findById(
                request.getReviewedUserId())

                .orElseThrow(() -> new ResourceNotFoundException(
                        "Reviewed user not found"));

        Review review = new Review();

        review.setReviewer(reviewer);

        review.setReviewedUser(reviewedUser);

        review.setRating(
                request.getRating());

        review.setComment(
                request.getComment());

        Review savedReview = reviewRepository.save(review);

        return map(savedReview);

    }

    public List<ReviewResponse> getUserReviews(
            Long userId) {

        return reviewRepository
                .findByReviewedUserId(userId)

                .stream()

                .map(this::map)

                .collect(Collectors.toList());

    }

    public List<ReviewResponse> getReviewsGiven(
            Long userId) {

        return reviewRepository
                .findByReviewerId(userId)

                .stream()

                .map(this::map)

                .collect(Collectors.toList());

    }

    public void deleteReview(
            Long reviewId) {

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found"));
        assertCurrentUser(review.getReviewer().getId());
        reviewRepository.delete(review);

    }

    private ReviewResponse map(
            Review review) {

        ReviewResponse response = new ReviewResponse();

        response.setId(
                review.getId());

        response.setReviewerId(
                review.getReviewer().getId());

        response.setReviewedUserId(
                review.getReviewedUser().getId());

        response.setRating(
                review.getRating());

        response.setComment(review.getComment());

        if (review.getReviewer() != null) {
            response.setReviewerName(review.getReviewer().getName());
        }

        return response;

    }

    private void assertCurrentUser(Long userId) {
        if (!currentUserService.requireCurrentUser().getId().equals(userId)) {
            throw new UnauthorizedException("You can only manage your own reviews");
        }
    }

}
