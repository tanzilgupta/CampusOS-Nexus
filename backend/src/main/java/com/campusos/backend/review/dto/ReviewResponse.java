package com.campusos.backend.review.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewResponse {

    private Long id;

    private Long reviewerId;

    private Long reviewedUserId;

    private Integer rating;

    private String comment;

    private String reviewerName;

}