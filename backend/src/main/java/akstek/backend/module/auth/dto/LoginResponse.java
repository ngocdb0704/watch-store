package akstek.backend.module.auth.dto;

import java.time.Instant;

public record LoginResponse (

        String accessToken,

        Instant expiredAt,

        UserInfo userInfo

){}
