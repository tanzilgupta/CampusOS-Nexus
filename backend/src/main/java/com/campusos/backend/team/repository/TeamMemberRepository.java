package com.campusos.backend.team.repository;

import com.campusos.backend.team.entity.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamMemberRepository
        extends JpaRepository<TeamMember, Long> {

    List<TeamMember> findByTeamId(Long teamId);

    boolean existsByTeamIdAndUserId(
            Long teamId,
            Long userId);

}