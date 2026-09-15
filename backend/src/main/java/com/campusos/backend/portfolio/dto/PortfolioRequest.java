package com.campusos.backend.portfolio.dto;

import lombok.Data;
import jakarta.validation.constraints.NotBlank;

@Data
public class PortfolioRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;
    private String projectUrl;
    private String imageUrl;

}
