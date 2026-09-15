package com.campusos.backend.review.controller;

import com.campusos.backend.review.dto.ReviewRequest;
import com.campusos.backend.review.dto.ReviewResponse;
import com.campusos.backend.review.service.ReviewService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin
public class ReviewController {

        private final ReviewService reviewService;

        public ReviewController(
                        ReviewService reviewService) {

                this.reviewService = reviewService;

        }

        @PostMapping("/{reviewerId}")
        public ResponseEntity<ReviewResponse> createReview(

                        @PathVariable Long reviewerId,

                        @RequestBody ReviewRequest request

        ) {

                return ResponseEntity.ok(
                                reviewService.createReview(
                                                reviewerId,
                                                request));

        }

        @GetMapping("/user/{userId}")
        public ResponseEntity<List<ReviewResponse>> getUserReviews(

                        @PathVariable Long userId

        ) {

                return ResponseEntity.ok(
                                reviewService.getUserReviews(userId));

        }

        @GetMapping("/given/{userId}")
        public ResponseEntity<List<ReviewResponse>> getReviewsGiven(

                        @PathVariable Long userId

        ) {

                return ResponseEntity.ok(
                                reviewService.getReviewsGiven(userId));

        }

        @DeleteMapping("/{reviewId}")
        public ResponseEntity<String> deleteReview(

                        @PathVariable Long reviewId

        ) {

                reviewService.deleteReview(reviewId);

                return ResponseEntity.ok(
                                "Review deleted successfully");

        }

}