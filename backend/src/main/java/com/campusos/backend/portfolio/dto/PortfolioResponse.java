package com.campusos.backend.portfolio.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PortfolioResponse {

    private Long id;

    private Long userId;

    private String title;

    private String description;

    private String projectUrl;

    private String imageUrl;

}