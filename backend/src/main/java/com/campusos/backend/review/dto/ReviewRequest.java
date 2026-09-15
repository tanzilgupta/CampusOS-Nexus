package com.campusos.backend.review.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewRequest {

    private Long reviewedUserId;

    private Integer rating;

    private String comment;

}