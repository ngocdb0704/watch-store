package akstek.backend.module.auth.dto;

import akstek.backend.common.entity.Role;

import java.util.UUID;

public record UserInfo(
        UUID id,
        String username,
        String fullName,
        Role role) {}
